const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const { sendOfferStatusEmail } = require('../utils/emailService');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      body: { characteristic1, characteristic2 },
    } = req;
    console.log(req.body, characteristic1, characteristic2);
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean,
    );

    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {

    let offerWhere = {};

    if (req.tokenData.role === CONSTANTS.CREATOR) {
      offerWhere = { userId: req.tokenData.userId };
    } else if (req.tokenData.role === CONSTANTS.CUSTOMER) {
      offerWhere = {
        moderatorStatus: [
          CONSTANTS.OFFER_STATUS_MODERATOR_APPROVED,
        ],
      };
    }

    let contestInfo = await db.Contests.findOne({
      where: { id: req.headers.contestid },
      order: [[db.Offers, 'id', 'asc']],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offers,
          required: false,
          where: offerWhere,
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Ratings,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(new ServerError());
  }
};

module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};

module.exports.updateContest = async (req, res, next) => {
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (e) {
    return next(new ServerError());
  }
};

const resolveOffer = async (contestId, creatorId, offerId, transaction) => {
  await db.Offers.update(
    { customerStatus: CONSTANTS.OFFER_STATUS_WON },
    { where: { id: offerId }, transaction },
  );

  await db.Offers.update(
    { customerStatus: CONSTANTS.OFFER_STATUS_REJECTED },
    { where: { contestId, id: { [db.Sequelize.Op.ne]: offerId } }, transaction },
  );

  const finishedContest = await contestQueries.updateContestStatus(
    { status: CONSTANTS.CONTEST_STATUS_FINISHED },
    { id: contestId },
    transaction,
  );


  await userQueries.updateUser(
    { balance: db.sequelize.literal(`balance + ${finishedContest.prize}`) },
    creatorId,
    transaction,
  );

  await transaction.commit();

  const rejectedOffers = await db.Offers.findAll({
    where: { contestId, customerStatus: CONSTANTS.OFFER_STATUS_REJECTED },
  });

  const rejectedUserIds = rejectedOffers
    .filter(o => o.userId !== creatorId)
    .map(o => o.userId);

  if (rejectedUserIds.length) {
    controller.getNotificationController().emitChangeOfferStatus(
      rejectedUserIds,
      'Someone of your offers was rejected',
      contestId,
    );
  }

  controller.getNotificationController().emitChangeOfferStatus(
    creatorId,
    'Congratulations! Your offer WON',
    contestId,
  );

  return db.Offers.findByPk(offerId);
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.sequelize.transaction();

    const { command, offerId, contestId, creatorId } = req.body;

    if (command === 'reject') {
      const [_, [updatedOffer]] = await db.Offers.update(
        { customerStatus: CONSTANTS.OFFER_STATUS_REJECTED },
        { where: { id: offerId }, returning: true, transaction },
      );

      if (!updatedOffer) {
        await transaction.rollback();
        return next(new ServerError('Offer not found'));
      }

      await transaction.commit();

      controller.getNotificationController().emitChangeOfferStatus(
        creatorId,
        'Someone of your offers was rejected',
        contestId,
      );

      return res.send(updatedOffer);
    }

    if (command === 'resolve') {
      const winningOffer = await resolveOffer(
        contestId,
        creatorId,
        offerId,
        transaction,
      );

      return res.send(winningOffer);
    }

    await transaction.rollback();
    return next(new ServerError('Invalid command'));
  } catch (err) {
    if (transaction) await transaction.rollback();
    next(err);
  }
};

module.exports.getCustomersContests = (req, res, next) => {
  db.Contests.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offers,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length),
      );
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => next(new ServerError(err)));
};

module.exports.getContests = (req, res, next) => {
  const predicates = UtilFunctions.createWhereForAllContests(
    req.body.typeIndex,
    req.body.contestId,
    req.body.industry,
    req.body.awardSort,
  );
  db.Contests.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: db.Offers,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => (contest.dataValues.count = contest.dataValues.Offers.length),
      );
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      next(new ServerError());
    });
};

module.exports.getOffers = async (req, res, next) => {
  try{
    if (req.tokenData.role !== CONSTANTS.MODERATOR) {
      return res.status(403).send({ message: 'Access denied' });
    }
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;
    const  { count, rows } = await db.Offers.findAndCountAll({
      limit,
      offset,
      attributes: {
        exclude: ['userId'],
      },
      include: [{
        model: db.Contests,
        attributes: {
          exclude: ['userId', 'orderId', 'status', 'prize'],
        },
      }],
      order: [['id', 'DESC']],
    });


    return res.status(200).send({ offers: rows, totalCount: count });

  }catch(e){
    return next(new ServerError());
  }
};

module.exports.moderateOffer = async (req, res, next) => {
  try{
    const { offerId, command } = req.body;

    let newStatus;
    if(command === 'approved') newStatus = CONSTANTS.OFFER_STATUS_MODERATOR_APPROVED;
    if(command === 'rejected') newStatus = CONSTANTS.OFFER_STATUS_MODERATOR_REJECTED;

    const [_, [updatedOffer]] = await db.Offers.update(
      { moderatorStatus: newStatus },
      { where: { id: offerId }, returning: true },
    );

    if (!updatedOffer) {
      return next(new ServerError('Offer not found or not updated'));
    }
    controller
      .getNotificationController()
      .emitChangeOfferStatus(
        updatedOffer.userId,
        `Your offer was ${command} by moderator`,
        updatedOffer.contestId,
      );

    res.send(updatedOffer);

    (async () => {
      try {
        const offerWithUserAndContest = await db.Offers.findByPk(updatedOffer.id, {
          include: [db.Users, db.Contests],
        });

        if (offerWithUserAndContest) {
          await sendOfferStatusEmail(
            offerWithUserAndContest.User.email,
            offerWithUserAndContest,
            command,
          );
        }
      } catch (err) {
        console.error('Email send error:', err);
      }
    })();
  }catch(e){
    return next(new ServerError());
  }
};

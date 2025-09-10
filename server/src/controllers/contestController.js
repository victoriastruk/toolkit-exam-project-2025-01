const db = require('../models');
const ServerError = require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
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
        status: [
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

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`   CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
  CONSTANTS.CONTEST_STATUS_FINISHED
}'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
  CONSTANTS.CONTEST_STATUS_ACTIVE
}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction,
  );

  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction,
  );

  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    { contestId },
    transaction,
  );

  await transaction.commit();

  const rejectedUserIds = updatedOffers
    .filter(offer => offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !== offer.userId)
    .map(offer => offer.userId);

  if (rejectedUserIds.length > 0) {
    controller
      .getNotificationController()
      .emitChangeOfferStatus(
        rejectedUserIds,
        'Someone of your offers was rejected',
        contestId,
      );
  }

  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Congratulations! Your offer WON',
      contestId,
    );

  return updatedOffers.find(o => o.id === offerId).dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const [ _, [offer]] = await db.Offers.update(
        { status: CONSTANTS.OFFER_STATUS_REJECTED },
        { where: { id: req.body.offerId }, returning: true },
      );

      if(!offer) return next(new ServerError('Offer not found'));

      controller
        .getNotificationController()
        .emitChangeOfferStatus(
          req.body.creatorId,
          'Someone of yours offers was rejected',
          req.body.contestId,
        );
      res.send(offer);
    } catch (err) {
      next(err);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
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
    const offers = await db.Offers.findAll({
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

    const haveMore = offers.length === limit;

    return res.status(200).send({ offers, haveMore });

  }catch(e){
    return next(new ServerError());
  }
};

module.exports.moderateOffer = async (req, res, next) => {
  try{
    const { offerId, command } = req.body;

    let newStatus;
    if(command === 'approve') newStatus = CONSTANTS.OFFER_STATUS_MODERATOR_APPROVED;
    if(command === 'reject') newStatus = CONSTANTS.OFFER_STATUS_MODERATOR_REJECTED;

    const [_, [updatedOffer]] = await db.Offers.update(
      { status: newStatus },
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
  }catch(e){
    return next(new ServerError());
  }
};

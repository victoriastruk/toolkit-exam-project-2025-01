const schems = require('../validationSchemes/schems');
const BadRequestError = require('../errors/BadRequestError');

module.exports.validateRegistrationData = async (req, res, next) => {
  const validationResult = await schems.registrationSchem.isValid(req.body);
  if (!validationResult) {
    return next(new BadRequestError('Invalid data for registration'));
  } else {
    next();
  }
};

module.exports.validateLogin = async (req, res, next) => {
  const validationResult = await schems.loginSchem.isValid(req.body);
  if (validationResult) {
    next();
  } else {
    return next(new BadRequestError('Invalid data for login'));
  }
};

module.exports.validateContestCreation = async (req, res, next) => {
  try {
    const schema = schems.contestSchem.clone().transform((currentValue) => {
      if (currentValue === null || currentValue === undefined) return null;
      return currentValue;
    });

    const results = await Promise.all(
      req.body.contests.map(el => schema.isValid({
        ...el,
        fileName: el.fileName ? el.fileName : null
      }))
    );

    const isValid = results.every(r => r === true);
    if (!isValid) {
      return next(new BadRequestError('Invalid contest data'));
    }

    next();
  } catch (err) {
    next(err);
  }
};
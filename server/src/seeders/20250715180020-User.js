const bcrypt = require('bcrypt');
const { CUSTOMER, CREATOR, SALT_ROUNDS, MODERATOR } = require('../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'buyerfn',
        lastName: 'buyerln',
        displayName: 'buyerdn',
        password: bcrypt.hashSync('12343456', SALT_ROUNDS),
        email: 'buyer@gmail.com',
        role: CUSTOMER,
      },
      {
        firstName: 'creativefn',
        lastName: 'creativeln',
        displayName: 'creativedn',
        password: bcrypt.hashSync('12343456', SALT_ROUNDS),
        email: 'creative@gmail.com',
        role: CREATOR,
      },
      {
        firstName: 'moderatorfn',
        lastName: 'moderatorln',
        displayName: 'moderatordn',
        password: bcrypt.hashSync('12343456', SALT_ROUNDS),
        email: 'moderator@gmail.com',
        role: MODERATOR,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

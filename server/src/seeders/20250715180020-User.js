const bcrypt = require('bcrypt');
const { CUSTOMER, CREATOR, SALT_ROUNDS } = require('../constants');

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
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};

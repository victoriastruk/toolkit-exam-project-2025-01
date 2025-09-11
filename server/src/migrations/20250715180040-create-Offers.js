const {
  OFFER_STATUS_MODERATOR_PENDING,
  OFFER_STATUS_MODERATOR_APPROVED,
  OFFER_STATUS_MODERATOR_REJECTED,
  OFFER_STATUS_PENDING,
  OFFER_STATUS_WON,
  OFFER_STATUS_REJECTED,
} = require('../constants');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      contestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Contests',
          key: 'id',
        },
      },
      text: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      customerStatus: {
        type: Sequelize.ENUM(
          OFFER_STATUS_PENDING,
          OFFER_STATUS_REJECTED,
          OFFER_STATUS_WON,
        ),
        allowNull: false,
        defaultValue: OFFER_STATUS_PENDING,
      },
      moderatorStatus: {
        type: Sequelize.ENUM(
          OFFER_STATUS_MODERATOR_APPROVED,
          OFFER_STATUS_MODERATOR_REJECTED,
          OFFER_STATUS_MODERATOR_PENDING,
        ),
        allowNull: false,
        defaultValue: OFFER_STATUS_MODERATOR_PENDING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Offers');
  },
};

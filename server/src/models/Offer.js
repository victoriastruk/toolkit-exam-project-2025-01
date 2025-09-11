const {
  OFFER_STATUS_PENDING,
  OFFER_STATUS_REJECTED,
  OFFER_STATUS_WON,
  OFFER_STATUS_MODERATOR_APPROVED,
  OFFER_STATUS_MODERATOR_REJECTED,
  OFFER_STATUS_MODERATOR_PENDING,
} = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define(
    'Offers',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contestId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      customerStatus: {
        type: DataTypes.ENUM(
          OFFER_STATUS_PENDING,
          OFFER_STATUS_WON,
          OFFER_STATUS_REJECTED,
        ),
        allowNull: false,
        defaultValue: OFFER_STATUS_PENDING,
      },
      moderatorStatus: {
        type: DataTypes.ENUM(
          OFFER_STATUS_MODERATOR_PENDING,
          OFFER_STATUS_MODERATOR_APPROVED,
          OFFER_STATUS_MODERATOR_REJECTED,
        ),
        allowNull: false,
        defaultValue: OFFER_STATUS_MODERATOR_PENDING,
      },
    },
    {
      timestamps: false,
    },
  );

  Offer.associate = function (models) {
    Offer.belongsTo(models.Users, { foreignKey: 'userId' });
    Offer.belongsTo(models.Contests, { foreignKey: 'contestId' });
    Offer.hasOne(models.Ratings, { foreignKey: 'offerId' });
  };

  return Offer;
};

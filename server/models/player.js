const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static get initData() {
      return {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }
    }
    static associate(models) {
      Player.hasOne(models.Profile, {
        foreignKey: 'playerId',
        as: 'profile',
      });
    }
  };
  Player.init(Player.initData, {
    sequelize,
    modelName: 'player',
  });
  return Player;
};
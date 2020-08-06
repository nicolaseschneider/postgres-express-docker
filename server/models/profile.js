const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
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
        playerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'players',
            key: 'id',
          },
          onDelete: 'CASCADE',
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
      Profile.belongsTo(models.Player, {
        foreignKey: 'playerId',
        onDelete: 'CASCADE',
        as: 'player',
      })
    }
  };
  Profile.init({
    body: DataTypes.STRING,
    playerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
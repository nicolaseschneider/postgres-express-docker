const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || '0.0.0.0',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == 'true'
    }
  });

//===== MODELS =====

// when sequelize.sync() is run, It will create tables for every Model

const Player = sequelize.define('players', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Profile = sequelize.define('profile', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  body: {
    type: Sequelize.STRING,
  },
  playerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'players',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});
//==================

// ASSOCIATIONS

Player.associate = models => {
  Player.hasOne(models.Profile, {
    foreignKey: 'playerId',
    as: 'profile',
  })
}

Profile.associate = models => {
  Profile.belongsTo(models.Player, {
    foreignKey: 'playerId',
    onDelete: 'CASCADE',
    as: 'player',
  })
}

// add new models to this obj as more associations are built out
const models = { Player, Profile };
// this is where we actually tell sequelize what the associations are
Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models)
  }
});
//
//===================

module.exports = {
  sequelize,
  Player,
  Profile,
};

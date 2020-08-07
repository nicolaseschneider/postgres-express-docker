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

// const Player = sequelize.define('players', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   lastName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// const Profile = sequelize.define('profile', {
//   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   body: {
//     type: Sequelize.STRING,
//   },
//   playerId: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'players',
//       key: 'id',
//     },
//     onDelete: 'CASCADE',
//   },
// });

// HERES THE NOTABLE STUFF

const Doctor = sequelize.define('doctor', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Appointment = sequelize.define('appointment', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  ptFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ptLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // Scheduled day should be formatted as ('YYYY-MM-DD')
  scheduledDay: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  // scheduledTime should be formatted as 'HH:MM'
  // HH can be from 00 - 23
  // MM can be from 00 - 59
  scheduledTime: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  kind: {
    type: Sequelize.ENUM('newPatient', 'followUp')
  },
  doctorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'doctors',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
});

const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  authLevel: {
    type: Sequelize.ENUM('doctor', 'admin')
  }
});
//==================

// ASSOCIATIONS
Doctor.associate= models => {
  Doctor.hasMany(models.Appointment, {
    as: 'appointments',
    foreignKey: 'doctorId',
  })
};

Appointment.associate= models => {
  Appointment.belongsTo(models.Doctor, {
    as: 'doctor',
    targetKey: 'id',
    foreignKey: 'doctorId',
  });
};

// Player.associate = models => {
//   Player.hasOne(models.Profile, {
//     foreignKey: 'playerId',
//     as: 'profile',
//   })
// };

// Profile.associate = models => {
//   Profile.belongsTo(models.Player, {
//     foreignKey: 'playerId',
//     onDelete: 'CASCADE',
//     as: 'player',
//   })
// };

// add new models to this obj as more associations are built out
const models = { 
  // Player,
  // Profile,
  Doctor, Appointment, User };
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
  // Player,
  Doctor,
  Appointment,
  User,
  // Profile,
};

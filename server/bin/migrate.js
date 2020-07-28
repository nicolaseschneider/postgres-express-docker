var db = require ('../database.js');


// sequelize.sync
// this will create all tables as defined by our models in database.js
// { force: true } drops existing tables
db.sequelize.sync({ force: true });
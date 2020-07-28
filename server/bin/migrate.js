var db = require ('../database.js');


// sequelize.sync
// this will create all tables as defined by our models in database.js

// { force: true } drops existing tables related to our models in database.js
// remove the force: true if you are deploying anything to production

// Object.keys(db).forEach(modelName => {
//   console.log('\n', modelName);
//   if (modelName !== 'sequelize' && db[modelName].associate) {
//     console.log('\n building associations... \n',)  
//     db[modelName].associate(db);
//   }
// });
db.sequelize.sync({force: true});
var express = require('express');
var { sequelize } = require('../database');
var router = express.Router();

router.get('/world', function(req, res, next) {
  res.status(200).send('hello dude!');
});
router.get('/schema', function(req, res, next) {

  // just a debugging tool, to quickly view table schema
  // not for prd
  sequelize.query('show tables').then(function(rows) {
    console.log('tables \n', JSON.stringify(rows));
  });
  sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {
    console.log('// Tables in database','==========================');
    console.log(tableObj);

    res.status(200).send(JSON.stringify(tableObj));
  });
});

module.exports = router;
var express = require('express');
var { sequelize } = require('../database');
var router = express.Router();

router.get('/world', function(req, res, next) {
  res.status(200).send('hello world');
});

module.exports = router;
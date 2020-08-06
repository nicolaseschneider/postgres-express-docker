const { Op } = require("sequelize");
var express = require('express');
var router = express.Router();
var { Player } = require('../models/index');

router.get('/all', (req, res) => {
  Player.findAll()
    .then(players => {
      res.status(200).send(JSON.stringify(players));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(JSON.stringify(err));
    });
});

router.get('/newest', (req, res) => {
  Player.findOne({
    order: [['createdAt', 'DESC']],
  }).then(player => {
    res.status(200).send(JSON.stringify(player))
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err));
  });
});

router.get('/1and3', (req, res) => {
  Player.findAll({
    where: {
      [Op.or]: {
        id: [1, 3]
      }
    }
  }).then(players => {
    res.status(200).send(JSON.stringify(players));
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(JSON.stringify(err));
  });
});

router.get('/:id', (req, res) => {
  Player.findByPk(req.params.id)
    .then(player => {
      res.status(200).send(JSON.stringify(player));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    })
});


router.put('/', (req, res) => {
  // console.log(req.body);
  const {
    firstName,
    lastName,
    username,
    id,
  } = req.body;
  
  Player.create({
    firstName,
    lastName,
    username,
    id,
  })
    .then(player => {
      res.status(200).send(JSON.stringify(player));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.delete('/:id', (req, res) => {
  Player.destroy({
    where: {
      id: req.params.id,
    }
    })
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(500).send(JSON.stringify(err));
    })
});

module.exports = router;

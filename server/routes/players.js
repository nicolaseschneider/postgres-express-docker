var express = require('express');
var router = express.Router();
var { Player } = require('../database');

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

router.get('/:id', (req, res) => {
  Player.findByPk(req.params.id)
    .then(Player => {
      res.status(200).send(JSON.stringify(Player));
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

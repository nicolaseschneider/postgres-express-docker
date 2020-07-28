var express = require('express');
var router = express.Router();

var { Player } = require('../database');

const USER_SEEDS = [
  {
    firstName: 'Frank',
    lastName: 'Horrigan',
    username: 'Enclave110'
  },
  {
    firstName: 'Todd',
    lastName: 'Howard',
    username: '16XtheDetail',
  },
  {
    firstName: 'Brock',
    lastName: 'Hampton',
    username: 'feelingood',
  },
];

router.put('/', (req, res) => {
  Player.bulkCreate(USER_SEEDS).
  then(players => {
    res.status(200).send(JSON.stringify(players));
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err));
  });
})

module.exports = router;
 
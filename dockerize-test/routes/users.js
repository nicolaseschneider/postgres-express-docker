var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/all', (req, res) => {
  db.User.findAll()
    .then(users => {
      res.status(200).send(JSON.stringify(users));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(JSON.stringify(err));
    });
});

router.get('/:id', (req, res) => {
  db.User.findByPk(req.params.id)
    .then(user => {
      res.status(200).send(JSON.stringify(user));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    })
});

router.put('/', (req, res) => {
  db.User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    id: req.body.id,
  })
    .then(user => {
      res.status(200).send(JSON.stringify(user));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.delete('/:id', (req, res) => {
  db.User.destroy({
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

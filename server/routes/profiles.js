var express = require('express');
var router = express.Router();
var { Player } = require('../models/index');
var { Profile } = require('../database');

router.put('/:playerId', async (req, res) => {
  const { playerId } = req.params;
  const { body } = req.body;
  const existing = await Profile.findOne({
    where: {
      playerId
    }
  });
  if (existing) {
    existing.update({
      body,
    })
    .then(prof => {
      res.status(200).send(JSON.stringify(prof));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    });
  } else {
    Profile.create({
      playerId,
      body,
    })
    .then(prof => {
      res.status(200).send(JSON.stringify(prof));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    });
  }
});

router.get('/:playerId', async (req, res) => {
  const { playerId } = req.params;

  Player.findOne({
    where: {
      id: playerId,
    },
    include: ['profile'],
  })
  .then(player => {
    const resultingProfile = {
      first: player.firstName,
      last: player.lastName,
      username: player.username,
      body: player.profile.body,
    }
    res.status(200).send(JSON.stringify(resultingProfile));
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(JSON.stringify(err));
  });
});

module.exports = router;

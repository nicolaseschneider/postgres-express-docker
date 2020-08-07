// const { Op } = require("sequelize");
// var moment = require('moment');
var express = require('express');
var router = express.Router();
var { Doctor, Appointment, User } = require('../database');


router.use('/:id', async (req, res, next) => {
  const { userId } = req.headers;
  const user = User.findByPk(userId);
  if (user) {
    if (['doctor', 'admin'].includes(user.authLevel)) {
      next();
    }
  }
  res.status(401).send('Unauthorized');
})

// get all doctors
router.get('/all', (req, res) => {
  Doctor.findAll()
    .then(doctors => {
      res.status(200).send(JSON.stringify(doctors));
    })
    .catch(err => {
      // console.log(err);
      res.status(500).send(JSON.stringify(err));
    });
});

// get all apts for a doctor on a given day
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // day comes in the form of a date string formatted as 'YYYY-MM-DD'
  // the moment.js library makes it very easy to get dates formatted like this
  // moment().format('YYYY-MM-DD') would be called on the frontend,
  // the resulting string would then passed back in the request body
  const { scheduledDay } = req.body;
  Appointment.findAll({
    where: {
      scheduledDay,
      doctorId: id,
    },
  }).then(apts => {
    res.status(200).send(JSON.stringify(apts));
  })
  .catch(err => {
    res.status(500).send(JSON.stringify(err));
  })

});
router.delete('/:id', (req, res) => {
  Doctor.destroy({
    where: {
      id: req.params.id,
    }
    })
    .then(() => {
      res.status(200).send();
    })
    .catch(() => {
      res.status(500).send(JSON.stringify(err));
    });
});

router.put('/', (req, res) => {
  // console.log(req.body);
  const {
    firstName,
    lastName,
  } = req.body;
  
  Doctor.create({
    firstName,
    lastName,
  })
    .then(doctor => {
      res.status(200).send(JSON.stringify(doctor));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    });
});

module.exports = router;

// var moment = require('moment');
var express = require('express');
var router = express.Router();
var { Doctor, Appointment } = require('../database');

// delete an appointment
router.delete('/:id', (req, res) => {
  Appointment.destroy({
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

// schedule a new appointment
router.put('/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  const {
    patientFirstName,
    patientLastName,
    kind,
    hour,
    quarter,
    scheduledDay
  } = req.body;

  // first check to see if there are already 3 appts at this date/time

  // hour should be a string of an integer from 0 - 23
  // quarter should be an integer from 0 - 3
  const scheduledTime = `${hour}:${quarter * 15}`

  const numApts = await Appointment.count({
    where: {
      doctorId,
      scheduledDay,
      scheduledTime,
    }
  });
  if (numApts > 2) {
    res.status(500).send(JSON.stringify('too many appointments for this time slot'));
  } else {
    Appointment.create({
      patientFirstName,
      patientLastName,
      kind,
      scheduledTime,
      scheduledDay,
      doctorId,
    }).then(apts => {
      res.status(200).send(JSON.stringify(apts));
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err));
    })
  }
})


module.exports = router;

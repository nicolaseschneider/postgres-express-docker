var express = require('express');
var router = express.Router();

var { Doctor, Appointment } = require('../database');

const DOCTOR_SEEDS = [
  {
    firstName: 'Frank',
    lastName: 'Horrigan',
  },
  {
    firstName: 'Todd',
    lastName: 'Howard',
  },
  {
    firstName: 'Brock',
    lastName: 'Hampton',
  },
];

const APPOINTMENT_SEEDS = [
  {
    ptFirstName: 'Timmy',
    ptLastName: 'Jenkins',
    doctorId: 1,
    scheduledDay: '2020-07-29',
    kind: 'newPatient',
    scheduledTime: '13:30'
  },
  {
    ptFirstName: 'Bimmy',
    ptLastName: 'Jenkins',
    doctorId: 1,
    scheduledDay: '2020-07-29',
    kind: 'followUp',
    scheduledTime: '13:30',
  },
  {
    ptFirstName: 'Spike',
    ptLastName: 'Thompson',
    doctorId: 1,
    scheduledDay: '2020-07-29',
    kind: 'newPatient',
    scheduledTime: '13:30',
  }
]

router.put('/', (req, res) => {
  const seeded = [];
  Doctor.bulkCreate(DOCTOR_SEEDS).then(docs => {
    seeded.push(docs);
    Appointment.bulkCreate(APPOINTMENT_SEEDS).then(apts => {
      seeded.push(apts);
      res.status(200).send(JSON.stringify(seeded));
    }).catch(err => {
      console.log(err);
      res.status(500).send(JSON.stringify(err));
    });

  })
  .catch(err => {
    console.log(err);
    res.status(500).send(JSON.stringify(err));
  });
})

module.exports = router;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// ==== ROUTERS ====
var indexRouter = require('./routes/index');
var playersRouter = require('./routes/players');
var helloWorldRouter = require('./routes/hello');
var profileRouter = require('./routes/profiles');
var seedRouter = require('./routes/seed');

var doctorRouter = require('./routes/doctors');
var appointmentRouter = require('./routes/appointments');

// =================

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/hello', helloWorldRouter);
app.use('/seed', seedRouter);
app.use('/prof', profileRouter);

app.use('/dr', doctorRouter);
app.use('/apt', appointmentRouter);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var dbStart = require('./db_startup');
const app = express();

// routes
var calendarRoutes = require('./routes/calendar');
var userRoutes = require('./routes/user');
var roleRoutes= require('./routes/role');
var monRoutes= require('./routes/mon');
var sessionRoutes= require('./routes/session');

app.use(bodyParser.json()); // parses POST request json

// handling for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  //intercepts OPTIONS method from CORS
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }
});

// connect to database
var connection = dbStart.connect();
dbStart.create(connection);

app.use('/api/user', userRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/mon', monRoutes);
app.use('/api/session', sessionRoutes);
module.exports = app;

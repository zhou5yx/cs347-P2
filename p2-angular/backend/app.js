const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var dbStart = require('./db_startup');
const app = express();

// routes
var calendarRoutes = require('./routes/calendar');
var userRoutes = require('./routes/user');

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
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'p2'
});

connection.connect(function(err) {
    if (err) console.log(err);
    else {
      // create tables, add data to db
      console.log("Connected to db!");
      dbStart.create(connection);
      dbStart.addUsers(connection);
    }
});

app.use('/api/user', userRoutes);
app.use('/api/calendar', calendarRoutes)
module.exports = app;

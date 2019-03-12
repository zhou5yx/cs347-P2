const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.get('/api/calendar-events/:id', (req, res, next) => {
  res.status(200).json({
    events: [
      [[],[],[],[],[],[],[]],
      [
        [],
        [
          {start: 1, end: 2, type: 'shift'},
          {start: 3, end: 4, type: 'shift'}
        ],
        [],[],
        [
          {start: 1, end: 4, type: 'shift'},
          {start: 7, end: 11, type: 'cover'}
        ],
        [],[]
      ],
      [
        [],[],[],[],[],[],
        [
          {start: 1, end: 2, type: 'cover'},
          {start: 5, end: 8, type: 'shift'}
        ],
      ],
      [
        [],[],[],[],[],
        [
          {start: 7, end: 11, type: 'shift'}
        ],
        [],
      ],
      [
        [],[],[],[],
        [
          {start: 5, end: 9, type: 'shift'}
        ],
        [],[]
      ],
      [
        [
          {start: 1, end: 2, type: 'cover'},
          {start: 3, end: 4, type: 'cover'}
        ],
        [],[],[],[],[],[]
      ]
    ]
  });
});

module.exports = app;

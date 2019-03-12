const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.send("you have tuned into the server. Congrats!");
});

module.exports = app;

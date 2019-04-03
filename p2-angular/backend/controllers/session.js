const db = require('../db_startup');
const bcrypt = require('bcryptjs');

exports.addQuestion= function(req, res, next) {
  var connection = db.connect();
  var now = new Date(); // current date
  var dateStr = now.getYear() + '-' + (now.getMonth() + 1) + '-'
    + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes()
    + ':' + now.getSeconds();
  connection.query("INSERT INTO question VALUES (id, 1, " + req.body.id + ", '"
    + req.body.title + "', '" + req.body.description + "', NULL, NULL, 'Unresolved', 0, "
    + "'" + dateStr + "')",
  function(err, result) {
    if (err) return res.status(500).json({
      message: 'Unable to add question',
      error: err
    });
    else {
      return res.status(201).json({
        message: 'Question added',
        result: result
      });
    }
    connection.end();
  });
};

exports.getQuestions = function(req, res, next) {
  var connection = db.connect();
  console.log('adsf');
  connection.query("SELECT * FROM question WHERE session_id=1", function(err, results) {
    if (err) return res.status(500).json({
      message: 'Unable to get questions',
      error: err
    });
    else {
      return res.status(200).json({
        message: 'Questions retrieved',
        result: results
      });
    }
    connection.end();
  });
}

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

exports.addAnnouncement = function(req, res, next) {
  var connection = db.connect();
  connection.query("INSERT INTO announcement VALUES (id, 1, '" + req.body.title
    + "', '" + req.body.description + "', " + req.body.id + ")",
  function(err, result) {
    if (err) return res.status(500).json({
      message: 'Unable to add announcement',
      error: err
    });
    else {
      return res.status(201).json({
        message: 'Announcement added',
        result: result
      });
    }
    connection.end();
  });
};

exports.getQuestions = function(req, res, next) {
  var connection = db.connect();
  connection.query("SELECT q.*, u.firstname, u.lastname FROM question AS q JOIN user AS u "
    + "ON q.user_id = u.id WHERE q.session_id=1", function(err, results) {
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

exports.getAnnouncements = function(req, res, next) {
  var connection = db.connect();
  connection.query("SELECT a.*, u.firstname, u.lastname FROM announcement AS a JOIN user AS u "
    + "ON a.user_id = u.id WHERE a.session_id=1", function(err, results) {
    if (err) return res.status(500).json({
      message: 'Unable to get announcements',
      error: err
    });
    else {
      return res.status(200).json({
        message: 'Announcements retrieved',
        result: results
      });
    }
    connection.end();
  });
}

exports.updateQuestion = function(req, res, next) {
  var connection = db.connect();
  var update = "";
  if (req.body.votes) {
    update = "votes = " + req.body.votes;
  } else if (req.body.studentAns) {
    update = "student_answer = '" + req.body.studentAns + "'";
  } else if (req.body.taAns) {
    update = "ta_answer = '" + req.body.taAns + "'";
  }
  if (update.length > 0) {
    connection.query("UPDATE question SET " + update + " WHERE id = " + req.params.id, function(err, results) {
      if (err) return res.status(500).json({
        message: 'Unable to update question',
        error: err
      });
      else {
        return res.status(200).json({
          message: 'Question Updated',
          result: results
        });
      }
      connection.end();
    });
  } else {
    connection.end();
    return res.status(500).json({
      message: 'Unable to update question: invalid body'
    });
  }
}

const db = require('../db_startup');
const bcrypt = require('bcryptjs');

exports.getHoursForMonth = function(req, res, next) {
  var connection = db.connect();
  var sql = "SELECT concat(firstname, ' ', lastname) as name, month, hr FROM monhr JOIN user where user.id=monhr.user_id AND month = '"+req.params.month+"';";
  connection.query(sql,
  function(err, result) {
    if (err) return res.status(404).json({
      message: 'month not found',
      error: err
    });
    else return res.status(200).json(result);
    connection.end();
  });
};

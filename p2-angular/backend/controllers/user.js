const db = require('../db_startup');
const bcrypt = require('bcryptjs');
/**
 * Gets the attributes of the user from the parameters.
 * ex. profile/1 returns the user with the id of 1's data.
 */
exports.getUserInfo = function(req, res, next) {
  var connection = db.connect();
  connection.query('SELECT * FROM user WHERE id = ' + parseInt(req.params.id),
  function(err, result) {
    if (err) return res.status(404).json({
      message: 'User not found'
    });
    else return res.status(200).json(result);
    connection.end();
  });
};


/**
 * Regiser a new user from the registration form.
 */
exports.registerUser = function(req, res, next) {
  var connection = db.connect();
  console.log(req.body);
  var roles = {
    ta: 1,
    student: 2,
    admin: 3
  };
  var course = req.body.role_id === 'admin' ? 'NULL' : parseInt(req.body.course);
  // encrypt password
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const sql = "INSERT INTO user VALUES (id, " + "'" + req.body.eid + "', '" + hash
        + "', '" + req.body.firstname + "', '" + req.body.lastname + "', "
        + roles[req.body.role] + ", " + course + ", NULL)";
      connection.query(sql, function(err, result) {
        if (err) {
            return res.status(500).json({
            message: 'Error creating user',
            error: err
          });
        } else {
          return res.status(201).json({
            message: 'User successfully registered',
            result: result
          });
        }
        connection.end();
      });
    });
}

exports.loginUser = function(req, res, next) {
  var connection = db.connect();
  return null;
}

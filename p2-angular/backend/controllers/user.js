const db = require('../db_startup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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


exports.getAllUser = function(req, res, next) {
  var connection = db.connect();
  connection.query('SELECT * FROM user WHERE role_id =1',
  function(err, result) {
    if (err) return res.status(404).json({
      message: 'Users not found'
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
  var roles = {
    ta: 1,
    student: 2,
    admin: 3
  };
  var course = req.body.role === 'admin' ? 149 : parseInt(req.body.course);
  // encrypt password
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const sql = "INSERT INTO user VALUES (id, " + "'" + req.body.eid + "', '" + hash
        + "', '" + req.body.firstname + "', '" + req.body.lastname + "', "
        + roles[req.body.role] + ", " + course + ")";
      connection.query(sql, function(err, result) {
        if (err) {
            return res.status(500).json({
            message: 'Error creating user',
            error: err
          });
        } else {
          // create ta hours
          if (req.body.role === 'ta') {
            console.log(req.body);
            console.log(req.body['monday-start']);
            var mondayStart = req.body['monday-start'] ? req.body['monday-start'] : -1;
            var mondayEnd = req.body['monday-end'] ? req.body['monday-end'] : -1;
            var tuesdayStart = req.body['tuesday-start'] ? req.body['tuesday-start'] : -1;
            var tuesdayEnd = req.body['tuesday-end'] ? req.body['tuesday-end'] : -1;
            var wednesdayStart = req.body['wednesday-start'] ? req.body['wednesday-start'] : -1;
            var wednesdayEnd = req.body['wednesday-end'] ? req.body['wednesday-end'] : -1;
            var thursdayStart = req.body['thursday-start'] ? req.body['thursday-start'] : -1;
            var thursdayEnd = req.body['thursday-end'] ? req.body['thursday-end'] : -1;
            var fridayStart = req.body['friday-start'] ? req.body['friday-start'] : -1;
            var fridayEnd = req.body['friday-end'] ? req.body['friday-end'] : -1;
            var sundayStart = req.body['sunday-start'] ? req.body['sunday-start'] : -1;
            var sundayEnd = req.body['sunday-end'] ? req.body['sunday-end'] : -1;
            const taSql = "INSERT INTO avail VALUES (id, " + result.insertId + ", " + mondayStart + ", "
              + mondayEnd + ", " + tuesdayStart + ", " + tuesdayEnd + ", " + wednesdayStart
              + ", " + wednesdayEnd + ", " + thursdayStart + ", " + thursdayEnd + ", "
              + fridayStart + ", " + fridayEnd + ", " + sundayStart + ", " + sundayEnd + ")";
            connection.query(taSql, function(err, result) {
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
            });
          } else {
            return res.status(201).json({
              message: 'User successfully registered',
              result: result
            });
          }
        }
        connection.end();
      });
    });
}

exports.loginUser = function(req, res, next) {
  var connection = db.connect();
  const sql = "SELECT * FROM user WHERE username = '" + req.body.login + "'";
  connection.query(sql, function(err, result) {
    if (err) { // error in sql
        return res.status(500).json({
        message: 'Error logging in',
        error: err
      });
    } else {
      if (result.length !== 1) { // username not found in db
        return res.status(401).json({
          message: 'User not found',
        });
      }
      bcrypt.compare(req.body.password, result[0].password)
        .then((same) => {
          const token = jwt.sign({
            id: result[0].id,
            username: result[0].username,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            roleId: result[0].role_id,
            courseId: result[0].courseId,
            monthlyHours: result[0].monthly_hours
          }, 'secretstringthing');
          if (same) { // password matches
            return res.status(200).json({
              message: 'User successfully logged in',
              user: {
                id: result[0].id,
                username: result[0].username,
                firstname: result[0].firstname,
                lastname: result[0].lastname,
                roleId: result[0].role_id,
                courseId: result[0].course_id,
                monthlyHours: result[0].monthly_hours
              },
              token: token
            });
          } else { // wrong password
            return res.status(500).json({
              message: 'Wrong password',
            });
          }
        });
    }
    connection.end();
  });
  return null;
}

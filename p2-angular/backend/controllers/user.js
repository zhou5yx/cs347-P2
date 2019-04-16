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

exports.generateSchedule = function(req, res, next) {
  var connection = db.connect();
  var sql = "INSERT INTO event VALUES (id, 3, NULL,NULL, 'shift','2019-04-16 17:00:00','2019-04-16 19:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3,NULL, 'shift','2019-04-19 17:00:00','2019-04-19 19:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3,NULL, 'shift','2019-04-05 16:00:00','2019-04-05 22:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3,NULL, 'cover','2019-04-26 17:00:00','2019-04-26 19:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3, NULL, 'cover','2019-04-18 21:00:00','2019-04-18 23:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3, NULL, 'shift','2019-04-29 20:00:00','2019-04-29 23:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3, NULL, 'shift','2019-04-07 13:00:00','2019-04-07 17:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3, NULL, 'shift','2019-04-09 17:00:00','2019-04-09 19:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3, NULL, 'shift','2019-04-14 17:00:00','2019-04-14 19:00:00',149,250);"
  +"INSERT INTO event VALUES (id, 3, 3, NULL, 'shift','2019-04-12 17:00:00','2019-04-12 19:00:00',149,250);"
  +"INSERT INTO event VALUES(id, 1, 1, NULL, 'shift', '2019-04-07 13:00:00','2019-04-07 15:00:00',159,250);"
  +"INSERT INTO event VALUES(id, 4, 4, NULL, 'shift', '2019-04-07 15:00:00','2019-04-07 17:00:00',159,250);"
  +"INSERT INTO event VALUES(id, 1, 1, NULL, 'shift', '2019-04-14 13:00:00','2019-04-14 15:00:00',159,250);"
  +"INSERT INTO event VALUES(id, 4, 4, NULL, 'shift', '2019-04-14 15:00:00','2019-04-14 17:00:00',159,250);"
  +"INSERT INTO event VALUES(id, 4, 4, NULL, 'shift', '2019-04-21 13:00:00','2019-04-21 17:00:00',159,250);"
  +"INSERT INTO event VALUES(id, 4, 4, NULL, 'shift', '2019-04-28 13:00:00','2019-04-28 17:00:00',159,250);"
  +"INSERT INTO event VALUES(id, 1, 1, NULL, 'shift', '2019-05-05 15:00:00','2019-05-05 17:00:00',159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-01 18:00:00', '2019-04-01 22:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-03 19:00:00', '2019-04-03 23:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-04 21:00:00', '2019-04-04 23:00:00', 159,250);"
  +"INSERT INTO event VALUES (id, 1, 1,NULL, 'shift','2019-04-05 16:00:00','2019-04-05 22:00:00',159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-10 20:00:00', '2019-04-10 23:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-12 20:00:00', '2019-04-12 23:00:00', 159,250);"
  +"INSERT INTO event VALUES (id, 1, 1,NULL, 'shift','2019-04-19 16:00:00','2019-04-19 22:00:00',159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'shift', '2019-04-09 16:00:00', '2019-04-09 20:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'shift', '2019-04-16 16:00:00', '2019-04-09 20:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'shift', '2019-04-23 20:00:00', '2019-04-23 23:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'shift', '2019-04-02 20:00:00', '2019-04-02 23:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'shift', '2019-04-18 16:00:00', '2019-04-18 22:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'cover', '2019-04-08 16:00:00', '2019-04-08 22:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'cover', '2019-04-11 20:00:00', '2019-04-11 23:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'cover', '2019-04-15 16:00:00', '2019-04-11 18:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-17 16:00:00', '2019-04-17 18:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-25 18:00:00', '2019-04-17 23:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'shift', '2019-04-22 16:00:00', '2019-04-22 22:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,4,4, NULL, 'shift', '2019-04-26 16:00:00', '2019-04-26 22:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-24 15:00:00', '2019-04-24 17:00:00', 159,250);"
  +"INSERT INTO event VALUES(id,1,1, NULL, 'shift', '2019-04-29 15:00:00', '2019-04-29 17:00:00', 159,250);";



  connection.query(sql,[38,1] ,function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'error',
          error: err
        });
      }
      else {
        return res.status(200).json({
          result: result
        });
      }
    });
  connection.end();
  return null;
}

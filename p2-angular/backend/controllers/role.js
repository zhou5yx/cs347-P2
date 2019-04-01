const db = require('../db_startup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getRole = function(req, res, next) {
  var connection = db.connect();
  connection.query('SELECT role_name FROM role WHERE id = ' + parseInt(req.params.role_id),
  function(err, result) {
    if (err) return res.status(404).json({
      message: 'Role not found',
      error: err
    });
    else return res.status(200).json(result);
    connection.end();
  });

};

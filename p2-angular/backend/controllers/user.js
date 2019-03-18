var db = require('../db_startup');
exports.getUserInfo = function(req, res, next) {
  var connection = db.connect();
  var response;
  connection.query('SELECT * FROM user WHERE id = ' + parseInt(req.params.id),
  function(err, result) {
    if (err) return res.status(404).send('User not found');
    else return res.status(200).json(result);
    connection.end();
  });
};

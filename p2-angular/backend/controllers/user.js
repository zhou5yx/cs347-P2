var db = require('../db_startup');

/**
 * Gets the attributes of the user from the parameters.
 * ex. profile/1 returns the user with the id of 1's data.
 */
exports.getUserInfo = function(req, res, next) {
  var connection = db.connect();
  connection.query('SELECT * FROM user WHERE id = ' + parseInt(req.params.id),
  function(err, result) {
    if (err) return res.status(404).send('User not found');
    else return res.status(200).json(result);
    connection.end();
  });
};

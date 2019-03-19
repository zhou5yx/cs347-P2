var db = require('../db_startup');

/**
 * Get the calender events for the user passed into this through
 * params such as profile/1 and the month passed in through
 * query parameters.
 */
exports.getCalendarEventProfileData = function(req, res, next) {
  var connection = db.connect();
  var month = parseInt(req.query.month) + 1;
  var sql = "SELECT * FROM event WHERE user_id = " + req.params.id + " AND "
    + "start_date BETWEEN CAST('2019-" + month + "-01' AS DATE) AND "
    + "CAST('2019-" + month + "-31' AS DATE) OR "
    + "end_date BETWEEN CAST('2019-" + month + "-01' AS DATE) AND "
    + "CAST('2019-" + month + "-31' AS DATE);"
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred getting the calendar data',
        error: err
      });
    } else {
      return res.status(200).json({
        result: result
      });
    }
  });
}

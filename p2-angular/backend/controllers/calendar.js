var db = require('../db_startup');

/**
 * Get the calender events for the user passed into this through
 * params such as profile/1 and the month passed in through
 * query parameters.
 */
exports.getCalendarEventProfileData = function(req, res, next) {
  var connection = db.connect();
  var month = parseInt(req.query.month) + 1;
  var numDays = new Date(2019, month, 0).getDate();
  var sql = "SELECT * FROM event WHERE user_id = " + req.params.id + " AND "
    + "(start_date BETWEEN CAST('2019-" + month + "-01' AS DATE) AND "
    + "CAST('2019-" + month + "-" + numDays + "' AS DATE) OR "
    + "end_date BETWEEN CAST('2019-" + month + "-01' AS DATE) AND "
    + "CAST('2019-" + month + "-" + numDays + "' AS DATE));"
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

exports.getCourseEvents = function(req, res, next){
  var connection = db.connect();
  var month = parseInt(req.query.month) + 1;
  var numDays = new Date(2019, month, 0).getDate();
  var course = parseInt(req.query.course);

  var sql = "SELECT * FROM event WHERE course_id = " + course + " AND "
    + "(start_date BETWEEN CAST('2019-" + month + "-01' AS DATE) AND "
    + "CAST('2019-" + month + "-" + numDays + "' AS DATE) OR "
    + "end_date BETWEEN CAST('2019-" + month + "-01' AS DATE) AND "
    + "CAST('2019-" + month + "-" + numDays + "' AS DATE));"
  connection.query(sql, function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred getting the calendar course data',
          error: err
        });
      }
      else {
        return res.status(200).json({
          result: result
        });
      }
    });
}

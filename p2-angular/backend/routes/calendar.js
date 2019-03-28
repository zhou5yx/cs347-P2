var express = require('express');
var router = express.Router();
var CalendarController = require('../controllers/calendar');

router.get('/:id', CalendarController.getCalendarEventProfileData);
router.get('/',CalendarController.getCourseEvents);
router.put('/', CalendarController.updateEvent);

module.exports = router;

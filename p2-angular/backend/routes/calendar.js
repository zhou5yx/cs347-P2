var express = require('express');
var router = express.Router();
var CalendarController = require('../controllers/calendar');

router.get('/:id', CalendarController.getCalendarEventProfileData);

module.exports = router;

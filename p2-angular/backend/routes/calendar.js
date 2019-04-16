var express = require('express');
var router = express.Router();
var CalendarController = require('../controllers/calendar');
var checkAuth = require('../middleware/check-auth');

router.put('/hr', checkAuth, CalendarController.UpdateHours);
router.get('/pending', checkAuth, CalendarController.getPending);
router.get('/:id', checkAuth, CalendarController.getCalendarEventProfileData);
router.get('/', checkAuth, CalendarController.getCourseEvents);
router.put('/', checkAuth, CalendarController.updateEvent);


module.exports = router;

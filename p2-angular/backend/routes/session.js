var express = require('express');
var router = express.Router();
var SessionController = require('../controllers/session');
var checkAuth = require('../middleware/check-auth');

router.post('/question', checkAuth, SessionController.addQuestion);
router.get('/question', checkAuth, SessionController.getQuestions);
router.post('/announcement', checkAuth, SessionController.addAnnouncement);
router.get('/announcement', checkAuth, SessionController.getAnnouncements);
router.put('/question/:id', checkAuth, SessionController.updateQuestion);

module.exports = router;

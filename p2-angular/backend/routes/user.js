var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');
var checkAuth = require('../middleware/check-auth');


router.get('/:id', checkAuth, UserController.getUserInfo);
router.get('/', checkAuth, UserController.getAllUser);
router.post('/', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/schedule', checkAuth, UserController.generateSchedule)
module.exports = router;

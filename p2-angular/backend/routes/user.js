var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');
var checkAuth = require('../middleware/check-auth');

router.get('/:id', checkAuth, UserController.getUserInfo);
router.post('/', UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router;

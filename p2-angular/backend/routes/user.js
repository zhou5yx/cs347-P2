var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');

router.get('/:id', UserController.getUserInfo);
router.post('/', UserController.registerUser);

module.exports = router;

var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');

router.get('/:id', UserController.getUserInfo);

module.exports = router;

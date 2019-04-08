var express = require('express');
var router = express.Router();
var MonController = require('../controllers/mon');
var checkAuth = require('../middleware/check-auth');

router.get('/:month', checkAuth, MonController.getHoursForMonth);
module.exports = router;

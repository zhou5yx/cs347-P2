var express = require('express');
var router = express.Router();
var RoleController = require('../controllers/role');
var checkAuth = require('../middleware/check-auth');

router.get('/:role_id', checkAuth, RoleController.getRole);
module.exports = router;

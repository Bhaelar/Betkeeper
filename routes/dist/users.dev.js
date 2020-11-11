"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/users'),
    registerUser = _require.registerUser;

router.route('/').post(registerUser); // router.route('/:id').delete(deleteUser);

module.exports = router;
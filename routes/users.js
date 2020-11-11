const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/users');

router.route('/').post(registerUser);

// router.route('/:id').delete(deleteUser);

module.exports = router;
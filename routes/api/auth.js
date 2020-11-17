const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../middleware/auth');
const User = require('../../models/Users');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/',auth, async (req, res, next) => {
	try {
		User.findById(req.userId, async (err, data) => {
			if (err) {
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `Not found user with id ${req.userId}.`
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving user with id ' + req.userId
					});
				}
			} else res.json(data);
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
    }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', async (req, res) => {
	const { email, password } = req.body;

	try {
		User.findByEmail(email, async (err, data) => {
			if (err) {
				if (err.kind === 'not_found') {
					return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
				} else {
					res.status(500).send({
						message: 'Error retrieving Customer with email ' + email
					});
				}
			} else {
				const isMatch = await bcrypt.compare(password, data.password);
				if (!isMatch) {
					return res.status(400).json({ errors: [ { msg: 'Invalid Credentials' } ] });
				}

                var token = jwt.sign({ id: data.id }, config.get('jwtSecret'), {
                    expiresIn: 86400 // 24 hours
                });

                res.json({ token });
			}
		});
	} catch (err) {
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map((val) => val.message);

			return res.status(400).json({
				success: false,
				error: messages
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server Error'
			});
		}
	}
});

module.exports = router;
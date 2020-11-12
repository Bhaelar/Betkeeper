const brcypt = require('bcryptjs');
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/Users');

// @desc Register User
// @route POST /api/users
// @access public
router.post(
	'/',
	[
		check('username', 'Username is required').not().isEmpty(),
		check('email', 'Enter a valid email').isEmail(),
		check('password', 'Enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		try {
			const { username, email, password } = req.body;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			// Check if user exists
			User.findByEmail(email, async (err, data) => {
				if (err) {
					// Register user if email does not exist
					if (err.kind === 'not_found') {
						User.findByUsername(username, async (err, data) => {
							if (err) {
								if (err.kind === 'not_found') {
									const newUser = new User({
										username,
										email,
										password
									});

									const salt = await brcypt.genSalt(10);

									newUser.password = await brcypt.hash(password, salt);
									User.create(newUser, async (err, data) => {
										if (err)
											res.status(500).send({
												message:
													err.message || 'Some error occurred while registering the User.'
											});
										else res.json(data);
									});
								} else
									res.status(500).send({
										message: 'Error retrieving User with email ' + email
									});
							} else {
								return res.status(400).json({ errors: [ { msg: 'Username taken' } ] });
							}
						});
					} else {
						res.status(500).send({
							message: 'Error retrieving User with email ' + email
						});
					}
				} else return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
			});
		} catch (error) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;

const brcypt = require('bcryptjs');
const User = require('../models/Users');

// dotenv.config({ path: '../config/config.env' });

// const db = mysql.createConnection({
// 		host: 'localhost',
// 		user: process.env.SQL_USERNAME,
// 		password: process.env.SQL_PASSWORD,
// 	database: process.env.SQL_DATABASE,
// 		port: 5000
// 	});
// @desc Register User
// @route POST /api/users
// @access public
exports.registerUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Check if user exists
		User.findByEmail(email, async (err, data) => {
			if (err) {
				// Register user if email does not exist
				if (err.kind === 'not_found') {
					const newUser = new User({
						email,
						password
					});

					const salt = await brcypt.genSalt(10);

					newUser.password = await brcypt.hash(password, salt);
					User.create(newUser, async (err, data) => {
						if (err)
							res.status(500).send({
								message: err.message || 'Some error occurred while registering the User.'
							});
						else res.send(data);
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving Customer with email ' + email
					});
				}
			} else return res.status(400).json({ errors: [ { msg: 'User already exists' } ] });
		});
	} catch (error) {
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
};

const brcypt = require('bcryptjs');
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('../../middleware/auth');
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
                                                message: err.message || 'Some error occurred while registering the User.'
                                            });
                                        else res.json(data);
                                    });
                                } else
                                    res.status(500).send({
                                        message: 'Error retrieving User with email ' + email
                                    });
                            } else {
                                return res.status(400).json({ errors: [{ msg: 'Username taken' }] });
                            }
                        });
                    } else {
                        res.status(500).send({
                            message: 'Error retrieving User with email ' + email
                        });
                    }
                } else return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            });
        } catch (error) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    PUT api/users/update
// @desc     Update user
// @access   Private
router.put('/update', auth, async (req, res, next) => {
    try {
        const { country, fav_team, image } = req.body;

        await User.updateById(req.userId, country, fav_team, image, async (err, data) => {
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

module.exports = router;
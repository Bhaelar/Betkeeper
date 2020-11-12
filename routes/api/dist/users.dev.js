"use strict";

var brcypt = require('bcryptjs');

var express = require('express');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var router = express.Router();

var User = require('../../models/Users'); // @desc Register User
// @route POST /api/users
// @access public


router.post('/', [check('username', 'Username is required').not().isEmpty(), check('email', 'Enter a valid email').isEmail(), check('password', 'Enter a password with 6 or more characters').isLength({
  min: 6
})], function _callee4(req, res) {
  var _req$body, username, email, password, errors;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password;
          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            errors: errors.array()
          }));

        case 5:
          // Check if user exists
          User.findByEmail(email, function _callee3(err, data) {
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!err) {
                      _context3.next = 4;
                      break;
                    }

                    // Register user if email does not exist
                    if (err.kind === 'not_found') {
                      User.findByUsername(username, function _callee2(err, data) {
                        var newUser, salt;
                        return regeneratorRuntime.async(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                if (!err) {
                                  _context2.next = 15;
                                  break;
                                }

                                if (!(err.kind === 'not_found')) {
                                  _context2.next = 12;
                                  break;
                                }

                                newUser = new User({
                                  username: username,
                                  email: email,
                                  password: password
                                });
                                _context2.next = 5;
                                return regeneratorRuntime.awrap(brcypt.genSalt(10));

                              case 5:
                                salt = _context2.sent;
                                _context2.next = 8;
                                return regeneratorRuntime.awrap(brcypt.hash(password, salt));

                              case 8:
                                newUser.password = _context2.sent;
                                User.create(newUser, function _callee(err, data) {
                                  return regeneratorRuntime.async(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          if (err) res.status(500).send({
                                            message: err.message || 'Some error occurred while registering the User.'
                                          });else res.json(data);

                                        case 1:
                                        case "end":
                                          return _context.stop();
                                      }
                                    }
                                  });
                                });
                                _context2.next = 13;
                                break;

                              case 12:
                                res.status(500).send({
                                  message: 'Error retrieving User with email ' + email
                                });

                              case 13:
                                _context2.next = 16;
                                break;

                              case 15:
                                return _context2.abrupt("return", res.status(400).json({
                                  errors: [{
                                    msg: 'Username taken'
                                  }]
                                }));

                              case 16:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        });
                      });
                    } else {
                      res.status(500).send({
                        message: 'Error retrieving User with email ' + email
                      });
                    }

                    _context3.next = 5;
                    break;

                  case 4:
                    return _context3.abrupt("return", res.status(400).json({
                      errors: [{
                        msg: 'User already exists'
                      }]
                    }));

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.error(err.message);
          res.status(500).send('Server error');

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
module.exports = router;
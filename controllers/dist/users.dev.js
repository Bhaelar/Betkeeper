"use strict";

var brcypt = require('bcryptjs');

var User = require('../models/Users'); // dotenv.config({ path: '../config/config.env' });
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


exports.registerUser = function _callee3(req, res, next) {
  var _req$body, email, password, messages;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password; // Check if user exists

          User.findByEmail(email, function _callee2(err, data) {
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
                              });else res.send(data);

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
                      message: 'Error retrieving Customer with email ' + email
                    });

                  case 13:
                    _context2.next = 16;
                    break;

                  case 15:
                    return _context2.abrupt("return", res.status(400).json({
                      errors: [{
                        msg: 'User already exists'
                      }]
                    }));

                  case 16:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          });
          _context3.next = 13;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);

          if (!(_context3.t0.name === 'ValidationError')) {
            _context3.next = 12;
            break;
          }

          messages = Object.values(_context3.t0.errors).map(function (val) {
            return val.message;
          });
          return _context3.abrupt("return", res.status(400).json({
            success: false,
            error: messages
          }));

        case 12:
          return _context3.abrupt("return", res.status(500).json({
            success: false,
            error: 'Server Error'
          }));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
};
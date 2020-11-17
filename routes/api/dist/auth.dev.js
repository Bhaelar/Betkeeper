"use strict";

var bcrypt = require('bcryptjs');

var express = require('express');

var router = express.Router();

var jwt = require('jsonwebtoken');

var config = require('config');

var auth = require('../../middleware/auth');

var User = require('../../models/Users'); // @route    GET api/auth
// @desc     Get user by token
// @access   Private


router.get('/', auth, function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            User.findById(req.userId, function _callee(err, data) {
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (err) {
                        if (err.kind === 'not_found') {
                          res.status(404).send({
                            message: "Not found user with id ".concat(req.userId, ".")
                          });
                        } else {
                          res.status(500).send({
                            message: 'Error retrieving user with id ' + req.userId
                          });
                        }
                      } else res.json(data);

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

router.post('/', function _callee4(req, res) {
  var _req$body, email, password, messages;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context4.prev = 1;
          User.findByEmail(email, function _callee3(err, data) {
            var isMatch, token;
            return regeneratorRuntime.async(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!err) {
                      _context3.next = 8;
                      break;
                    }

                    if (!(err.kind === 'not_found')) {
                      _context3.next = 5;
                      break;
                    }

                    return _context3.abrupt("return", res.status(400).json({
                      errors: [{
                        msg: 'Invalid Credentials'
                      }]
                    }));

                  case 5:
                    res.status(500).send({
                      message: 'Error retrieving Customer with email ' + email
                    });

                  case 6:
                    _context3.next = 15;
                    break;

                  case 8:
                    _context3.next = 10;
                    return regeneratorRuntime.awrap(bcrypt.compare(password, data.password));

                  case 10:
                    isMatch = _context3.sent;

                    if (isMatch) {
                      _context3.next = 13;
                      break;
                    }

                    return _context3.abrupt("return", res.status(400).json({
                      errors: [{
                        msg: 'Invalid Credentials'
                      }]
                    }));

                  case 13:
                    token = jwt.sign({
                      id: data.id
                    }, config.get('jwtSecret'), {
                      expiresIn: 86400 // 24 hours

                    });
                    res.json({
                      token: token
                    });

                  case 15:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          });
          _context4.next = 13;
          break;

        case 5:
          _context4.prev = 5;
          _context4.t0 = _context4["catch"](1);

          if (!(error.name === 'ValidationError')) {
            _context4.next = 12;
            break;
          }

          messages = Object.values(error.errors).map(function (val) {
            return val.message;
          });
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            error: messages
          }));

        case 12:
          return _context4.abrupt("return", res.status(500).json({
            success: false,
            error: 'Server Error'
          }));

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 5]]);
});
module.exports = router;
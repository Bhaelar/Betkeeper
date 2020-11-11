"use strict";

var express = require('express');

var router = express.Router(); // @route   POST api/users
// @desc    Register user
// @access  Public

router.post('/', function _callee(req, res) {
  var _req$body, email, username, password, transaction, messages;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(Transaction.create(req.body));

        case 4:
          transaction = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            success: true,
            data: transaction
          }));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.name === 'ValidationError')) {
            _context.next = 15;
            break;
          }

          messages = Object.values(_context.t0.errors).map(function (val) {
            return val.message;
          });
          return _context.abrupt("return", res.status(400).json({
            success: false,
            error: messages
          }));

        case 15:
          return _context.abrupt("return", res.status(500).json({
            success: false,
            error: 'Server Error'
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
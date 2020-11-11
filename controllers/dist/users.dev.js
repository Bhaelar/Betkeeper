"use strict";

exports.registerUser = function _callee(req, res, next) {
  var _req$body, email, username, password;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            _req$body = req.body, email = _req$body.email, username = _req$body.username, password = _req$body.password;
          } catch (error) {}

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};
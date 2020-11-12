"use strict";

var jwt = require('jsonwebtoken');

var config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  var token = req.header('x-auth-token'); // Check if not token

  if (!token) {
    return res.status(401).json({
      msg: 'No token, authorization denied'
    });
  } // Verify token


  try {
    jwt.verify(token, config.get('jwtSecret'), function (error, decoded) {
      if (error) {
        return res.status(401).json({
          msg: 'Token is not valid'
        });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({
      msg: 'Server Error'
    });
  }
};
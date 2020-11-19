"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _auth = _interopRequireDefault(require("./auth"));

var _alert = _interopRequireDefault(require("./alert"));

var _bet = _interopRequireDefault(require("./bet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  auth: _auth["default"],
  alert: _alert["default"],
  bet: _bet["default"]
});

exports["default"] = _default;
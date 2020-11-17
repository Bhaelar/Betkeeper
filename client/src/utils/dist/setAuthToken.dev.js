"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setAuthToken = function setAuthToken(token) {
  if (token) {
    _api["default"].defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete _api["default"].defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

var _default = setAuthToken;
exports["default"] = _default;
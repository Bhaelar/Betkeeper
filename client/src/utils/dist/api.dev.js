"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("../store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var api = _axios["default"].create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/


api.interceptors.response.use(function (res) {
  return res;
}, function (err) {
  if (err.response.data.msg === 'Token is not valid') {
    _store["default"].dispatch({
      type: 'LOGOUT'
    });
  }

  return Promise.reject(err);
});
var _default = api;
exports["default"] = _default;
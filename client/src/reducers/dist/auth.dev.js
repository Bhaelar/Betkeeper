"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _types = require("../actions/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case _types.USER_LOADED:
      return _objectSpread({}, state, {
        isAuthenticated: true,
        loading: false,
        user: payload
      });

    case _types.REGISTER_SUCCESS:
      return _objectSpread({}, state, {}, payload, {
        loading: false
      });

    case _types.LOGIN_SUCCESS:
      return _objectSpread({}, state, {}, payload, {
        isAuthenticated: true,
        loading: false
      });

    case _types.ACCOUNT_DELETED:
      return _objectSpread({}, state, {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      });

    case _types.AUTH_ERROR:
    case _types.LOGOUT:
      return _objectSpread({}, state, {
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      });

    default:
      return state;
  }
}
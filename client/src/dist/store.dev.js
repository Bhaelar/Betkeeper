"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _logOnlyInProduction = require("redux-devtools-extension/logOnlyInProduction");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("./reducers"));

var _setAuthToken = _interopRequireDefault(require("./utils/setAuthToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initialState = {};
var middleware = [_reduxThunk["default"]];
var store = (0, _redux.createStore)(_reducers["default"], initialState, (0, _logOnlyInProduction.composeWithDevTools)(_redux.applyMiddleware.apply(void 0, middleware))); // set up a store subscription listener
// to store the users token in localStorage
// initialize current state from redux store for subscription comparison
// preventing undefined error

var currentState = store.getState();
store.subscribe(function () {
  // keep track of the previous and current state to compare changes
  var previousState = currentState;
  currentState = store.getState(); // if the token changes set the value in localStorage and axios headers

  if (previousState.auth.token !== currentState.auth.token) {
    var token = currentState.auth.token;
    (0, _setAuthToken["default"])(token);
  }
});
var _default = store;
exports["default"] = _default;
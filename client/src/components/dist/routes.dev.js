"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Home = _interopRequireDefault(require("./Home.js"));

var _Register = _interopRequireDefault(require("./auth/Register.js"));

var _Login = _interopRequireDefault(require("./auth/Login.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
var routes = [{
  path: "/",
  name: "Dashboard",
  icon: "ni ni-tv-2 text-primary",
  component: _Home["default"],
  layout: "/"
}, {
  path: "/login",
  name: "Login",
  icon: "ni ni-key-25 text-info",
  component: _Login["default"],
  layout: "/"
}, {
  path: "/register",
  name: "Register",
  icon: "ni ni-circle-08 text-pink",
  component: _Register["default"],
  layout: "/"
}];
var _default = routes;
exports["default"] = _default;
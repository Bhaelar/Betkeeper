"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require("../config/db"); // constructor


var User = function User(user) {
  this.email = user.email;
  this.username = user.username;
  this.password = user.password;
};

User.create = function (newUser, result) {
  db.query("INSERT INTO users SET ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", _objectSpread({
      id: res.insertId
    }, newUser));
    result(null, _objectSpread({
      id: res.insertId
    }, newUser));
  });
};

User.findById = function (userId, result) {
  db.query("SELECT * FROM users WHERE id = ".concat(userId), function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    } // not found User with the id


    result({
      kind: "not_found"
    }, null);
  });
};

User.findByEmail = function (userEmail, result) {
  db.query("SELECT * FROM users WHERE email = '".concat(userEmail, "'"), function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    } // not found User with the id


    result({
      kind: "not_found"
    }, null);
  });
};

User.findByUsername = function (username, result) {
  db.query("SELECT * FROM users WHERE username = '".concat(username, "'"), function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    } // not found User with the id


    result({
      kind: "not_found"
    }, null);
  });
};

User.getAll = function (result) {
  db.query("SELECT * FROM users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = function (id, User, result) {
  db.query("UPDATE users SET email = ?, name = ?, active = ? WHERE id = ?", [User.email, User.name, User.active, id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("updated User: ", _objectSpread({
      id: id
    }, User));
    result(null, _objectSpread({
      id: id
    }, User));
  });
};

User.remove = function (id, result) {
  db.query("DELETE FROM users WHERE id = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};

User.removeAll = function (result) {
  db.query("DELETE FROM users", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted ".concat(res.affectedRows, " users"));
    result(null, res);
  });
};

module.exports = User;
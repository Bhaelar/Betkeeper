"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require('../config/db'); // constructor


var Bet = function Bet(bet) {
  this.sport = bet.sport;
  this.country = bet.country;
  this.competition = bet.competition;
  this.fixture = bet.fixture;
  this.market = bet.market;
  this.bet = bet.bet;
  this.stake = bet.stake;
  this.odds = bet.odds;
  this.status = bet.status;
  this.locked = bet.locked;
  this.profit = bet.profit;
  this.userId = bet.userId;
};

Bet.create = function (newBet, result) {
  db.query('INSERT INTO bets SET ?', newBet, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created bet: ', _objectSpread({
      id: res.insertId
    }, newBet));
    result(null, _objectSpread({
      id: res.insertId
    }, newBet));
    return;
  });
};

Bet.updateById = function (id, Bet, result) {
  db.query("UPDATE bets SET ? WHERE id = ".concat(id), Bet, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Bet with the id
      result({
        kind: 'not_found'
      }, null);
      return;
    }

    console.log('updated Bet: ', _objectSpread({
      id: id
    }, Bet));
    result(null, _objectSpread({
      id: id
    }, Bet));
  });
};

Bet.findById = function (betId, result) {
  db.query("SELECT * FROM bets WHERE id = ".concat(betId), function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found Bet: ', res[0]);
      result(null, res[0]);
      return;
    } // not found Bet with the id


    result({
      kind: 'not_found'
    }, null);
  });
}; // Bet.findByEmail = (betEmail, result) => {
//   db.query(`SELECT * FROM bets WHERE email = '${betEmail}'`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     if (res.length) {
//       console.log("found Bet: ", res[0]);
//       result(null, res[0]);
//       return;
//     }
//     // not found Bet with the id
//     result({ kind: "not_found" }, null);
//   });
// };
// Bet.findBybetname = (betname, result) => {
//   db.query(`SELECT * FROM bets WHERE betname = '${betname}'`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     if (res.length) {
//       console.log("found Bet: ", res[0]);
//       result(null, res[0]);
//       return;
//     }
//     // not found Bet with the id
//     result({ kind: "not_found" }, null);
//   });
// };


Bet.getAll = function (userId, result) {
  db.query("SELECT * FROM bets WHERE userId = '".concat(userId, "' ORDER BY date DESC"), function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log('Successfully fetched bets');
      result(null, res);
      return;
    } // no bets with user id


    result({
      kind: 'not_found'
    }, null);
  });
};

Bet.remove = function (id, result) {
  db.query('DELETE FROM bets WHERE id = ?', id, function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Bet with the id
      result({
        kind: 'not_found'
      }, null);
      return;
    }

    console.log('deleted Bet with id: ', id);
    result(null, res);
  });
};

Bet.removeAll = function (result) {
  db.query('DELETE FROM bets', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log("deleted ".concat(res.affectedRows, " bets"));
    result(null, res);
  });
};

module.exports = Bet;
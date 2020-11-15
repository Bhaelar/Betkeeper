"use strict";

var express = require('express');

var _require = require('express-validator'),
    check = _require.check,
    validationResult = _require.validationResult;

var router = express.Router();

var auth = require('../../middleware/auth');

var Bet = require('../../models/Bets'); // @desc Create bet
// @route POST /api/bets
// @access private


router.post('/', auth, function _callee(req, res) {
  var _req$body, sport, country, competition, fixture, market, bet, stake, odds, locked, profit, status, newBet, messages;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, sport = _req$body.sport, country = _req$body.country, competition = _req$body.competition, fixture = _req$body.fixture, market = _req$body.market, bet = _req$body.bet, stake = _req$body.stake, odds = _req$body.odds, locked = _req$body.locked, profit = _req$body.profit, status = _req$body.status;
          newBet = new Bet({
            sport: sport,
            country: country,
            competition: competition,
            fixture: fixture,
            market: market,
            bet: bet,
            stake: stake,
            odds: odds,
            locked: locked,
            profit: profit,
            status: status,
            userId: req.userId
          }); // Check if user exists

          _context.next = 5;
          return regeneratorRuntime.awrap(Bet.create(newBet, function (err, data) {
            if (err) res.status(500).send({
              message: err.message || 'Some error occurred while creating bet.'
            });else res.json(data);
          }));

        case 5:
          _context.next = 15;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.name === 'ValidationError')) {
            _context.next = 14;
            break;
          }

          messages = Object.values(_context.t0.errors).map(function (val) {
            return val.message;
          });
          return _context.abrupt("return", res.status(400).json({
            success: false,
            error: messages
          }));

        case 14:
          return _context.abrupt("return", res.status(500).json({
            success: false,
            error: 'Server Error'
          }));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @desc Get all bets
// @route GET /api/bets
// @access private

router.get('/', auth, function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Bet.getAll(req.userId, function (err, data) {
            if (err) {
              if (err.kind === 'not_found') {
                res.status(404).send({
                  message: "No bets found for user with id ".concat(req.userId, ".")
                });
              } else {
                res.status(500).send({
                  message: 'Error retrieving bets with user id ' + req.userId
                });
              }
            } else res.json(data);
          }));

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send('Server error');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
}); // @desc Get bet by Id
// @route Get /api/bets/:id
// @access private

router.get('/:id', auth, function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Bet.findById(req.params.id, function (err, data) {
            if (err) {
              if (err.kind === 'not_found') {
                res.status(404).send({
                  message: "No bets found with id ".concat(req.params.id, ".")
                });
              } else {
                res.status(500).send({
                  message: 'Error retrieving bets with id ' + req.params.id
                });
              }
            } else res.json(data);
          }));

        case 3:
          _context3.next = 9;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);
          res.status(500).send('Server error');

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
}); // @desc Update bet by Id
// @route Update /api/bets/:id
// @access private

router.put('/:id', auth, function _callee4(req, res) {
  var _req$body2, sport, country, competition, fixture, market, bet, stake, odds, locked, profit, status, newBet;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, sport = _req$body2.sport, country = _req$body2.country, competition = _req$body2.competition, fixture = _req$body2.fixture, market = _req$body2.market, bet = _req$body2.bet, stake = _req$body2.stake, odds = _req$body2.odds, locked = _req$body2.locked, profit = _req$body2.profit, status = _req$body2.status;
          newBet = new Bet({
            sport: sport,
            country: country,
            competition: competition,
            fixture: fixture,
            market: market,
            bet: bet,
            stake: stake,
            odds: odds,
            locked: locked,
            profit: profit,
            status: status,
            userId: req.userId
          }); // Check if bet exists

          _context4.next = 5;
          return regeneratorRuntime.awrap(Bet.updateById(req.params.id, newBet, function (err, data) {
            if (err) {
              if (err.kind === 'not_found') {
                res.status(404).send({
                  message: "No bets found with id ".concat(req.params.id, ".")
                });
              } else {
                res.status(500).send({
                  message: 'Error retrieving bets with id ' + req.params.id
                });
              }
            } else res.json(data);
          }));

        case 5:
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0.message);
          res.status(500).send('Server error');

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @desc Delete bet by Id
// @route Delete /api/bets/:id
// @access private

router["delete"]('/:id', auth, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Bet.remove(req.params.id, function (err, data) {
            if (err) {
              if (err.kind === 'not_found') {
                res.status(404).send({
                  message: "No bets found with id ".concat(req.params.id, ".")
                });
              } else {
                res.status(500).send({
                  message: 'Error retrieving bets with id ' + req.params.id
                });
              }
            } else res.json(data);
          }));

        case 3:
          _context5.next = 9;
          break;

        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0.message);
          res.status(500).send('Server error');

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 5]]);
});
module.exports = router;
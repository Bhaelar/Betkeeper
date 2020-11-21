const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Bet = require('../../models/Bets');

// @desc Create bet
// @route POST /api/bets
// @access private
router.post('/', auth, async (req, res) => {
	try {
		const { sport, country, competition, fixture, market, bet, stake, odds, locked, profit, status } = req.body;

		const newBet = new Bet({
			sport,
			country,
			competition,
			fixture,
			market,
			bet,
			stake,
			odds,
			locked,
			profit,
			status,
			userId: req.userId
		});

		// Check if user exists
		await Bet.create(newBet, (err, data) => {
			if (err)
				res.status(500).send({
					message: err.message || 'Some error occurred while creating bet.'
				});
			else res.json(data);
		});
	} catch (err) {
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map((val) => val.message);

			return res.status(400).json({
				success: false,
				error: messages
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server Error'
			});
		}
	}
});

// @desc Get all bets
// @route GET /api/bets
// @access private
router.get('/', auth, async (req, res) => {
	try {
		// Check if user exists
		await Bet.getAll(req.userId, (err, data) => {
			if (err)
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `No bets found for user with id ${req.userId}.`
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving bets with user id ' + req.userId
					});
				}
			else res.json(data);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

// @desc Get bet by Id
// @route Get /api/bets/:id
// @access private
router.get('/:id', auth, async (req, res) => {
	try {
		// Check if bet exists
		await Bet.findById(req.params.id, (err, data) => {
			if (err)
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `No bets found with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving bets with id ' + req.params.id
					});
				}
			else res.json(data);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

// @desc Update bet by Id
// @route Update /api/bets/:id
// @access private
router.put('/:id', auth, async (req, res) => {
	try {
		const { sport, country, competition, fixture, market, bet, stake, odds, locked, status } = req.body;

		const newBet = new Bet({
			sport,
			country,
			competition,
			fixture,
			market,
			bet,
			stake,
			odds,
			locked,
			profit: status === 'win' ? (stake*odds)-stake : status === 'half-win' ? (stake*Math.sqrt(odds))-stake : status === 'half-loss' ? -(stake/2) : status === 'loss' ? -stake : 0,
			status,
			userId: req.userId
		});
		// Check if bet exists
		await Bet.updateById(req.params.id, newBet, (err, data) => {
			if (err)
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `No bets found with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving bets with id ' + req.params.id
					});
				}
			else res.json(data);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

// @desc Delete bet by Id
// @route Delete /api/bets/:id
// @access private
router.delete('/:id', auth, async (req, res) => {
	try {
		// Check if bet exists
		await Bet.remove(req.params.id, (err, data) => {
			if (err)
				if (err.kind === 'not_found') {
					res.status(404).send({
						message: `No bets found with id ${req.params.id}.`
					});
				} else {
					res.status(500).send({
						message: 'Error retrieving bets with id ' + req.params.id
					});
				}
			else res.json(data);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;

const db = require('../config/db');

// constructor
const Bet = function (bet) {
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

Bet.create = (newBet, result) => {
	db.query('INSERT INTO bets SET ?', newBet, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		console.log('created bet: ', { id: res.insertId, ...newBet });
		result(null, { id: res.insertId, ...newBet });
		return;
	});
};

Bet.updateById = (id, Bet, result) => {
	db.query(`UPDATE bets SET ? WHERE id = ${id}`, Bet, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Bet with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('updated Bet: ', { id: id, ...Bet });
		result(null, { id: id, ...Bet });
	});
};

Bet.findById = (betId, result) => {
	db.query(`SELECT * FROM bets WHERE id = ${betId}`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log('found Bet: ', res[0]);
			result(null, res[0]);
			return;
		}

		// not found Bet with the id
		result({ kind: 'not_found' }, null);
	});
};

// Bet.findByEmail = (betEmail, result) => {
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

Bet.getAll = (userId, result) => {
	db.query(`SELECT * FROM bets WHERE userId = '${userId}' ORDER BY date DESC`, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.length) {
			console.log('Successfully fetched bets');
			result(null, res);
			return;
		}

		// no bets with user id
		result({ kind: 'not_found' }, null);
	});
};

Bet.remove = (id, result) => {
	db.query('DELETE FROM bets WHERE id = ?', id, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		if (res.affectedRows == 0) {
			// not found Bet with the id
			result({ kind: 'not_found' }, null);
			return;
		}

		console.log('deleted Bet with id: ', id);
		result(null, res);
	});
};

Bet.removeAll = (result) => {
	db.query('DELETE FROM bets', (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
		}

		console.log(`deleted ${res.affectedRows} bets`);
		result(null, res);
	});
};

module.exports = Bet;

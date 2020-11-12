const mysql = require('mysql');
const dotenv = require('dotenv');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'betkeeper'
});

module.exports = db;

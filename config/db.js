const mysql = require('mysql');
const config = require('config');

const db = mysql.createPool({
	host: 'localhost',
	user: config.get('SQL_USERNAME'),
	password: config.get('SQL_PASSWORD'),
	database: config.get('SQL_DATABASE')
});

module.exports = db;

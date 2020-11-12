"use strict";

var mysql = require('mysql');

var config = require('config');

var db = mysql.createPool({
  host: 'localhost',
  user: config.get('SQL_USERNAME'),
  password: config.get('SQL_PASSWORD'),
  database: config.get('SQL_DATABASE')
});
module.exports = db;
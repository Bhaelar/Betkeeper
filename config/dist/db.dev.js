"use strict";

var mysql = require('mysql');

var dotenv = require('dotenv');

var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'betkeeper'
});
module.exports = db;
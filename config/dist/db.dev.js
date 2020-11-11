"use strict";

var dotenv = require('dotenv');

var mysql = require('mysql');

dotenv.config({
  path: './config.env'
});
var db = mysql.createConnection({
  host: 'localhost',
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_USERNAME,
  database: 'betkeeper'
}); // connect to database

db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log('Connected to database');
});
module.exports = db;
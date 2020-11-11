"use strict";

var express = require('express');

var dotenv = require('dotenv');

var mysql = require('mysql');

var users = require('./routes/users');

dotenv.config({
  path: './config/config.env'
});
var app = express();
var db = mysql.createConnection({
  host: 'localhost',
  user: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
}); // connect to database

db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log('Connected to database');
}); // Bodyparser

app.use(express.json()); // Define Routes

app.use('/api/users', users);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});
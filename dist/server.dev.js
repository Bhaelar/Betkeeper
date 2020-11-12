"use strict";

var express = require('express');

var dotenv = require('dotenv');

var mysql = require('mysql');

var _require = require('./config/db'),
    connectDB = _require.connectDB;

var users = require('./routes/users');

dotenv.config({
  path: './config/config.env'
});
var app = express(); // connect to database

connectDB(); // Bodyparser

app.use(express.json()); // Define Routes

app.use('/api/users', users);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});
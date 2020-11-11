"use strict";

var express = require('express');

var dotenv = require('dotenv');

var db = require('./config/db');

dotenv.config({
  path: './config/config.env'
});
var app = express(); // Connect Database

db(); // Bodyparser

app.use(express.json()); // Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server started on port ".concat(PORT));
});
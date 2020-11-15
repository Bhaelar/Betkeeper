const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
const {connectDB} = require('./config/db');

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const bets = require('./routes/api/bets');

dotenv.config({ path: './config/config.env' });

const app = express();

// connect to database
// connectDB();


// Bodyparser
app.use(express.json());

// Define Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/bets', bets);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
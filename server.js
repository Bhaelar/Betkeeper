const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');

const users = require('./routes/users');

dotenv.config({ path: './config/config.env' });

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});


// Bodyparser
app.use(express.json());

// Define Routes
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
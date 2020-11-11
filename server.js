const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');

dotenv.config({ path: './config/config.env' });

const app = express();

// Connect Database
db();

// Bodyparser
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
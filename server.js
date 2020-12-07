const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const bets = require('./routes/api/bets');

dotenv.config({ path: './config/config.env' });

const app = express();

// Bodyparser
app.use(express.json());
app.use(fileUpload());

// Define Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/bets', bets);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
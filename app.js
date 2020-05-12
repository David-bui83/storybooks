const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

// Passport config
require('./config/passport')(passport);

// Load Routes
const auth = require('./routes/auth');

// Index route 
app.get('/', (req, res) => {
  res.send('It works!');
});

// Use Routes
app.use('/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});
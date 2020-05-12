const express = require('express');
const router = express.Router();

// Index route 
router.get('/', (req, res) => {
  res.render('index/welcome');
});

// Dashboard route
router.get('/', () => {
  res.send('Dashboard');
});

module.exports = router;
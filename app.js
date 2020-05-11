const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;


// Index route 
app.get('/', (req, res) => {
  res.send('It works!');
});

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});
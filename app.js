const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');

// Load User model
require('./model/User');

// Passport config
require('./config/passport')(passport);

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

// Load keys
const keys = require('./config/keys');

// Mongoose Connect
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err));

app.use(cookieParser());
app.use(session({
  secret: 'mysupersecretkey',
  resave: false,
  saveUninitialized: false
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars 
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Use Routes
app.use('/', index);
app.use('/auth', auth);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});
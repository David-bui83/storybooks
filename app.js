const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// Load Models
require('./models/User');
require('./models/Story');

// Passport config
require('./config/passport')(passport);

// Load Routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

// Load keys
const keys = require('./config/keys');

// Handlebars helpers
const {
  truncate, 
  stripTags, 
  formatDate, 
  select, 
  editIcon
} = require('./helpers/hbs');

// Mongoose Connect
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method Override Middleware
app.use(methodOverride('_method'));

// Handlebars Middleware
app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate: formatDate,
    select: select, 
    editIcon: editIcon
  },
  defaultLayout: 'main',
}));

app.set('view engine', 'handlebars');

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
  res.locals.currentyear = (new Date).getFullYear();
  next();
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});
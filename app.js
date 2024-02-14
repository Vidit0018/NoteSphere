require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Set up session store
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI
});

// Set up session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:process.env.MONGODB_URI
  }),
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Method override middleware
app.use(methodOverride("_method"));

// Connect to the database
connectDB();

// Serve static files
app.use(express.static('public'));

// Set up templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Import and use routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Handle 404
app.get('*', function(req, res) {
  res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const express = require("express");
const session = require("express-session");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const passport = require("passport");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const promisify = require("es6-promisify");
const routes = require("./routes/index");
require("./handlers/passport");

const { FRONTEND_DEV_URL, FRONTEND_PROD_URL } = process.env;

// Create the express app
const app = express();

// Used for validating data
app.use(expressValidator());

// Security middleware
app.use(helmet());

// Set cors origin
app.use(
  cors({
    origin: [FRONTEND_DEV_URL, FRONTEND_PROD_URL],
    credentials: true,
  })
);

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.EXPRESS_SECRET,
    key: process.env.EXPRESS_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport is used to handle logins
app.use(passport.initialize());
app.use(passport.session());

// Set app to use all routes
app.use("/api", routes);

module.exports = app;

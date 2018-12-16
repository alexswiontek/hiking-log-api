const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

function localStrategy(email, password, done) {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  });
}

passport.use(User.createStrategy(localStrategy));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

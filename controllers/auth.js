const passport = require('passport');

exports.login = async (req, res) => {
  passport.authenticate('local');
  res.json({ message: 'Sign up successful. Welcome to Hiking Log!' });
};

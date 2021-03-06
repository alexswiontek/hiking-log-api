const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');
const mail = require('../handlers/mail');

const frontEndBase =
  process.env === 'production'
    ? process.env.FRONTEND_PROD_URL
    : process.env.FRONTEND_DEV_URL;

exports.passportAuthenticate = passport.authenticate('local');

exports.login = (req, res) => {
  const user = { email: req.user.email };

  req.session.authUser = user;
  res.json(user);
};

exports.logout = (req, res) => {
  req.logout();
  delete req.session.authUser;
  res.status(204).json();
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(401).json({ message: 'You must be logged in to do that!' });
};

exports.forgot = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const success = 'A password reset has been sent!';

    // See if user exists
    // Show success regardless for security purposes
    if (!user) {
      return res.json({ message: success });
    }

    // Create reset token and expiration
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send email with the token
    const resetURL = `${frontEndBase}/reset/${user.resetPasswordToken}`;
    mail.send({
      to: user.email,
      from: 'alxcodes@gmail.com',
      subject: 'Reset Password',
      text: 'Whoops! Looks like you need a new password',
      html: `<p>
        To reset your password
        <a href="${resetURL}" target=_blank>visit this link</a>
        or copy and paste it in your browser.
      </p>`,
    });

    // Send success message
    res.json({ message: success });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body.confirmPassword) {
    next();
    return;
  }

  res.status(400).json({ message: 'Passwords do not match!' });
};

exports.reset = async (req, res) => {
  try {
    // Find a user matching the current token
    // Make sure it has not expired
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // If no user found within the parameters, send error
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Password reset is invalid or has expired.' });
    }

    // Create a promise out of setPassword fn
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);

    // Reset the values
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the result to the db
    const updatedUser = await user.save();
    const setLogin = promisify(req.login, req);
    await setLogin(updatedUser);

    res.json({ message: 'You have successfully updated your password!' });
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

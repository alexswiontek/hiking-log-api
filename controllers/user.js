const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.validateRegister = async (req, res, next) => {
  req
    .checkBody('email', 'You must supply an email!')
    .notEmpty()
    .isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req
    .checkBody('confirmPassword', 'Confirmed password cannot be blank!')
    .notEmpty();
  req
    .checkBody('confirmPassword', 'Oops! Your passwords do not match!')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      message: errors[0].msg
    });
  }
  next();
};

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Create new user model
    const user = new User({ email });

    // Register user
    const register = promisify(User.register, User);
    await register(user, password);

    // Pass to authController.login
    next();
  } catch ({ message }) {
    // Send error result
    res.status(400).json({ message });
  }
};

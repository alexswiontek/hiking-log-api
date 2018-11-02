const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.registerHandler = async (req, res) => {
  try {
    const { email } = req.body;

    // Throw error if missing required fields
    if (!email) {
      return res.status(400).json({ message: 'Please supply an email.' });
    }

    // If user already exists, throw an error
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json({
        message:
          'A user with that email already exists. If you forgot your password you can click the link below!'
      });
    }

    // Create the new user based on the schema
    const user = new User({
      email
    });

    // Save the result of the update
    const newUser = await user.save();

    // Send the user the selected field
    const result = { email: newUser.email };

    return res.json(result);
  } catch (e) {
    // Send error result
    res.status(400).json({ message: e });
  }
};

exports.loginHandler = (req, res) => {
  if (req.body.email === 'a@a.co' && req.body.password === 'demo') {
    req.session.authUser = { email: 'a@a.co' };
    return res.json({ email: 'a@a.co' });
  }
  res.status(401).json({ message: 'Bad credentials' });
};

exports.logoutHandler = (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
};

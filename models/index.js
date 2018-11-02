const mongoose = require('mongoose');

/* ======= SCHEMA ======= */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Please enter your email address.',
    unique: true
  }
});

/* ======= MODELS ======= */
exports.User = mongoose.model('User', userSchema);

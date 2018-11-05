const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

/* ======= SCHEMA ======= */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Please enter your email address.',
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address']
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

/* ======= MODELS ======= */
module.exports = mongoose.model('User', userSchema);

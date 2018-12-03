const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

/* ======= SCHEMA ======= */
const hikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please enter the name of the hike.',
    unique: true,
    trim: true,
  },
  image: String,
  difficulty: {
    type: Number,
    required: 'Please enter the difficulty.',
  },
  note: String,
  created: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author',
  },
});

hikeSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
hikeSchema.plugin(mongodbErrorHandler);

/* ======= MODELS ======= */
module.exports = mongoose.model('Hike', hikeSchema);

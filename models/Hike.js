const mongoose = require('mongoose');

/* ======= SCHEMA ======= */
// TODO: add author field below
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
  // author: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: 'You must supply an author',
  // },
});

/* ======= MODELS ======= */
module.exports = mongoose.model('Hike', hikeSchema);

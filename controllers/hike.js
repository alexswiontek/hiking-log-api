const mongoose = require('mongoose');
const Hike = mongoose.model('Hike');
const promisify = require('es6-promisify');

exports.addHike = async (req, res, next) => {
  try {
    // Create new hike
    // const addHike
    res.json({ result: 'it works' });
  } catch (e) {
    // Send error result
    res.status(400).json({ message: e });
  }
};

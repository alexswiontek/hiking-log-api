const mongoose = require('mongoose');
const Hike = mongoose.model('Hike');

exports.addHike = async (req, res) => {
  try {
    const { name, difficulty, notes = '' } = req.body;

    // Create new hike
    // TODO: add author field to link to a single user
    const hike = new Hike({
      name,
      difficulty,
      notes,
      // author: req.user._id,
    });
    await hike.save();

    res.status(204).json({});
  } catch ({ message }) {
    // Send error result
    res.status(400).json({ message });
  }
};

exports.getHikes = async (req, res) => {
  try {
    const hikes = await Hike.find()
      .sort({ created: 'desc' })
      .select('-__v');

    res.json(hikes);
  } catch ({ message }) {
    // Send error result
    res.status(400).json({ message });
  }
};

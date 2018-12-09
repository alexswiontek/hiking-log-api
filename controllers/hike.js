const mongoose = require('mongoose');
const Hike = mongoose.model('Hike');

exports.addHike = async (req, res) => {
  try {
    const { name, difficulty, time, note = '' } = req.body;

    // Create new hike
    // TODO: add author field to link to a single user
    const hike = new Hike({
      name,
      difficulty,
      time,
      note,
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

exports.getHike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: 'Please supply all required fields.' });
    }

    const hike = await Hike.findById(id);

    return hike
      ? res.json(hike)
      : res.status(404).json({ message: 'Hike not found' });
  } catch ({ message }) {
    // Send error result
    res.status(400).json({ message });
  }
};

exports.updateHike = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, difficulty, time, note = '' } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: 'Please supply all required fields.' });
    }

    const hike = await Hike.findByIdAndUpdate(
      id,
      {
        name,
        difficulty,
        time,
        note,
      },
      { new: true }
    );

    if (hike) {
      return res.json(hike);
    } else {
      return res.status(404).json({ message: 'Hike not found' });
    }
  } catch (e) {
    // Send error result
    res.status(400).json({ message });
  }
};

const mongoose = require('mongoose');
const helpers = require('../handlers/helpers');
const Hike = mongoose.model('Hike');

exports.addHike = async (req, res) => {
  try {
    const { name, difficulty, time, note = '', image } = req.body;

    // Create new hike
    const hike = new Hike({
      name,
      difficulty,
      time,
      note,
      image,
      author: req.user._id,
    });
    await hike.save();

    return res.status(204).json({});
  } catch ({ message }) {
    // Send error result
    res.status(400).json({ message });
  }
};

exports.getHikes = async (req, res) => {
  try {
    const sorting = helpers.isObjectEmpty(req.query)
      ? { created: 'desc' }
      : req.query;

    const hikes = await Hike.find({ author: req.user._id }).sort(sorting);

    return res.json(hikes);
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
    const { name, difficulty, time, note = '', image } = req.body;

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
        image,
      },
      { new: true }
    );

    if (hike) {
      return res.json(hike);
    } else {
      return res.status(404).json({ message: 'Hike not found' });
    }
  } catch ({ message }) {
    // Send error result
    res.status(400).json({ message });
  }
};

exports.deleteHike = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: 'Please supply all required fields.' });
    }

    const hikeDeleted = await Hike.findByIdAndDelete(id);

    return hikeDeleted
      ? res.json({ message: 'Deleted successfully!' })
      : res.status(404).json({ message: 'Hike not found.' });
  } catch ({ message }) {
    // Send error result
    res.status(400).json({ message });
  }
};

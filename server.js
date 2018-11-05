const mongoose = require('mongoose');

// Connect to our Database and handle any bad connections
mongoose.connect(
  process.env.DATABASE_URI,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🚫🚫🚫 → ${err.message}`);
});

// Import all models
require('./models/User');

// Start the app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Currently running on http://localhost:${server.address().port}`);
});

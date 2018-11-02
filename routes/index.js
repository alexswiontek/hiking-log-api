const express = require('express');
const router = express.Router();
const controllers = require('../controllers');

// Routes
router.get('/', (req, res) => res.send('hello!'));
router.post('/register', controllers.registerHandler);
router.post('/login', controllers.loginHandler);
router.post('/logout', controllers.logoutHandler);

module.exports = router;

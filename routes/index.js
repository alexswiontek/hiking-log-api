const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');

// Routes
router.get('/', (req, res) => res.send('hello!'));
router.post(
  '/register',
  userController.validateRegister,
  userController.registerHandler,
  authController.login
);
router.post('/login', userController.loginHandler);
router.post('/logout', userController.logoutHandler);

module.exports = router;

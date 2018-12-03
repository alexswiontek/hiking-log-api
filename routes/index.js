const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const hikeController = require('../controllers/hike');

// Routes
router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.passportAuthenticate,
  authController.login
);
router.post(
  '/login',
  authController.passportAuthenticate,
  authController.login
);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgot);
router.post('/reset', authController.confirmedPasswords, authController.reset);
router.post('/add-hike', hikeController.addHike);

module.exports = router;

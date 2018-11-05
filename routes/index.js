const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');

// Routes
router.post(
  '/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgot);
router.post('/reset', authController.confirmedPasswords, authController.reset);

module.exports = router;

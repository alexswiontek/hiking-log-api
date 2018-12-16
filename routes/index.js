const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const hikeController = require('../controllers/hike');

/* ======= ROUTES - AUTH/USER ======= */
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

/* ======= ROUTES - HIKE ======= */
router.post('/add-hike', authController.isLoggedIn, hikeController.addHike);
router.get('/hikes', authController.isLoggedIn, hikeController.getHikes);
router.get('/hike/:id', authController.isLoggedIn, hikeController.getHike);
router.put('/hike/:id', authController.isLoggedIn, hikeController.updateHike);
router.delete(
  '/hike/:id',
  authController.isLoggedIn,
  hikeController.deleteHike
);

module.exports = router;

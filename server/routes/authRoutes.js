const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes
router.use(protect); // All routes after this middleware require authentication
router.get('/me', authController.getCurrentUser);
router.patch('/update-password', authController.updatePassword);

module.exports = router; 
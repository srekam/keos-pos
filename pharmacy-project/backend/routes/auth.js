const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public routes (no authentication required)
router.post('/login', authController.login);
router.post('/register', authenticateToken, requireAdmin, authController.register);

// Protected routes (authentication required)
router.get('/profile', authenticateToken, authController.getProfile);
router.put('/change-password', authenticateToken, authController.changePassword);

// Health check for auth routes
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Authentication routes are working',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

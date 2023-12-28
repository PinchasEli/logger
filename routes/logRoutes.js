const express = require('express');
const logController = require('../controllers/logController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Log route with authentication middleware
router.post('/info', authenticate, logController.logInfo);
router.post('/error', authenticate, logController.logError);
// router.get('/search', authenticate, logController.search);

module.exports = router;

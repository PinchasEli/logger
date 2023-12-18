const express = require('express');
const logController = require('../controllers/logController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Log route with authentication middleware
router.get('/', authenticate, logController.log);

module.exports = router;

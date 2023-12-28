const express = require('express');
const logController = require('../controllers/logController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// POST
router.post('/info', authenticate, logController.logInfo);
router.post('/error', authenticate, logController.logError);

module.exports = router;

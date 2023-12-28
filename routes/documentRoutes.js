const express = require('express');
const documentController = require('../controllers/documentController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// GET
router.get('/get/:index/:id', authenticate, documentController.getDocumentById);

module.exports = router;

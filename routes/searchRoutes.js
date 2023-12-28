const express = require('express');
const searchController = require('../controllers/searchController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:index', authenticate, searchController.search);

module.exports = router;

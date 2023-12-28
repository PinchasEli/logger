const express = require('express');

const indexController = require('../controllers/indexController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Log route with authentication middleware
router.get('/:indexName', authenticate, indexController.getIndex);
router.get('/indexExists/:indexName', indexController.indexExists);

router.post('/create', authenticate, indexController.createIndex);

router.delete('/:indexName', indexController.deleteIndex);

// router.get('/', authenticate, logController.search);

module.exports = router;

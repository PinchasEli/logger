const express = require('express');
const indexController = require('../controllers/indexController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// GET
router.get('/:indexName', authenticate, indexController.getIndex);
router.get('/indexExists/:indexName', indexController.indexExists);
// POST
router.post('/create', authenticate, indexController.createIndex);
// DELETE
router.delete('/:indexName', indexController.deleteIndex);

module.exports = router;

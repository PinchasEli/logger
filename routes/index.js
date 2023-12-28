const express = require('express');
const router = express.Router();

// Import route files
const logRoutes = require('./logRoutes');
const indexRoutes = require('./indexRoutes');
const documentRoutes = require('./documentRoutes');
const searchRoutes = require('./searchRoutes');

// Use route files
router.use('/logs', logRoutes);
router.use('/index', indexRoutes);
router.use('/document', documentRoutes);
router.use('/search', searchRoutes);

module.exports = router;

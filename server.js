const express = require('express');
const bodyParser = require('body-parser');
const logRoutes = require('./routes/logRoutes');
const mongoose = require('mongoose');

const config = require('./config');

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// // Connect to elasticsearch
// // log-microservice/config.js
// const elasticsearch = require('elasticsearch');

// // Replace with your Elasticsearch Service on Elastic Cloud endpoint
// const cloudEndpoint = config.elasticsearchData.cloudEndpoint;
// //  'https://17928d984f3d49b6bb452a0461409c3a.us-central1.gcp.cloud.es.io';

// // Create an Elasticsearch client with API key authentication
// const esClient = new elasticsearch.Client({
//   cloud: config.elasticsearchData.cloud,
//   auth: config.elasticsearchData.auth,
// });


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/logs', logRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

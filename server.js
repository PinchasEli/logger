const express = require('express');
const bodyParser = require('body-parser');

const jsonResponseMiddleware = require('./middleware/jsonResponseMiddleware');

const logRoutes = require('./routes/logRoutes');
const indexRoutes = require('./routes/indexRoutes');
const documentRoutes = require('./routes/documentRoutes');
const searchRoutes = require('./routes/searchRoutes');

const mongoose = require('mongoose');

const config = require('./config');

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const client = require('./services/elasticsearch/client');
const routes = require('./routes');

// Middleware
app.use(bodyParser.json());
app.use(jsonResponseMiddleware);


app.use('/', routes);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

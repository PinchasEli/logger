// // log-microservice/services/loggerService.js

// const { Client } = require('@elastic/elasticsearch');
// const client = new Client({ node: 'https://your-elastic-cloud-url:9243' }); // Replace with your Elasticsearch Cloud URL

// const logger = require('winston');

// logger.add(new logger.transports.Http({
//   format: logger.format.json(),
//   host: 'localhost', // Replace with your microservice's host
//   port: 3000, // Replace with your microservice's port
//   path: '/log',
// }));

// module.exports = logger;

// log-microservice/services/loggerService.js

const winston = require('winston');
const { Client } = require('@elastic/elasticsearch');
const config = require('../config');

const client = new Client({ node: config.elasticsearchData.cloudEndpoint });

const logger = winston.createLogger({
  transports: [
    new winston.transports.Http({
      level: 'info',
      format: winston.format.json(),
      host: 'localhost', // Replace with your microservice's host
      port: 3000, // Replace with your microservice's port
      path: '/log',
    }),
  ],
});

module.exports = logger;

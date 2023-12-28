const winston = require('winston');

const client = require('./elasticsearch/client');

// console.log('logger client :>> ', client);
const logConfiguration = {
  'transports': [
      new winston.transports.Console()
  ]
};
const logger = winston.createLogger(logConfiguration);

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Http({
//       level: 'info',
//       format: winston.format.json(),
//       host: 'localhost', // Replace with your microservice's host
//       port: 3000, // Replace with your microservice's port
//       path: '/log',
//     }),
//     new winston.transports.Console(), // Optional: Display logs in the console
//   ],
// });

module.exports = logger;

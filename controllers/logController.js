
const LoggerService = require('../services/loggerService');
const loggerService = new LoggerService();

// const Level = require('../enum');

// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({
//   cloud: { id: 'My_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRkMTcwNjI3ZjA1ZWQ0M2NmYjA1NThkMGViZDFhNDM4MiRlNzQwM2U5NTcwOTM0OTA0YjllMTY5MDhkMzM5NDI1Mg==' },
//   auth: { apiKey: 'UXVJWWdvd0JYUC1nR2JiM3Q3R2Y6VGVmNnFZRVRRVmVvWkljTzFzVi1KQQ==' }
// })
// const client = require('../services/elasticsearch/client');

// async function run () {
//   // await client.indices.create({
//   //   index: 'tweets',
//   //   operations: {
//   //     mappings: {
//   //       properties: {
//   //         id: { type: 'integer' },
//   //         text: { type: 'text' },
//   //         user: { type: 'keyword' },
//   //         time: { type: 'date' }
//   //       }
//   //     }
//   //   }
//   // }, { ignore: [400] })

//   const dataset = [{
//     id: 1,
//     text: 'If I fall, don\'t bring me back.',
//     user: 'jon',
//     date: new Date()
//   }, {
//     id: 2,
//     text: 'Winter is coming',
//     user: 'ned',
//     date: new Date()
//   }, {
//     id: 3,
//     text: 'A Lannister always pays his debts.',
//     user: 'tyrion',
//     date: new Date()
//   }, {
//     id: 4,
//     text: 'I am the blood of the dragon.',
//     user: 'daenerys',
//     date: new Date()
//   }, {
//     id: 5, // change this value to a string to see the bulk response with errors
//     text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
//     user: 'arya',
//     date: new Date()
//   }]

//   const operations = dataset.flatMap(doc => [{ index: { _index: 'tweets' } }, doc])

//   const bulkResponse = await client.bulk({ refresh: true, operations })

//   if (bulkResponse.errors) {
//     const erroredDocuments = []
//     // The items array has the same order of the dataset we just indexed.
//     // The presence of the `error` key indicates that the operation
//     // that we did for the document has failed.
//     bulkResponse.items.forEach((action, i) => {
//       const operation = Object.keys(action)[0]
//       if (action[operation].error) {
//         erroredDocuments.push({
//           // If the status is 429 it means that you can retry the document,
//           // otherwise it's very likely a mapping error, and you should
//           // fix the document before to try it again.
//           status: action[operation].status,
//           error: action[operation].error,
//           operation: operations[i * 2],
//           document: operations[i * 2 + 1]
//         })
//       }
//     })
//     console.log(erroredDocuments)
//   }

//   const count = await client.count({ index: 'tweets' })
//   console.log(count)
// }

// const log = (req, res) => {
//   console.log('req.body :>> ', req.body);
//   // run().catch(console.log)

//   // const { level, message } = req.body;
//   // // logService.log(level, message);
//   // console.log('level :>> ', level);
//   // console.log('message :>> ', message);
//   // Level.INFO === level && logService.info('Sample log entry ' + message);
//   // Level.ERROR === level && logService.error('ERROR ' + message);
//   res.status(200).send('Log received successfully');
// };


// async function searchRun () {
//   // Let's search!
//   const result = await client.search({
//     // index: 'game-of-thrones',
    
//     // index: 'tweets',
//     query: {
//       match: {
//         text: 'A girl is Arya Stark of Winterfell. And I\'m going home.'
//       }
//     }
//   })

//   console.log(result.hits.hits)
// }

// const search = (req, res) => {
//   searchRun().catch(console.log)

//   // const { level, message } = req.body;
//   // // logService.log(level, message);
//   // console.log('level :>> ', level);
//   // console.log('message :>> ', message);
//   // Level.INFO === level && logService.info('Sample log entry ' + message);
//   // Level.ERROR === level && logService.error('ERROR ' + message);
//   res.status(200).send('Log received successfully');
// };

// module.exports = { log, search };

const logInfo = (req, res) => {
  const { index, message } = req.body;
  // console.log('logInfo logMessage :>> ', logMessage);
  // console.log('logInfo indexName :>> ', indexName);
  // const loggerService = new LoggerService();
  const response = loggerService.createLog('info', index, message);
  // logger.info(logMessage);
  res.json({ success: true, message: response?.message || '' });
}

const logError = (req, res) => {
  const { index, message } = req.body;
  // const loggerService = new LoggerService();
  const response = loggerService.createLog('error', index, message);
  // logger.info(logMessage);
  res.json({ success: true, message: response?.message || '' });
}

module.exports = { logInfo, logError };

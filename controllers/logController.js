const logService = require('../services/logService');

const Level = require('../enum');

const log = (req, res) => {
  const { level, message } = req.body;
  // logService.log(level, message);
  console.log('level :>> ', level);
  console.log('message :>> ', message);
  Level.INFO === level && logService.info('Sample log entry ' + message);
  Level.ERROR === level && logService.error('ERROR ' + message);
  res.status(200).send('Log received successfully');
};

module.exports = { log };

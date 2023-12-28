
const LoggerService = require('../services/loggerService');
const loggerService = new LoggerService();

const logInfo = (req, res) => {
  const { index, message } = req.body;
  const response = loggerService.createLog('info', index, message);
  
  res.json({ success: true, message: response?.message || '' });
}

const logError = (req, res) => {
  const { index, message } = req.body;
  const response = loggerService.createLog('error', index, message);

  res.json({ success: true, message: response?.message || '' });
}

module.exports = { logInfo, logError };

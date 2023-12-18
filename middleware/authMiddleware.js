const userModel = require('../models/userModel');

const authenticate = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  console.log(apiKey)

  if (!apiKey) {
    return res.status(401).json({ error: 'API key is required' });
  }

  // Check if the API key exists in the database
    const result = await userModel.findOne({ apiKey });

    console.log('result', result)
    if (!result?._id) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    next();
};

module.exports = { authenticate };

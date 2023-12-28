
const LoggerService = require('../services/loggerService');
const loggerService = new LoggerService();

const search = async (req, res) => {
    const { index } = req.params;
    const { queries } = req.body;
    const response = await loggerService.msearch(index, queries);

    res.jsonResponse(response.code == 200, response?.data, response.message, response.code);
}

module.exports = { search };


const LoggerService = require('../services/loggerService');
const loggerService = new LoggerService();

const getDocumentById = async (req, res) => {
    const { index, id } = req.params;
    console.log('index :>> ', index);
    console.log('id :>> ', id);
    const response = await loggerService.getDocumentById(index, id);
    res.jsonResponse(response.code == 200, response?.data, response.message, response.code);
}

module.exports = { getDocumentById };

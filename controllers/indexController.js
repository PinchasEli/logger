const LoggerService = require('../services/loggerService');
const loggerService = new LoggerService();

const getIndex = async (req, res) => {
    const response = await loggerService.getIndex(req.params.indexName);

    res.jsonResponse(response.code == 200, response?.data, response?.message, response.code);
};

const createIndex = async (req, res) => {
    const response = await loggerService.createIndex(req.body);

    res.jsonResponse(response.code == 200, response?.data, response?.message, response.code);
};

const deleteIndex = async (req, res) => {
    const response = await loggerService.deleteIndex(req.params.indexName);

    res.jsonResponse(response.code == 200, response?.data, response.message, response.code);
};

const indexExists = async (req, res) => {
    const { indexName } = req.params;
    const response = await loggerService.indexExists(indexName, req.query);

    res.jsonResponse(response.code == 200, response?.data, response.message, response.code);
};

module.exports = { getIndex, createIndex, deleteIndex, indexExists };

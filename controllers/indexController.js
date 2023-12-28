const LoggerService = require('../services/loggerService');
const loggerService = new LoggerService();

const getIndex = async (req, res) => {
    console.log('getIndex req :>> ', req?.params);
    // const loggerService = new LoggerService();
    const response = await loggerService.getIndex(req.params.indexName);
    res.jsonResponse(response.code == 200, response?.data, response?.message, response.code);
};

const createIndex = async (req, res) => {
    console.log('create req :>> ', req.body);
    // const loggerService = new LoggerService();
    const response = await loggerService.createIndex(req.body);
    res.jsonResponse(response.code == 200, response?.data, response?.message, response.code);
};

const deleteIndex = async (req, res) => {
    console.log('deleteIndex req :>> ', req?.params);
    // const loggerService = new LoggerService();
    const response = await loggerService.deleteIndex(req.params.indexName);
    res.jsonResponse(response.code == 200, response?.data, response.message, response.code);
};

const indexExists = async (req, res) => {
    console.log('indexExists req :>> ', req?.params);
    const { indexName } = req.params;
    console.log('indexName :>> ', indexName);
    console.log('req.query :>> ', req.query);
    const response = await loggerService.indexExists(indexName, req.query);

    res.jsonResponse(response.code == 200, response?.data, response.message, response.code);
};

module.exports = { getIndex, createIndex, deleteIndex, indexExists };

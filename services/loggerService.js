

class LoggerService {
    constructor() {
        this.client = require('./elasticsearch/client');
        
        this.logs = [];
        this.bulkThreshold = 10;
    }

    // index
    async getIndex(indexName) {
        try {
            const response = await this.client.indices.get({
                index: indexName,
            });

            console.log(`Details for index "${indexName}":`, response[indexName]);
            return { code: 200, data: { ...response[indexName] } };
        } catch (error) {
            if (error.meta && error.meta.statusCode === 404) {
                console.error(`Index "${indexName}" not found.`, error.message);
                return { code: 404, message: error.message };
        } else {
                console.error('Error getting index details:', error);
                return { code: 404, message: error?.message };
            }
        }
    }

    async createIndex(indexData) {
        try {
            const response = await this.client.indices.create({
                index: indexData.name,
                body: {
                    mappings: {
                    properties: {
                        ...indexData.properties,
                    }
                    },
                },
            });
        
            console.log(`Index "${indexData.name}" created. Response:`, response);
            return { code: 200, data: { ...response } };
        } catch (error) {
            if (error.meta && error.meta.statusCode === 404) {
                console.error('Error creating index. Check your index properties:', error.message);
                return { code: error.meta.statusCode, message: error?.message };
            } else {
                console.log('error :>> ', error?.message);
                return { code: 400, message: error?.message };
            }
        }
    }

    async deleteIndex(indexName) {
        try {
            const response = await this.client.indices.delete({
                index: indexName
            });
        
            console.log(`Index "${indexName}" deleted. Response:`, response);
            return { code: 200, data: { ...response } };
        } catch (error) {
            if (error.meta && error.meta.statusCode === 404) {
                console.error(`Index "${indexName}" not found.`, error.message);
                return { code: 404, message: error?.message };
            } else {
                console.error('Error deleting index:', error);
                return { code: 400, message: error?.message };
            }
        }
    }

    async indexExists(indexName, queryParams = {}) {
        try {
            const response = await this.client.indices.exists({
                index: indexName,
                ...queryParams,
            });

            if (!response) {
                console.error(`Index '${indexName}' does not exist.`);
                return { code: 404, message: `Index '${indexName}' does not exist.` };
            }

            return { code: 200, data: { exists: response } };
        } catch (error) {
            console.error('Error checking if index exists:', error?.message);
            return { code: 400, message: error?.message };
        }
    }

    // log
    async sendLog() {
        if (this.logs.length === 0) return;
        
        try {
            const bulkResponse = await this.client.bulk({
                refresh: true,
                index: 'sales-logger', // Replace with your actual index name
                body: this.logs,
            });

            if (bulkResponse.errors) {
                console.error('Error in bulk request:', bulkResponse);
                const erroredDocuments = []
                // The items array has the same order of the dataset we just indexed.
                // The presence of the `error` key indicates that the operation
                // that we did for the document has failed.
                bulkResponse.items.forEach((action, i) => {
                    const operation = Object.keys(action)[0]
                    if (action[operation].error) {
                            erroredDocuments.push({
                            // If the status is 429 it means that you can retry the document,
                            // otherwise it's very likely a mapping error, and you should
                            // fix the document before to try it again.
                            status: action[operation].status,
                            error: action[operation].error,
                            operation: operations[i * 2],
                            document: operations[i * 2 + 1]
                        })
                    }
                })
                console.log(erroredDocuments)
            }
            
            const count = await this.client.count({ index: 'sales-logger' })
            console.log(count)
            console.log('Logs sent in bulk:', bulkResponse);

            this.logs.length = 0; // Clear the logs buffer after sending
        } catch (error) {
            console.error('Error sending logs in bulk:', error.message);
            this.logs.length = 0; // Clear the logs buffer after sending
        }
    }
    
    createLog(level, indexName, message) {
        this.logs.push({ index: { _index: indexName } });
        this.logs.push({ level, message, timestamp: new Date().toISOString() });

        if (this.logs.length < this.bulkThreshold) {
            return { code: 200, data: countInBuffer: this.logs.length };
        }

        return this.sendLog();
    }

    // Search
    async msearch(indexName, queries) {
        try {
            if (!queries || queries.length === 0) {
                throw new Error('No valid queries provided for msearch.');
            }

            const body = queries.flatMap((query) => [
                { index: indexName },
                JSON.stringify(query)
            ]);
            const response = await this.client.msearch({
                body: body.join('\n') + '\n'
            });
            
            console.log('response :>> ', response);
            if (!response?.responses) {
                throw new Error('Invalid or missing responses in the msearch response.');
            }

            console.log('response.responses :>> ', response.responses);
            return { code: 200, data: response.responses };
        } catch (error) {
            console.error('Error executing msearch:', error.message);
            return { code: 400, data: [], message: error?.message };
        }
    }

    // Document
    async getDocumentById(indexName, id) {
        try {
            const { body: document } = await this.client.get({
                index: indexName,
                id
            });

            return { code: 200, data: document };
        } catch (error) {
            console.error('Error getting document by ID:', error.message);
            return { code: 400, message: error?.message };
        }
    }
}


module.exports = LoggerService;

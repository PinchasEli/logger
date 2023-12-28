const { Client } = require('@elastic/elasticsearch');
const config = require('../../config');

const elasticConfig = config.elastic;

console.log('config.elastic :>> ', config.elastic);

const client = new Client({
  cloud: {
    id: elasticConfig.cloudID,
  },
  auth: {
    username: elasticConfig.auth.username ,
    password: elasticConfig.auth.password
  },
});

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected. "))

module.exports = client;  
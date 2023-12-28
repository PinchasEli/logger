const { Client } = require('@elastic/elasticsearch');
const config = require('../../config');

const elasticConfig = config.elastic;

console.log('config.elastic :>> ', config.elastic);

const client = new Client({
  cloud: {
    id: elasticConfig.cloudID,
  },
  auth: {
    // apiKey:elasticConfig.auth.apiKey
    username: elasticConfig.auth.username ,//'elastic',
    password: elasticConfig.auth.password //'5LFHH2RgcoBfFz3JxUQQtNQd'
  },
});

client.ping()
  .then(response => console.log("You are connected to Elasticsearch!"))
  .catch(error => console.error("Elasticsearch is not connected. "))

module.exports = client;  
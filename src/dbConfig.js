const redis = require('redis');
const bluebird = require('bluebird'); 
const { config } = require('./utils');

const redisPort = config.redisPort || 6379;

// Promisify all the functions exported by node_redis.
bluebird.promisifyAll(redis);

const client = redis.createClient(redisPort);

client.on("error", (error) => {
  console.error(error);
 });

module.exports = { client };

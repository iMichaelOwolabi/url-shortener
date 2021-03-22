const redis = require('redis');
const bluebird = require('bluebird'); 
const { config } = require('./utils');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL;

// Promisify all the functions exported by node_redis.
bluebird.promisifyAll(redis);

const client = redis.createClient(redisUrl);

client.on("error", (error) => {
  console.error(error);
 });

module.exports = { client };

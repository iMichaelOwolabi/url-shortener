require('dotenv').config()

const config = {
  baseUrl: process.env.BASE_URL,
  redisPort: process.env.REDIS_PORT,
  serverPort: process.env.PORT,
}

module.exports = { config };

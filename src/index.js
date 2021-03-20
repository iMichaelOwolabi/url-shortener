const express = require('express');
const { config } = require('./utils');
const shortenerRouter = require('./routes/shortUrl');
const redirectROuter = require('./routes/redirectUrl');

const port = config.serverPort || 7000;

const router = express;

const app = express();

app.use(express.json({}));

app.listen(port, () => {
  console.log(`server listening on port ${port} 🚀`);
});

app.use('/v1/shorten', shortenerRouter);
app.use('/v1/redirect', redirectROuter);

module.exports = { router };

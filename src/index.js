const express = require('express');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const { config } = require('./utils');
const shortenerRouter = require('./routes/shortUrl');
const redirectRouter = require('./routes/redirectUrl');
const homeRouter = require('./routes/index');

const port = config.serverPort || 7000;
const publicDirectoryPath = path.join(__dirname, '../public');

const router = express;

const app = express();

app.use(express.json({}));

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.listen(port, () => {
  console.log(`server listening on port ${port} 🚀`);
});

app.use('/v1/shorten', shortenerRouter);
app.use('/r', redirectRouter);
app.use('', homeRouter);

module.exports = { router, app };

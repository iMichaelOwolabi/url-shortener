const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

app.listen(PORT => {
  console.log(`server listening on port ${port} 🚀`);
});

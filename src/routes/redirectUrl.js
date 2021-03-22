const router = require('express').Router();
const { client } = require('../dbConfig');

router.get('/:shortUrlId', async (req, res) => {
  const { shortUrlId } = req.params

  // Check if the URL entered exists in our db
  const originalUrl = await client.getAsync(shortUrlId);
  if (!originalUrl) {
    return res.status(404).send({
      success: false,
      message: `URL not found!`
    });
  }

  // Incerement the click count of the URL
  client.hincrby(`url:${originalUrl}`, 'clickCount', 1);

  // Return the original URL
  return res.redirect(originalUrl);
});

module.exports = router;

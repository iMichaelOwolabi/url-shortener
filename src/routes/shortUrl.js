const router = require('express').Router();
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const { client } = require('../dbConfig');
const { config } = require('../utils');

router.post('', async (req, res) => {
  const { originalUrl } = req.body;

  // Check if the URL entered is a valid URI
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).send({
      success: false,
      message: `Enter a valid URL to shorten`
    })
  }
  
  try {
    const keyExist = await client.hexistsAsync(`url:${originalUrl}`, 'id'); // Check if the URL already exist
    if (!keyExist) {
      const urlId = nanoid(8);
      const shortenedUrl = `${config.baseUrl}/r/${urlId}`;

      await client.hsetAsync(`url:${originalUrl}`, 'id', urlId,  'originalUrl', originalUrl, 'shortUrl', shortenedUrl, 'clickCount', 0); // save the URL record

      /** 
       * Save the new URL ID as a string and assign the original URL as the value
       * This is used as the second index for lookup
      */
      const yes = await client.setAsync(urlId, originalUrl)

      // Retrun the shortened URL
      return res.status(201).send({
        success: true,
        message: 'Here is the shortened URL',
        data: shortenedUrl,
      }) 
    }

    // Get the shortened URL if found and return the same to the user
    const shortenedUrl = await client.hgetallAsync(`url:${originalUrl}`);
    
    return res.status(201).send({
      success: true,
      message: 'Here is the shortened URL',
      data: shortenedUrl,
    }) 
  } catch (error) {
    console.error(error)
      return res.status(500).send({
        success: false,
        message: 'Sorry, something went wrong. Plz try again'
      });
  }
})

module.exports = router;

const express = require('express');
const router = express.Router();
const {fetchTopChannels} = require('../api/youtube');
const {formatChannels} = require('../util/formatAPI');

router.get('/channels', async (req, res) => {
  // Sends an API request to Youtube
  fetchTopChannels.then(({data}) => {
    const channels = data.items;
    const formatted = formatChannels(channels);
    res.json(formatted);
  }).catch((e) =>{
    res.status(500).send(e.message, e.stack);
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const {fetchPopularVideos} = require('../api/youtube');
const {formatVideos} = require('../util/formatAPI');

router.get('/videos', async (req, res) => {
  // Sends an API request to Youtube
  const videoData = await fetchPopularVideos;
  if(!videoData){
    res.status(500).send(new Error("Failed to fetch popular videos!"));
  }
  const videos = videoData.data.items;
  let formatted = await formatVideos(videos);
  if(!formatted){
    res.status(500).send(new Error("Could not load channel picture!"));
  }
  res.send(formatted);
});

module.exports = router;
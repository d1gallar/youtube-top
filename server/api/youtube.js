const axios = require("axios");
const channelData = require("../data/channels.json");
const key = process.env.YOUTUBE_KEY;

const DEFAULT_SIZE = 12; // Number of most popular videos

const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: key
  },
});

const fetchPopularVideos = youtube.get("/videos", {
  params: {
    chart: "mostPopular",
    part: "snippet,statistics",
    maxResults: DEFAULT_SIZE
  },
});

const fetchTopChannels = youtube.get("/channels", {
  params: {
    part: "snippet,statistics",
    id: channelData
      .map((channel) => {
        return channel.id;
      })
      .join(","),
  },
});

const fetchChannelPic = channelId => youtube.get("/channels", {
  params: {
    part: "snippet",
    fields:"items/snippet/thumbnails",
    id: channelId
  }
});

module.exports = {
  youtube,
  fetchPopularVideos,
  fetchTopChannels,
  fetchChannelPic
};
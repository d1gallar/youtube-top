import axios from "axios";
import channelData from "../data/channels.json";

const YOUTUBE_KEY = process.env.YOUTUBE_KEY; // Youtube API Key
const DEFAULT_SIZE = 12; // Number of most popular videos

export const youtube = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: YOUTUBE_KEY,
  },
});

export const fetchPopularVideos = () => youtube.get("/videos", {
  params: {
    chart: "mostPopular",
    part: "snippet,statistics",
    maxResults: DEFAULT_SIZE,
  },
});

export const fetchTopChannels = () => youtube.get("/channels", {
  params: {
    part: "snippet,statistics",
    id: channelData
      .map((channel) => {
        return channel.id;
      })
      .join(","),
  },
});

export const fetchChannelPic = (channelId: string) =>
  youtube.get("/channels", {
    params: {
      part: "snippet",
      fields: "items/snippet/thumbnails",
      id: channelId,
    },
  });

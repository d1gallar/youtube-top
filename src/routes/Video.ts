import express from "express";
const router = express.Router();
import { fetchPopularVideos } from "../api/youtube";
import { formatVideos } from "../util/formatApi";

// Fetches popular videos from the Youtube API
router.get("/videos", async (req, res) => {
  const videoData = await fetchPopularVideos();
  if (!videoData) {
    return res.status(500).send(new Error("Failed to fetch popular videos!"));
  }
  const videos = videoData.data.items;
  let formatted = await formatVideos(videos);
  if (!formatted) {
    return res.status(500).send(new Error("Could not load channel picture!"));
  }
  return res.status(200).send(formatted);
});

export default router;

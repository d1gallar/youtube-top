import axios from "axios";

const BASE_URL = process.env.PUBLIC_URL || "http://localhost:3000";
const server = axios.create({
  baseURL: BASE_URL,
});

export const getChannels = async () =>
  await server.get("/.netlify/functions/channels");
export const getVideos = async () =>
  await server.get("/.netlify/functions/videos");

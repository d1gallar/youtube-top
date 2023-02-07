import axios from "axios";

const BASE_URL = "http://localhost:8080";
const server = axios.create({
  baseURL: BASE_URL,
});

export const getChannels = async () => await server.get("/channels");
export const getVideos = async () => await server.get("/videos");
import express from "express";
require("dotenv").config();
import path from "path";
import cors from "cors";
import channelRouter from "./routes/Channels";
import videoRouter from "./routes/Video";

const app = express();
const PORT = process.env.PORT;
const SERVER_URL = process.env.SERVER_URL;

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.get("/channels", channelRouter);
app.get("/videos", videoRouter);
app.get("*", (req, res) => {
  res.status(404).send("404 Page Not Found.");
});

app.listen(PORT, () => {
  console.log(`Backend server is running on ${SERVER_URL}:${PORT}.`);
});
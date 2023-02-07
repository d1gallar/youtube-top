import express from "express";
require("dotenv").config();
import path from "path";
import cors from "cors";
import channelRouter from "./routes/Channels";
import videoRouter from "./routes/Video";

const app = express();
const SERVER_PORT = process.env.SERVER_PORT;

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.get("/channels", channelRouter);
app.get("/videos", videoRouter);
app.get("*", (req, res) => {
  res.status(404).send("404 Page Not Found.");
});

app.listen(SERVER_PORT, () => {
  console.log(`Listening at http://localhost:${SERVER_PORT}`);
});
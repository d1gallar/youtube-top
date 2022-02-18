require("dotenv").config();

const PORT = process.env.PORT || 8080;

const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const channelRouter = require("./routes/Channels");
const videoRouter = require("./routes/Videos");

app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.render(path.resolve(__dirname, "../client/build/index.html"));
});

app.get("/channels", channelRouter);
app.get("/videos", videoRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

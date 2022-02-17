const express = require('express');
const cors = require('cors')
const app = express();
const port = 4000;

require('dotenv').config();

const channels =  require('./routes/Channels');
const videos = require('./routes/Videos');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/channels", channels);
app.get("/videos", videos);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})
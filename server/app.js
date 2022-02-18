require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 8080;

const channels =  require('./routes/Channels');
const videos = require('./routes/Videos');

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
  res.render(path.resolve(__dirname, '../client/build/index.html'));
});

app.get("/channels", channels);
app.get("/videos", videos);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})
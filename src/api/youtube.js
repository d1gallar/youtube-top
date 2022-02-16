import axios from 'axios';
const key = process.env.REACT_APP_YOUTUBE_KEY;

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: key
  }
});

export default youtube;
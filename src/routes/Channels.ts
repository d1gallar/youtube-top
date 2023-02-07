import express from 'express';
import { fetchTopChannels } from '../api/youtube';
import {formatChannels} from '../util/formatApi';

const router = express.Router();

// Fetches channels from the Youtube API
router.get('/channels', async (req, res) => {
  await fetchTopChannels().then(({data}) => {
    const channels = data.items;
    const formatted = formatChannels(channels);
    return res.status(200).json(formatted);
  }).catch((e: Error) =>{
    return res.status(500).send({message: e.message, stack: e.stack});
  });
});

export default router;
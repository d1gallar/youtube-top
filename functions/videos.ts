import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { fetchPopularVideos } from "../src/api/youtube";
import { formatVideos } from "../src/util/formatApi";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  try {
    const videoData = await fetchPopularVideos();
    if (!videoData) throw new Error("Failed to fetch popular videos!");
    const videos = videoData.data.items;
    let formatted = await formatVideos(videos);
    if (!formatted) throw new Error("Could not load channel picture!");
    return {
      statusCode: 200,
      body: JSON.stringify(formatted),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message, stack: error.stack }),
    };
  }
};

export { handler };

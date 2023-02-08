import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { fetchTopChannels } from "../src/api/youtube";
import { formatChannels } from "../src/util/formatApi";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  return await fetchTopChannels()
    .then(({ data }) => {
      const channels = data.items;
      const formatted = formatChannels(channels);
      return {
        statusCode: 200,
        body: JSON.stringify(formatted),
      };
    })
    .catch((e: Error) => {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: e.message, stack: e.stack }),
      };
    });
};

export { handler };

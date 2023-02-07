import React, { useContext } from "react";
import { VideoType } from "../Videos/Videos";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import VideoCard from "../VideoCard/VideoCard";

export type VideoTypeList = Array<VideoType>;

type VideoListProps = {
  videos: VideoTypeList;
};

export default function VideoList(props: VideoListProps) {
  const { theme } = useContext(ThemeContext);

  const renderVideos = () => {
    return props.videos.map((video: VideoType) => {
      const { id, title, thumbnail, channelId, channel, views, channelPic } =
        video;
      return (
        <VideoCard
          thumbnail={thumbnail}
          videoURL={`https://youtube.com/watch?v=${id}`}
          title={title}
          channel={channel}
          channelURL={`https://youtube.com/channel/${channelId}`}
          channelPic={channelPic}
          views={views}
          key={id}
          theme={theme}
        />
      );
    });
  };
  return <React.Fragment>{renderVideos()}</React.Fragment>;
}

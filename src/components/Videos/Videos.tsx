import { useContext } from "react";
import useVideos from "../../hooks/Videos/Videos";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import DataError from "../DataError/DataError";
import VideoList from "../VideoList/VideoList";
import SkeletonVideoList from "../SkeletonVideoList/SkeletonVideoList";
import "./Videos.css";
import SkeletonCard from "../Skeletons/SkeletonCard";

export type VideoType = {
  videos: any;
  id: string;
  title: string;
  thumbnail: string;
  channelId: string;
  channel: string;
  views: string;
  channelPic: string;
};

function Videos() {
  const { videos, isLoading, error } = useVideos();
  const { theme } = useContext(ThemeContext);
  if (error) return <DataError />;
  return (
    <div className="left videoContainer shiftUp" data-theme={theme} id="video">
      <h2 data-theme={theme}>Most Popular Videos</h2>
      <div className="wrapper">
        {isLoading ? <SkeletonVideoList /> : <VideoList videos={videos} />}
      </div>
    </div>
  );
}

export default Videos;

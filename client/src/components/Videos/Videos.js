import React from "react";
import axios from "axios";
import "./Videos.css";
import VideoCard from "../VideoCard/VideoCard";
import SkeletonCard from "../Skeletons/SkeletonCard";

const DEFAULT_SIZE = 12;

class Videos extends React.Component {
  state = { videos: [], isLoading: true };

  fetchVideos = async () => {
    try {
      const response = await axios.get("/videos");
      this.setState({ videos: response.data, isLoading: false });
    } catch (e) {
      this.setState({ videos: [], isLoading: false });
      console.error("Failed to fetch top videos!\n", e);
    }
  };

  loadSkeletons() {
    const { theme } = this.props;
    let arr = [];
    for (let i = 0; i < DEFAULT_SIZE; i++) {
      arr.push(i);
    }

    return arr.map((x) => {
      return <SkeletonCard theme={theme} key={x} />;
    });
  }

  renderVideos() {
    const { videos } = this.state;
    const { theme } = this.props;

    return videos.map((video) => {
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
  }

  componentDidMount() {
    this.fetchVideos();
  }

  render() {
    const { theme } = this.props;
    const { isLoading } = this.state;

    return (
      <div className="left container">
        <h2 data-theme={theme}>Most Popular Videos</h2>
        <div className="wrapper">
          {isLoading ? this.loadSkeletons() : this.renderVideos()}
        </div>
      </div>
    );
  }
}

export default Videos;

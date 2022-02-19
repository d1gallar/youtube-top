import React from "react";
import "./Channels.css";
import "../../App.css";
import ChannelCell from "../ChannelCell/ChannelCell";
import SkeletonChannel from "../Skeletons/SkeletonChannel";
import axios from "axios";

const DEFAULT_SIZE = 50;

class Channels extends React.Component {
  state = { channels: [], isLoading: true };

  fetchChannels = async () => {
    try {
      const response = await axios.get("/channels");
      this.setState({ channels: response.data, isLoading: false });
    } catch (e) {
      this.setState({ channels: [], isLoading: false });
      console.error("Failed to fetch top channels!\n", e);
    }
  };

  loadSkeleton() {
    const { theme } = this.props;
    let arr = [];
    for (let i = 0; i < DEFAULT_SIZE; i++) {
      arr.push(i);
    }
    return arr.map((x) => {
      return <SkeletonChannel theme={theme} key={x} />;
    });
  }

  renderChannels() {
    const { channels } = this.state;
    const { theme } = this.props;
    return channels.map((channel, i) => {
      const {
        channelPic,
        startDate,
        uploadCount,
        viewCount,
        title,
        subscribers,
        country,
        id,
      } = channel;
      return (
        <ChannelCell
          rank={i + 1}
          url={`https://youtube.com/channel/${id}`}
          thumbnail={channelPic}
          startDate={startDate}
          uploads={uploadCount}
          views={viewCount}
          title={title}
          subscribers={subscribers}
          country={country}
          key={id}
          theme={theme}
        />
      );
    });
  }

  componentDidMount() {
    this.fetchChannels();
  }

  render() {
    const { theme } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="left container" data-theme={theme}>
        <h2 data-theme={theme}>Top Channels</h2>
        <div>
          <table className="table" data-theme={theme}>
            <thead>
              <tr>
                <th scope="col" className="center">
                  Rank
                </th>
                <th scope="col">Name</th>
                <th scope="col">Created On</th>
                <th scope="col">Uploads</th>
                <th scope="col">Views</th>
                <th scope="col">Subscribers</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? this.loadSkeleton() : this.renderChannels()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Channels;

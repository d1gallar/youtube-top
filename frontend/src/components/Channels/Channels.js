import React from "react";
import "./Channels.css";
import "../../App.css";
import ChannelCell from "../ChannelCell/ChannelCell";
import SkeletonChannel from "../Skeletons/SkeletonChannel";
import axios from "axios";

const DEFAULT_SIZE = 50;
class Channels extends React.Component {
  state = { channels: [] };

  renderChannels() {
    const { channels } = this.state;
    const { theme } = this.props;
    return channels.map((channel, i) => {
      const {channelPic, startDate, uploadCount, 
        viewCount, title, subscribers, country, id} = channel;
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

  fetchChannels = async () => {
    const response = await axios.get("/channels");
    if(!response) throw new Error('Failed to fetch channels!');
    this.setState({channels: response.data});
  }

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

  componentDidMount() {
    setTimeout(() => {
      this.fetchChannels();
    },1000);
  }

  render() {
    const { theme } = this.props;
    const length = this.state.channels.length;
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
              {length === 0 ? this.loadSkeleton() : this.renderChannels()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Channels;

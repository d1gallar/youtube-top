import React from "react";
import "./Channels.css";
import "../../App.css";
import channelData from "../../data/channels.json";
import countryData from "../../data/countries.json";
import youtube from "../../api/youtube";
import ChannelCell from "../ChannelCell/ChannelCell";
import SkeletonChannel from "../Skeletons/SkeletonChannel";

const DEFAULT_SIZE = 50;
class Channels extends React.Component {
  state = { channels: [] };

  fetchYoutube = async () => {
    let channelIds = channelData.map((channel) => {
      return channel.id;
    });
    channelIds = channelIds.join(",");
    const response = await youtube.get("/channels", {
      params: {
        part: "snippet,statistics",
        id: channelIds,
        maxResults: 5,
      },
    });
    if (!response) throw Error("Failed to fetch channels.");
    const results = response.data.items;
    const sorted = this.sortBySubscribers([...results]);
    this.setState({ channels: sorted });
  };

  sortBySubscribers(channels) {
    const compareSubscribers = (a, b) => {
      const aCount = Number.parseInt(a.statistics.subscriberCount);
      const bCount = Number.parseInt(b.statistics.subscriberCount);
      if (aCount < bCount) return 1;
      else if (aCount > bCount) return -1;
      else return 0;
    };
    return channels.sort(compareSubscribers);
  }

  abbreviateCount = (result) => {
    const count = Number.parseInt(result.replace(/,/g, ""));
    if (Math.floor(count / 1000000000) >= 1) {
      result = result.slice(0, result.indexOf(",") + 2);
      if (result[result.length - 1] !== "0") {
        result = result.replace(",", ".");
      } else {
        result = result.slice(0, result.indexOf(","));
      }
      result += "B";
    } else if (Math.floor(count / 1000000) >= 1) {
      result = result.slice(0, result.indexOf(",") + 2);
      if (result[result.length - 1] !== "0") {
        result = result.replace(",", ".");
      } else {
        result = result.slice(0, result.indexOf(","));
      }
      result += "M";
    } else if (count / 1000 >= 1) {
      result = result.slice(0, result.indexOf(",") + 2);
      if (result[result.length - 1] !== "0") {
        result = result.replace(",", ".");
      } else {
        result = result.slice(0, result.indexOf(","));
      }
      result += "K";
    }
    return result;
  };

  formatCount = (num) => {
    num = num.split(".");
    num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    num = num.join(".");
    return this.abbreviateCount(num);
  };

  formatDate = (isoString) => {
    const date = new Date(isoString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    let format = "";
    // eslint-disable-next-line default-case
    switch (month) {
      case 1:
        format += "January";
        break;
      case 2:
        format += "February";
        break;
      case 3:
        format += "March";
        break;
      case 4:
        format += "April";
        break;
      case 5:
        format += "May";
        break;
      case 6:
        format += "June";
        break;
      case 7:
        format += "July";
        break;
      case 8:
        format += "August";
        break;
      case 9:
        format += "September";
        break;
      case 10:
        format += "October";
        break;
      case 11:
        format += "November";
        break;
      case 12:
        format += "December";
        break;
    }
    format += " " + day;
    format += ", " + year;
    return format;
  };

  formatCountry = (countryCode) => {
    let countryName = null;
    countryData.forEach((country) => {
      if (country.Code === countryCode) {
        countryName = country.Name;
      }
    });
    return countryName;
  };

  renderChannels() {
    const { channels } = this.state;
    const { theme } = this.props;
    return channels.map((channel, i) => {
      const id = channel.id;
      const startDate = this.formatDate(channel.snippet.publishedAt);
      const title = channel.snippet.title;
      const country = this.formatCountry(channel.snippet.country) || "-";
      const channelPic = channel.snippet.thumbnails.high.url;
      const subscribers = this.formatCount(channel.statistics.subscriberCount);
      const uploadCount = this.formatCount(channel.statistics.videoCount);
      const viewCount = this.formatCount(channel.statistics.viewCount);

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
      this.fetchYoutube();
    },1500);
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

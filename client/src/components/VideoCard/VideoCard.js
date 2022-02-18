import React from "react";
import "./VideoCard.css";

class VideoCard extends React.Component {
  state = { views: null };

  abbreviateViews = (result) => {
    const views = Number.parseInt(result.replace(/,/g, ""));
    if (Math.floor(views / 1000000) >= 1) {
      result = result.slice(0, result.indexOf(",") + 2);
      if (result[result.length - 1] !== "0") {
        result = result.replace(",", ".");
      } else {
        result = result.slice(0, result.indexOf(","));
      }
      result += "M";
    } else if (views / 1000 >= 1) {
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

  formatViews = (num) => {
    num = num.split(".");
    num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    num = num.join(".");
    return this.abbreviateViews(num);
  };

  onCardClick = () => {
    window.open(`${this.props.videoURL}`, '_blank');
  };

  onChannelClick = () => {
    window.open(`${this.props.channelURL}`, '_blank');
  };

  componentDidMount() {
    const fetchViews = async () => {
      const result = await this.props.views;
      const views = this.formatViews(result);
      this.setState({ views });
    };

    const fetchChannelPic = async () => {
      const channelPic = await this.props.channelPic;
      this.setState({ channelPic });
    };
    fetchViews();
    fetchChannelPic();
  }

  render() {
    const {theme} = this.props;
    return (
      <div className="card" data-theme={theme}>
        <img
          className="thumbnail"
          src={`${this.props.thumbnail}`}
          alt={`${this.props.title}`}
          onClick={this.onCardClick}
        />
        <div className="cardBody row" data-theme={theme}>
          <div className="col-2">
            <img
              src={`${this.state.channelPic}`}
              className="channelPic"
              alt=""
              onClick={this.onChannelClick}
            />
          </div>
          <div className="col-8">
            <h5 className="card-title"onClick={this.onCardClick}>
              {this.props.title}
            </h5>
            <div className="card-inner">
              <a
                className="card-text"
                href={`${this.props.channelURL}`}
                target="_blank"
                rel="noopener noreferrer"
                data-theme={theme}>
                {this.props.channel}
              </a>
              <p className="card-text">{this.state.views} views</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoCard;

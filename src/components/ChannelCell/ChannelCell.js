import React from "react";
import "./ChannelCell.css";

class ChannelCell extends React.Component {
  onChannelClick = () => {
    window.open(`${this.props.url}`, "_blank");
  };

  render() {
    const { theme } = this.props;
    return (
      <React.Fragment>
        <tr>
          <td className="vertical-center center">{this.props.rank}</td>
          <td className="vertical-center">
            <div className="row">
              <div className="col-2">
                <img
                  src={this.props.thumbnail}
                  className="channelPic"
                  alt={this.props.title}
                  onClick={this.onChannelClick}
                ></img>
              </div>
              <div className="col-8 name">
                <a
                  href={`${this.props.url}`}
                  className="channelUrl"
                  data-theme={theme}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.props.title}
                </a>
              </div>
            </div>
          </td>
          <td className="vertical-center">{this.props.startDate}</td>
          <td className="vertical-center">{this.props.uploads}</td>
          <td className="vertical-center">{this.props.views}</td>
          <td className="vertical-center">{this.props.subscribers}</td>
          <td className="vertical-center">{this.props.country}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default ChannelCell;

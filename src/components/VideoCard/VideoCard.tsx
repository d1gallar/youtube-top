import { useEffect, useState } from "react";
import { formatViews } from "../../util/formatApi";
import "./VideoCard.css";

type VideoCardProps = {
  videoURL: string;
  channelURL: string;
  views: string;
  channelPic: string;
  thumbnail: string;
  title: string;
  theme: string;
  channel: string;
};

function VideoCard(props: VideoCardProps) {
  const [views, setViews] = useState<string | null>(null);

  // TODO: put an a tag!
  const onChannelClick = () => {
    window.open(props.channelURL, "_blank");
  };

  // TODO: Move format views api into backend!
  const fetchViews = () => {
    const result = props.views;
    const views = formatViews(result); // TODO: Call format views in backend!
    setViews(views);
  };

  useEffect(() => {
    fetchViews();
  }, []);

  return (
    <div className="card" data-theme={props.theme}>
      <a
        href={props.videoURL}
        target="_blank"
        rel="noopener noreferrer"
        className="thumbnail"
      >
        <img className="thumbnail" src={props.thumbnail} alt={props.title} />
      </a>
      <div className="cardBody d-flex" data-theme={props.theme}>
        <div className="w-25 d-flex align-items justify-content-center">
          <a href={props.channelURL} target="_blank" rel="noopener noreferrer">
            <img
              src={props.channelPic}
              id="channelPic"
              alt={props.channel}
              onClick={() => onChannelClick()}
            />
          </a>
        </div>
        <div className="w-75">
          <a
            href={props.videoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title"
          >
            <h5 className="card-title">{props.title}</h5>
          </a>
          <div className="card-inner">
            <a
              className="card-text"
              href={`${props.channelURL}`}
              target="_blank"
              rel="noopener noreferrer"
              data-theme={props.theme}
            >
              {props.channel}
            </a>
            <p className="card-text">{views} views</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;

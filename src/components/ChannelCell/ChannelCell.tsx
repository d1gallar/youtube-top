import React from "react";
import "./ChannelCell.css";

type ChannelCellProps = {
  url: string;
  rank: number;
  thumbnail: string;
  title: string;
  theme: string;
  startDate: string;
  uploads: number;
  views: number;
  subscribers: number;
  country: string;
};

const PUBLIC_URL = process.env.PUBLIC_URL;

function ChannelCell(props: ChannelCellProps) {
  return (
    <React.Fragment>
      <tr>
        <td className="w-[1rem]">{props.rank}</td>
        <td>
          <div className="d-flex flex-row align-items-center justify-content-start w-100 gap-3">
            <div>
              <a href={props.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={props.thumbnail}
                  alt={props.title}
                  className="channelPic"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `${PUBLIC_URL}/images/thumbnail-error.svg`;
                  }}
                ></img>
              </a>
            </div>
            <div>
              <a
                href={`${props.url}`}
                className="channelUrl"
                data-theme={props.theme}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.title}
              </a>
            </div>
          </div>
        </td>
        <td>{props.startDate}</td>
        <td>{props.uploads}</td>
        <td>{props.views}</td>
        <td>{props.subscribers}</td>
        <td>{props.country}</td>
      </tr>
    </React.Fragment>
  );
}

export default ChannelCell;

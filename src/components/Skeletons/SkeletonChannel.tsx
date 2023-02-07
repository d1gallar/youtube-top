import React from "react";
import Skeleton from "./Skeleton";
import "../ChannelCell/ChannelCell.css";

const SkeletonChannel = () => {
  return (
    <React.Fragment>
      <tr className="skeleton-wrapper">
        <td className="d-flex flex-row align-items-center justify-content-center w-100">
          <Skeleton type="rank" />
        </td>
        <td className="d-flex flex-row align-items-center justify-content-start w-100 gap-3">
          <Skeleton type="channel" />
          <Skeleton type="name" />
        </td>
        <td>
          <Skeleton type="cell" />
        </td>
        <td>
          <Skeleton type="cell" />
        </td>
        <td>
          <Skeleton type="cell" />
        </td>
        <td>
          <Skeleton type="cell" />
        </td>
        <td>
          <Skeleton type="cell" />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default SkeletonChannel;

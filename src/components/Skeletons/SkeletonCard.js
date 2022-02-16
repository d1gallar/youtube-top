import React from "react";
import Skeleton from "./Skeleton";
import "../VideoCard/VideoCard.css";

const SkeletonCard = ({ theme }) => {
  return (
      <div className="card" data-theme={theme}>
        <Skeleton type="thumbnail" />
        <div className="cardBody row" data-theme={theme}>
          <div className="col-2">
            <Skeleton type="channel" />
          </div>
          <div className="col-8">
            <Skeleton type="title" />
            <Skeleton type="card-text" />
            <Skeleton type="card-text" />
          </div>
        </div>
      </div>
  );
};

export default SkeletonCard;

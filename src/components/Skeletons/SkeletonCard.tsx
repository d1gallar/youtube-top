import { useContext } from "react";
import Skeleton from "./Skeleton";
import "../VideoCard/VideoCard.css";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";

const SkeletonCard = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="card" data-theme={theme}>
      <Skeleton type="thumbnail" />
      <div className="cardBody d-flex" data-theme={theme}>
        <div className="w-25 d-flex align-items justify-content-center">
          <Skeleton type="channel" />
        </div>
        <div className="w-75 innerBody">
          <Skeleton type="title" />
          <Skeleton type="card-text" />
          <Skeleton type="card-text" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

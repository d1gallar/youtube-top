import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import useChannels from "../../hooks/Channels/Channels";
import ChannelList from "../ChannelList/ChannelList";
import DataError from "../DataError/DataError";
import SkeletonChannelList from "../SkeletonChannelList/SkeletonChannelList";
import "./Channels.css";
import "../App/App.css";
import TableSort from "../TableSort/TableSort";
import { sortByViews } from "../../util/formatApi";

export type ChannelType = {
  rank: number;
  channelPic: string;
  startDate: string;
  uploadCount: number;
  viewCount: number;
  title: string;
  subscriberCount: string;
  subscribers: number;
  country: string;
  createdAt: string;
  uploads: string;
  views: string;
  id: string;
};

function Channels() {
  const { theme } = useContext(ThemeContext);
  const {
    channels,
    isLoading,
    error,
    sortByRank,
    sortByName,
    sortByCreated,
    sortByUploads,
    sortByViews,
    sortBySubscribers,
    sortByCountry,
  } = useChannels();
  const [nameDir, setNameDir] = useState(true);
  const [rankDir, setRankDir] = useState(true);
  const [createdDir, setCreatedDir] = useState(true);
  const [uploadDir, setUploadDir] = useState(true);
  const [viewsDir, setViewsDir] = useState(true);
  const [subsDir, setSubsDir] = useState(true);
  const [countryDir, setCountryDir] = useState(true);

  const toggleRankDir = () => {
    sortByRank(rankDir);
    setRankDir(!rankDir);
  };
  const toggleNameDir = () => {
    sortByName(nameDir);
    setNameDir(!nameDir);
  };
  const toggleCreatedDir = () => {
    sortByCreated(createdDir);
    setCreatedDir(!createdDir);
  };
  const toggleUploadDir = () => {
    sortByUploads(uploadDir);
    setUploadDir(!uploadDir);
  };
  const toggleViewsDir = () => {
    sortByViews(viewsDir);
    setViewsDir(!viewsDir);
  };
  const toggleSubDir = () => {
    sortBySubscribers(subsDir);
    setSubsDir(!subsDir);
  };
  const toggleCountryDir = () => {
    sortByCountry(countryDir);
    setCountryDir(!countryDir);
  };

  if (error) return <DataError />;
  return (
    <div className="channelContainer left" data-theme={theme} id="channel">
      <h2 data-theme={theme}>Top Channels</h2>
      <div>
        <table className="table" data-theme={theme}>
          <thead>
            <tr>
              <TableSort sort={() => toggleRankDir()}>
                <p>Rank</p>
              </TableSort>
              <TableSort sort={() => toggleNameDir()}>
                <p>Name</p>
              </TableSort>
              <TableSort sort={() => toggleCreatedDir()}>
                <p>Created On</p>
              </TableSort>
              <TableSort sort={() => toggleUploadDir()}>
                <p>Uploads</p>
              </TableSort>
              <TableSort sort={() => toggleViewsDir()}>
                <p>Views</p>
              </TableSort>
              <TableSort sort={() => toggleSubDir()}>
                <p>Subscribers</p>
              </TableSort>
              <TableSort sort={() => toggleCountryDir()}>
                <p>Country</p>
              </TableSort>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonChannelList />
            ) : (
              <ChannelList channels={channels} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Channels;

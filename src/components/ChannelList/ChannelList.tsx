import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider/ThemeProvider";
import ChannelCell from "../ChannelCell/ChannelCell";
import { ChannelType } from "../Channels/Channels";

export type ChannelTypeList = Array<ChannelType>;

export type ChannelListProps = {
  channels: ChannelTypeList;
};

export default function ChannelList(props: ChannelListProps) {
  const { theme } = useContext(ThemeContext);
  const renderChannels = () => {
    return props.channels.map((channel: ChannelType, i: number) => {
      const {
        rank,
        channelPic,
        startDate,
        uploadCount,
        viewCount,
        title,
        subscribers,
        country,
        id,
      } = channel;
      return (
        <ChannelCell
          rank={rank}
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
  };
  return <React.Fragment>{renderChannels()}</React.Fragment>;
}

import countryData from "../data/countries.json";
import { fetchChannelPic } from "../api/youtube";
import { ChannelType } from "../components/Channels/Channels";

export type Country = {
  Code: string;
  Name: string;
};

export type Channel = {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    country: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: number;
    subscriberCount: number;
    videoCount: number;
  };
  channelPic: string;
};

export type Video = {
  id: string;
  snippet: {
    channelTitle: any;
    title: any;
    publishedAt: string;
    channelId: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  channelTitle: string;
  statistics: {
    viewCount: number;
    likeCount: number;
    commentCount: number;
  };
};

// Sorts all the youtube channels by subscribers
export const sortBySubscribers = (channels: Array<Channel>) => {
  const compareSubscribers = (a: Channel, b: Channel) => {
    const aCount = Number.parseInt(a.statistics.subscriberCount.toString());
    const bCount = Number.parseInt(b.statistics.subscriberCount.toString());
    if (aCount < bCount) return 1;
    else if (aCount > bCount) return -1;
    else return 0;
  };
  return channels.sort(compareSubscribers) as Array<Channel>;
};

//Sorts all the most popular videos by view count
export const sortByViews = (videos: Array<Video>) => {
  const compareViews = (a: Video, b: Video) => {
    const aCount = Number.parseInt(a.statistics.viewCount.toString());
    const bCount = Number.parseInt(b.statistics.viewCount.toString());
    if (aCount < bCount) return 1;
    else if (aCount > bCount) return -1;
    else return 0;
  };
  return videos.sort(compareViews) as Array<Video>;
};

// Abbreviates a stringified number and returns a formatted string
// (ex: 1000 => 1K, 1000000 -> 1M, 1000000000 => 1B)
export const abbreviateCount = (result: string) => {
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

//Reformats the number
export const formatCount = (num: number) => {
  const number = num.toString();
  const strArr = number.split(".");
  strArr[0] = strArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const result = strArr.join(".");
  return result;
};

// Converts an ISO date string to a [month, day, year] format
export const formatDate = (isoString: string) => {
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

//Converts an abbreviated country code into its elongated version
// (ex: US => United States )
export const formatCountry = (countryCode: string) => {
  let countryName: string | null = null;
  countryData.forEach((country: Country) => {
    if (country.Code === countryCode) {
      countryName = country.Name;
    }
  });
  return countryName || "-";
};

// Formats all channels by sorting by subscribers and modifying their info
export const formatChannels = (channels: Array<Channel>) => {
  const sorted = sortBySubscribers(channels);
  return sorted.map((channel: Channel, i: number) => {
    const subscribers = abbreviateCount(
      formatCount(channel.statistics.subscriberCount)
    );
    const uploadCount = abbreviateCount(
      formatCount(channel.statistics.videoCount)
    );
    const viewCount = abbreviateCount(
      formatCount(channel.statistics.viewCount)
    );
    return {
      id: channel.id,
      rank: i+1,
      title: channel.snippet.title,
      channelPic: channel.snippet.thumbnails.high.url,
      startDate: formatDate(channel.snippet.publishedAt),
      country: formatCountry(channel.snippet.country),
      subscribers,
      uploadCount,
      viewCount,
      createdAt: channel.snippet.publishedAt,
      uploads: channel.statistics.videoCount,
      views: channel.statistics.viewCount,
      subscriberCount: channel.statistics.subscriberCount
    };
  });
};

// Formats all the popular videos by sorting them by views,
// abbreviating the view count, and by fetching for the channel picture
export const formatVideos = async (videos: Array<Video>) => {
  const sorted = sortByViews(videos);

  return await Promise.all(
    sorted.map(async (video) => {
      const viewCount = abbreviateCount(
        formatCount(video.statistics.viewCount)
      );

      let channelPic = null;
      const response = await fetchChannelPic(video.snippet.channelId);
      if (!response) throw new Error("Failed to fetch channel picture.");
      channelPic = response.data.items[0].snippet.thumbnails.high.url;

      return {
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.medium.url,
        channelId: video.snippet.channelId,
        channel: video.snippet.channelTitle,
        views: viewCount,
        channelPic: channelPic,
      };
    })
  );
};

// A helper function to format the youtube views by abbreviating the 
// to a user friendly format. (Ex: 1,0000,000 => '1M')
export const abbreviateViews = (result: string) => {
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

export const formatViews = (num: string | null) => {
  if (!num) return null;
  const strArr: string[] = num.split(".");
  strArr[0] = strArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  num = strArr.join(".");
  return abbreviateViews(num);
};
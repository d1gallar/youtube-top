const countryData = require("../data/countries.json");
const {fetchChannelPic} = require('../api/youtube');

// Sorts all the youtube channels by subscribers
const sortBySubscribers = (channels) => {
  const compareSubscribers = (a, b) => {
    const aCount = Number.parseInt(a.statistics.subscriberCount);
    const bCount = Number.parseInt(b.statistics.subscriberCount);
    if (aCount < bCount) return 1;
    else if (aCount > bCount) return -1;
    else return 0;
  };
  return channels.sort(compareSubscribers);
};

//Sorts all the most popular videos by view count
const sortByViews = (videos) => {
  const compareViews = (a,b) =>{
    const aCount = Number.parseInt(a.statistics.viewCount);
    const bCount = Number.parseInt(b.statistics.viewCount);
    if(aCount < bCount)return 1;
    else if(aCount > bCount)return -1;
    else return 0;
  }
  return videos.sort(compareViews);
}

// Abbreviates a stringified number and returns a formatted string
// (ex: 1000 => 1K, 1000000 -> 1M, 1000000000 => 1B)
const abbreviateCount = (result) => {
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
const formatCount = (num) => {
  num = num.split(".");
  num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  num = num.join(".");
  return num;
};

// Converts an ISO date string to a [month, day, year] format
const formatDate = (isoString) => {
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
const formatCountry = (countryCode) => {
  let countryName = null;
  countryData.forEach((country) => {
    if (country.Code === countryCode) {
      countryName = country.Name;
    }
  });
  return countryName || "-";
};

// Formats all channels by sorting by subscribers and modifying their info
const formatChannels = (channels) => {
  const sorted = sortBySubscribers(channels);

  return sorted.map((channel) => {
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
      title: channel.snippet.title,
      channelPic: channel.snippet.thumbnails.high.url,
      startDate: formatDate(channel.snippet.publishedAt),
      country: formatCountry(channel.snippet.country),
      subscribers,
      uploadCount,
      viewCount
    };
  });
};

// Formats all the popular videos by sorting them by views,
// abbreviating the view count, and by fetching for the channel picture
const formatVideos = async (videos) => {
  const sorted = sortByViews(videos);

  const formatted = await Promise.all(sorted.map( async video => {
    const viewCount = abbreviateCount(
      formatCount(video.statistics.viewCount)
    );

    let channelPic = null;
    const response = await fetchChannelPic(video.snippet.channelId);
    if(!response) channelPic = null;
    channelPic = response.data.items[0].snippet.thumbnails.high.url;

    return {
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      channelId: video.snippet.channelId,
      channel: video.snippet.channelTitle,
      views: viewCount,
      channelPic: channelPic
    };
  }));
  return formatted;
};

module.exports = {formatChannels, formatVideos};

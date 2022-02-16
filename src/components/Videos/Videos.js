import React from 'react';
import "./Videos.css";
import youtube from '../../api/youtube';
import VideoCard from "../VideoCard/VideoCard";
import SkeletonCard from '../Skeletons/SkeletonCard';

const DEFAULT_SIZE = 12;

class Videos extends React.Component {
  state = {videos: []}

  fetchYoutube = async() =>{
    const response = await youtube.get('/videos', {params: {
      chart: 'mostPopular',
      part: 'snippet,statistics',
      maxResults: DEFAULT_SIZE
    }});
    if(!response) throw Error('Failed to fetch video information.');
    const results = response.data.items;
    const sorted = this.sortByViews([...results]);
    this.setState({videos: sorted});
  }

  sortByViews(videos){
    const compareViews = (a,b) =>{
      const aCount = Number.parseInt(a.statistics.viewCount);
      const bCount = Number.parseInt(b.statistics.viewCount);
      if(aCount < bCount)return 1;
      else if(aCount > bCount)return -1;
      else return 0;
    }
    return videos.sort(compareViews);
  }

  fetchChannel = async (channelId) =>{
    const response = await youtube.get(`/channels`, {params: {
      id: channelId,
      part: "snippet"
    }});
    if(!response) throw Error('Failed to fetch channel thumbnail.');
    return response.data.items[0].snippet.thumbnails.high.url;
  }

  renderVideos = () => {
    const {videos} = this.state;
    const {theme} = this.props;
    const sorted = this.sortByViews(videos);
    return sorted.map(video => {
      const thumbnail = video.snippet.thumbnails.high.url;
      const channelId = video.snippet.channelId;
      const title = video.snippet.title;
      const channel = video.snippet.channelTitle;
      const id = video.id;
      const views = video.statistics.viewCount;
      const channelPic = this.fetchChannel(channelId);
      return (
        <VideoCard
          thumbnail={thumbnail}
          videoURL={`https://youtube.com/watch?v=${id}`}
          title={title}
          channel={channel}
          channelURL={`https://youtube.com/channel/${channelId}`}
          channelPic={channelPic}
          views={views}
          key={id}
          theme={theme}
        />
      )
    });
  }

  loadSkeletons(){
    const {theme} = this.props;
    let arr = [];
    for(let i = 0; i < DEFAULT_SIZE; i++){
      arr.push(i);
    }

    return arr.map( (x) => {
      return (<SkeletonCard theme={theme} key={x} />)
    });
  }

  componentDidMount(){
    setTimeout(() => {
      this.fetchYoutube();
    },1000);
  }

  render(){
    const {theme} = this.props;
    const length = this.state.videos.length;

    return (
      <div className="left container">
        <h2 data-theme={theme}>Most Popular Videos</h2>
        <div className="wrapper">
          {length === 0 ? this.loadSkeletons() : this.renderVideos()}
        </div>
      </div>
    );
  }
}

export default Videos;
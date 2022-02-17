import React from 'react';
import './Broadcasts.css';
// import youtube from '../../api/youtube';

const DEFAULT_SIZE = 2;
class Broadcasts extends React.Component {

  // state = {broadcasts: []};
  
  // fetchYoutube = async() =>{
  //   const response = await youtube.get('/liveBroadcasts', {params: {
  //     part: 'id,snippet,status',
  //     broadcastStatus: 'active',
  //     maxResults: DEFAULT_SIZE
  //   }});
  //   if(!response) throw Error('Failed to fetch broadcast.');
  //   const results = response.data.items;
  //   this.setState({broadcasts: results});

  //   // const sorted = this.sortByViews([...results]);
  //   // this.setState({videos: sorted});
  // }

  // renderBroadcasts = () => {
  //   const {broadcasts} = this.state;
  //   return broadcasts.map((broadcast) => {
  //     return 
      
  //   });
  // }

  // componentDidMount(){
  //   this.fetchYoutube();
  // }

  // render() {
  //   const {theme} = this.props;
  //   const length = this.state.broadcasts.length;

  //   return (
  //     <div className='left container'>
  //       <h2 data-theme={theme}>Top Broadcasts</h2>
  //     </div>
  //   )
  // }
  render(){
    return <div></div>;
  }
}

export default Broadcasts;
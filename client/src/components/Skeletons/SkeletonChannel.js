import React from 'react';
import Skeleton from './Skeleton';
import '../ChannelCell/ChannelCell.css';

const SkeletonChannel = ({theme}) => {
  return (
    <React.Fragment>
      <tr className='skeleton-wrapper'>
          <td className="vertical-center center">
            <Skeleton type='rank' theme={theme} />
          </td>
          <td className="vertical-center" style={{minWidth:"10rem", display: "flex"}}>
            <Skeleton type='channel' theme={theme}/>
            <Skeleton type='name' theme={theme} />
          </td>
          <td className="vertical-center">
            <Skeleton type='cell' theme={theme} />
          </td>
          <td className="vertical-center">
            <Skeleton type='cell' theme={theme} />
          </td>
          <td className="vertical-center">
            <Skeleton type='cell' theme={theme} />
          </td>
          <td className="vertical-center">
            <Skeleton type='cell' theme={theme} />
          </td>
          <td className="vertical-center">
            <Skeleton type='cell' theme={theme} />
          </td>
        </tr>
    </React.Fragment>
  );
};

export default SkeletonChannel;
import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId }) => {
  const opts = {
    width: '100%',
    playerVars: {
      // You can add additional YouTube player options here
    },
  };

  return (
    <div className="video-player">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default VideoPlayer;

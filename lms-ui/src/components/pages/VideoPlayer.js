import React from 'react';
import ReactPlayer from "react-player";

const VideoPlayer = ({ selectedLesson }) => {
  return (
    <div className="video-player-container">
      {selectedLesson && selectedLesson.url && (
        <ReactPlayer url={selectedLesson.url} controls={true} width="100%" />
      )}
    </div>
  );
};

export default VideoPlayer;

import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ selectedLesson,handleVideoProgress }) => {
  return (
    <div className="video_player_container">
      <div>
      {selectedLesson && selectedLesson.url && (
        <ReactPlayer
          url={selectedLesson.url}
          controls={true}
          width="100%"
          height="62vh"
          volume={3.5}
          onProgress={handleVideoProgress}
        />
      )}
      </div>
    </div>
  );
};

export default VideoPlayer;

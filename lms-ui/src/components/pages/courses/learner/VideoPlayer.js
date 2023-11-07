import React, { useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ selectedLesson,handleVideoProgress, setVideoCompletion }) => {



  const handleProgress = (progress) => {
       // Calculate the percentage of video completion
       const percentage = progress.played * 100;
      console.log('Video completion ', percentage);
   
       // Check if the video is played 90% or more
       if (percentage >= 90) {
        console.log('Video played 90');
        setVideoCompletion(true)

        // fetch(`http://127.0.0.1:8000/api/videos/`, {
        //   method: "PUT",
        //   body: JSON.stringify(),
        //   headers: {
        //     Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        //     "Content-type": "application/json; charset=UTF-8",
        //   },
        // }).then((response) => {
        //   if (response.status === 200) {
        //     response.json().then(function (result) {
        //       console.log(result);
        //     });
        //   } else {
        //     console.log(response);
        //   }
        // });

       }
  }

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
          // onProgress={handleVideoProgress}
          onProgress={handleProgress}
        />
      )}
      </div>
    </div>
  );
};

export default VideoPlayer;

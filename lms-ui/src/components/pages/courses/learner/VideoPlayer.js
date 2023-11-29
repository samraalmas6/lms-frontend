import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({
  selectedLesson,
  handleVideoProgress,
  setVideoCompletion,
}) => {
  const userId = +sessionStorage.getItem("user_id");
  const [timer, setTimer] = useState(true)
  useEffect(() => {
    if(selectedLesson){
    setVideoCompletion(selectedLesson.completion);
    }
  }, [selectedLesson]);
  
  const handleProgress = (progress) => {
    const percentage = progress.played * 100;
    console.log("Video completion ", percentage);

    if (percentage >= 90 && timer === true) {
      console.log("Video played 90");
      setVideoCompletion(true);

      const obj = {
        title: selectedLesson.title,
        url: selectedLesson.url,
        instructor: selectedLesson.instructor,
        unit: selectedLesson.unit,
        updated_by: userId,
        learner: userId,
        completion: true,
      };

      fetch(`http://127.0.0.1:8000/api/videos/${selectedLesson.id}/`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setTimer(false)
          });
        } else {
          console.log(response);
        }
      });
    }
  };

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

import React, { useState } from "react";
import YouTube from "react-youtube";
import Collapse from "react-collapse";
import styles from "../styles/CourseTable.module.css";
import ReactPlayer from 'react-player';
import "../styles/CourseTable.css";

const ModuleCard = ({ module }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isModuleExpanded, setIsModuleExpanded] = useState(false);

  const selectLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  const toggleModuleExpand = () => {
    setIsModuleExpanded(!isModuleExpanded);
  };

  const videoUrl = "https://youtu.be/apGV9Kg7ics?si=yP2oeVUi684WxZyg";

  // console.log(selectedLesson)
  // console.log(selectedLesson && selectedLesson.url)
  return (
    <div className="module-card">
      <div className="module-header" onClick={toggleModuleExpand}>
        <h3>{module.title}</h3>
        <i class="fas fa-caret-up fa-rotate-180 arrow"></i>
      </div>
      <Collapse isOpened={isModuleExpanded}>
        <div className="module-list">
          <ul className="module-content">
            {module.lessons.map((lesson) => (
              <>
                <div className="module-content-container">
                  <div className="check-box-div">
                    {/* <Checkbox {...label} /> */}
                    <form action="">
                      <input
                        className="checkbox"
                        type="checkbox"
                        id="lesson"
                        name="lesson"
                        value="lesson"
                      />
                    </form>
                  </div>
                  <div className="content-inside-container">
                    <li
                      key={lesson.id}
                      onClick={() => selectLesson(lesson)}
                      className={`lesson-item ${
                        selectedLesson === lesson ? "active" : ""
                      } upper-row`}
                    >
                      <li>{lesson.sno}</li>
                      <li> {lesson.title}</li>
                    </li>
                    <li>
                      <div className="video-player-icon">
                        <i class="fas fa-solid fa-tv"></i>
                        {lesson.duration}
                      </div>
                    </li>
                    {/* <i class="fas fa-solid fa-play"></i> */}
                  </div>
                </div>
              </>
            ))}
          </ul>
        </div>

        {/* -------------xxxxxxxxxxxxxx---------------- */}
        {/* <div className="module-content">
          <div className="row-1">
            {module.lessons.map((lesson) => (
                 key={lesson.id}
              onClick = {() =>selectLesson(lesson)}
              className={`lesson-item ${selectedLesson === lesson ? 'active' : ''}`}
            ))}
          </div>
          <div className="row-2"></div>
        </div> */}
      </Collapse>
      <div className="video_player_container">
        {selectedLesson && selectedLesson.url && (
          // <YouTube videoId={selectedLesson.videoId} />
          <div className="video-player-container">
            {/* {module.lessons.map((lesson) => ( */}
              {console.log(selectedLesson.url)}
               <ReactPlayer
               url={selectedLesson.url}
               controls={true} // Show video controls (play, pause, volume, etc.)
               width="50%"
               height="auto"
             />
             {/* ))} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleCard;

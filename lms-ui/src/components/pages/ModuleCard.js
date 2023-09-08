import React, { useState } from "react";
import YouTube from "react-youtube";
import Collapse from "react-collapse";

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


  return (
    <div className="module-card">
      <div className="module-header" onClick={toggleModuleExpand}>
        <h3>{module.title}</h3>
        <i class="fas fa-caret-up fa-rotate-180 arrow"></i>
      </div>
      <Collapse isOpened={isModuleExpanded} />
        {isModuleExpanded && 
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
                  <div className="content-inside-container" >
                   {/* <Collapse isOpened={isModuleExpanded}> */}
                 
                   
                   <li 
                      key={lesson.id}
                      onClick={(e) => {
                        selectLesson(lesson)
                    }}
                        data-bs-toggle="collapse"
                        data-bs-target={`#${lesson.id}`}
                      className={`lesson-item ${
                        selectedLesson === lesson ? "active" : ""
                      } upper-row`}
                    >
                      <li >{lesson.sno}</li>
                      <li> {lesson.title}</li>
                    </li>
                    <li>
             
                      <div className="video-player-icon collapse" id={lesson.id}>
                        <i class="fas fa-solid fa-tv"></i>
                        {lesson.duration}
                      </div>
             
                    </li>

                    {/* </Collapse>                     */}
                    
                    {/* <i class="fas fa-solid fa-play"></i> */}
                  </div>
                </div>
                </>
              ))}
            </ul>
          </div>
}
        

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
      {/* </Collapse> */}
      <div className="video_player_container">
        {selectedLesson && selectedLesson.videoId && (
          <YouTube videoId={selectedLesson.videoId} />
        )}
      </div>
    </div>
  );
};

export default ModuleCard;

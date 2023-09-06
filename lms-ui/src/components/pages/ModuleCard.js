import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Collapse from 'react-collapse';
import styles from "../styles/CourseTable.module.css"
import "../styles/CourseTable.css"


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
      </div>
      <Collapse isOpened={isModuleExpanded}>
        <div className="module-list">
          <ul>
            {module.lessons.map((lesson) => (
              <li
                key={lesson.id}
                onClick={() => selectLesson(lesson)}
                className={`lesson-item ${selectedLesson === lesson ? 'active' : ''}`}
              >
                {lesson.title}
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
      <div className="video_player_container">
        {selectedLesson && selectedLesson.videoId && (
          <YouTube videoId={selectedLesson.videoId} />
        )}
      </div>
    </div>
  );
};

export default ModuleCard;

import React, { useState, useEffect } from "react";
import Collapse from "react-collapse";
import styles from "../styles/CourseTable.module.css";
import VideoPlayer from "./VideoPlayer";
import "../styles/CourseTable.css";

const ModuleCard = ({ module, isExpanded, toggleModule }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Reset selectedLesson when the module is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setSelectedLesson(null);
    }
  }, [isExpanded]);

  const toggleLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <div className="module-card">
      <div className="module-header" onClick={toggleModule}>
        <h3>{module.title}</h3>
        <i
          className={`fas fa-caret-up ${isExpanded ? "fa-rotate-180" : ""} arrow`}
        ></i>
      </div>
      <Collapse isOpened={isExpanded}>
        <div className="module-list">
          <ul className="module-content">
            {module.lessons.map((lesson) => (
              <div className="module-content-container" key={lesson.id}>
                <div className="check-box-div">
                  <form action="">
                    <input
                      className="checkbox"
                      type="checkbox"
                      id={`lesson-${lesson.id}`}
                      name="lesson"
                      value={`lesson-${lesson.id}`}
                    />
                  </form>
                </div>
                <div className="content-inside-container">
                  <li
                    data-bs-toggle="collapse"
                    data-bs-target={`#${lesson.id}`}
                    className={`lesson-item ${
                      selectedLesson === lesson ? "active" : ""
                    } upper-row`}
                  >
                    <li>{lesson.sno}</li>
                    <li> {lesson.title}</li>
                  </li>
                  <li>
                    <div
                      className={`video-player-icon collapse ${
                        selectedLesson === lesson ? "active" : ""
                      }`}
                      id={lesson.id}
                    >
                      <li
                        key={lesson.id}
                        onClick={() => {
                          toggleLesson(lesson);
                        }}
                        data-bs-toggle="collapse"
                        data-bs-target={`#${lesson.id}`}
                        className={`lesson-item upper-row`}
                      >
                        <li>{lesson.lecture_name}</li>
                      </li>
                      <li></li>
                    </div>
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </Collapse>
      <div className="video_player_container">
        <VideoPlayer selectedLesson={selectedLesson} />
      </div>
    </div>
  );
};

export default ModuleCard;




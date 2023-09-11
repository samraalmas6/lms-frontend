import React, { useState, useEffect } from "react";
import Collapse from "react-collapse";
import styles from "../styles/CourseTable.module.css";
import VideoPlayer from "./VideoPlayer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "../styles/CourseTable.css";
import ReactPlayer from "react-player";

const ModuleCard = ({ module, isExpanded, toggleModule }) => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  // const[selectModule,setSelectedModule] = useState(null);

  // Reset selectedLesson when the module is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setSelectedLesson(null);
    }
  }, [isExpanded]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleLesson = (lesson) => {
    setSelectedLesson(lesson);
  };

  // const selectModule = ({ module }) => {
  //   setSelectedModule(module);
  // };

  // const toggleModuleExpand = () => {
  //   setIsModuleExpanded(!isModuleExpanded);
  // };

  const toggleFullScreen = () => {
    const videoPlayer = document.getElementById("videoPlayer");

    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      videoPlayer.requestFullscreen().catch((err) => {
        console.error("Failed to enter full screen:", err);
      });
    }

    setIsFullScreen(!isFullScreen);
  };

  const videoUrl = "https://youtu.be/apGV9Kg7ics?si=yP2oeVUi684WxZyg";

  // console.log(module)
  console.log(module.lessons)

  // console.log(selectedLesson)
  // console.log(selectedLesson && selectedLesson.url)
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
            {module.lessons.map((lesson) => {
                return <div className="module-content-container" key={lesson.id}>
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
                      <li>
                        {/* <DocViewer
                          documents={lesson.file_uri}
                          pluginRenderers={DocViewerRenderers}
                          style={{ height: 1000 }}
                        /> */}
                      </li>
                    </div>
                  </div>
                  </div>
              })}
              <DocViewer
                          documents={module.lessons[0]}
                          pluginRenderers={DocViewerRenderers}
                          style={{ height: 1000 }}
                        />
            </ul>
          </div>
        </Collapse>
        <div className="video_player_container">
          {selectedLesson && selectedLesson.url && (
            <div className="video-player-container">
              {console.log(selectedLesson.url)}
              <ReactPlayer
                url={selectedLesson.url}
                controls={true}
                width="100%"
                height="100%"
                volume={3.5}
              />
            </div>
          )}
        </div>
      </div>  );
};

export default ModuleCard;




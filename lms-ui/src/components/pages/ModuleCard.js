import React, { useState, useEffect } from "react";
import Collapse from "react-collapse";
import styles from "../styles/CourseTable.module.css";
import VideoPlayer from "./VideoPlayer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "../styles/CourseTable.css";
import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

const ModuleCard = ({ module, isExpanded, toggleModule, handleLessonSelect, selectedLesson, handleVideoCompleted }) => {
  // const [selectedLesson, setSelectedLesson] = useState(null);
  const [showPDF, setShowPdf] = useState(false);
  const [doc, setDoc] = useState([]);
  const [isCourseContentVisible, setIsCourseContentVisible] = useState(true);
  // const[selectModule,setSelectedModule] = useState(null);

  useEffect(() => {
    if (!isExpanded) {
      handleLessonSelect(null);
      handleVideoCompleted(false);
    // } else if (module.lessons.length > 0) {
    //    first lesson as selected when the module is expanded
    //   setSelectedLesson(module.lessons[0]);
    }
  }, [isExpanded, module]);

  // Check if this is Module 1 and set the default selected lesson
  useEffect(() => {
    console.log('hi')
    if (module.title === "Module 1" && module.lessons.length > 0) {
      console.log(module.lessons[0])
      handleLessonSelect(module.lessons[0]);
    }
  }, [module]);
  const [isFullScreen, setIsFullScreen] = useState(false);

 

  const toggleLesson = (lesson) => {
    handleLessonSelect(lesson);
  };

    const toggleCourseContent = () => {
    setIsCourseContentVisible(!isCourseContentVisible);
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

  const handleViewPdf = (id, uri) => {
    const obj = module.lessons.filter((lesson) => {
      return lesson.id === id;
    });
    // console.log('handleViewPdf ka obj',obj)
    setDoc(() => obj);
    setShowPdf(!showPDF);
    window.open(uri, "_blank");
  };

  const videoUrl = "https://youtu.be/apGV9Kg7ics?si=yP2oeVUi684WxZyg";

  // console.log(module)
  // console.log(module.lessons);
  // console.log('ye document ka doc ha: ',doc && doc[0].doc)

  // console.log(selectedLesson)
  // console.log(selectedLesson && selectedLesson.url)
  return (
    <div className="module-card">
      <div className="module-header" onClick={toggleModule}>
        <div className="module-title-container">
          <h3>{module.title}</h3>
        </div>
        <i
          className={`fas fa-caret-up ${
            isExpanded ? "fa-rotate-180" : ""
          } arrow`}
        ></i>
      </div>
      <Collapse isOpened={isExpanded}>
        <div className="module-list">
          <ul className="module-content">
            {module.lessons.map((lesson) => {
              return (
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
                      <li className="lecture-sno">{lesson.sno}</li>
                      <li className="lecture-name"> {lesson.title}</li>
                      <li>
                        {" "}
                        {/* <i
                          className={`fas fa-caret-up ${
                            isExpanded ? "fa-rotate-180" : ""
                          } arrow`}
                        ></i> */}
                        <i className={`fas fa-thin fa-chevron-down ${isExpanded ?  "fa-rotate-180" : ""}arrow`}></i>
                        
                      </li>
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
                        <div className="lesson-content-container">
                          <div className="lesson-title">
                            <FontAwesomeIcon
                              icon={faCirclePlay}
                              className="my-icon"
                              style={{ marginTop: "3px" }}
                            />
                            <li>{lesson.lecture_name}</li>
                          </div>
                          <div className="lecture-pdf">
                            <i class="fas fa-solid fa-file-pdf"></i>
                            <li
                              onClick={() => {
                                handleViewPdf(lesson.id, lesson.doc[0].uri);
                              }}
                            >
                              <a
                                className="pdf-btn"
                                type="button"
                                href={require("../content/files/third_lec.pdf")}
                                target="_blank"
                              >
                                {lesson.doc_name}
                              </a>
                            </li>
                          </div>
                        </div>
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
              );
            })}
          </ul>
        </div>
      </Collapse>

      {/* ------------------- */}
      {/* <div className="video_player_container_extended_view">
        {selectedLesson && selectedLesson.url (
          <div className="video-player-container">
            {console.log(selectedLesson.url)}
            <ReactPlayer
              url={selectedLesson.url}
              controls={true}
              width="100%"
              height="100%"
              volume={3.5}
              onProgress={handleVideoProgress}
            />
          </div>
        )}
      </div> */}

      {/* ------------ */}
      <div className="document-container">
        {/* {console.log(module.lessons[0].doc)} */}
        {/* {module.lessons.filter((lesson) => { */}
        {/* return ( */}
        {/* showPDF && ( */}
        {/* {console.log('document: ',doc.doc)} */}
        {/* ------------------------------------------- */}
        {/* {doc.length !== 0 && (
          <DocViewer
            key={doc.id} // Assign a unique key
            documents={doc[0].doc} // Use lesson.doc
            pluginRenderers={DocViewerRenderers}
            style={{ height: 500 }}
          />
        )} */}
        {/* -------------------------------------------- */}
        {/* ) */}
        {/* ); */}
        {/* })} */}
      </div>
    </div>
  );
};

export default ModuleCard;

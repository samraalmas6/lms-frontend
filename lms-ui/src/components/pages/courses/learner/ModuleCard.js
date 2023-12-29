import React, { useState, useEffect } from "react";
import Collapse from "react-collapse";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "../../../styles/CourseTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import SingleVideo from "./SingleVideo";
import SingleUnit from "./SingleUnit";

const ModuleCard = ({
  module,
  isExpanded,
  toggleModule,
  handleLessonSelect,
  selectedLesson,
  handleVideoCompleted,
  assignments,
  handleAssignmentClick,
  setShowAssignment,
  videoCompletion,
  unitCompletion,
  setUnitCompletion,
}) => {
  const navigate = useNavigate();
  // const [selectedLesson, setSelectedLesson] = useState(null);
  
  // const []

  useEffect(() => {
    if (!isExpanded) {
      // handleLessonSelect(null);
      handleVideoCompleted(false);
      // } else if (module.lessons.length > 0) {
      //    first lesson as selected when the module is expanded
      //   setSelectedLesson(module.lessons[0]);
    }
  }, [isExpanded, module]);
  const [moduleUnit, setModuleUnit] = useState([]);
  

  useEffect(() => {
    const getCourseData = () => {
      fetch(`http://127.0.0.1:8000/api/modules/${module.id}/units/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Units", result);
            setModuleUnit(result);
          });
        }
      });
    };

    getCourseData();
  }, [0]);





  const [isFullScreen, setIsFullScreen] = useState(false);

  
  // const toggleCourseContent = () => {
  //   setIsCourseContentVisible(!isCourseContentVisible);
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



  // const toggleResources = (lessonId, lessonResources) => {
  //   setLessonResources((prevResources) => ({
  //     ...prevResources,
  //     [lessonId]: !prevResources[lessonId],
  //   }));
  // };

  const videoUrl = "https://youtu.be/apGV9Kg7ics?si=yP2oeVUi684WxZyg";

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
      <Collapse isOpened={isExpanded} className="w-100">
        <div className="module-list">
          <ul className="module-content">
            {moduleUnit.length === 0
              ? "No Unit Found for this Module"
              : moduleUnit &&
                moduleUnit.map((unit, index) => {
                  // const lessonAssignments = unit.assignments || [];
                  return (
                    <SingleUnit unit={unit}  unitCompletion={unitCompletion} selectedLesson={selectedLesson} isExpanded={isExpanded} videoCompletion={videoCompletion} handleLessonSelect={handleLessonSelect} handleAssignmentClick={handleAssignmentClick} setShowAssignment={setShowAssignment} />
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

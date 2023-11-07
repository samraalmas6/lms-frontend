import React, { useState, useEffect } from "react";
import Collapse from "react-collapse";

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "../../../styles/CourseTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

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
  setVideoCompletion,
  unitCompletion,
  setUnitCompletion,
}) => {
  const navigate = useNavigate();
  // const [selectedLesson, setSelectedLesson] = useState(null);
  const [showPDF, setShowPdf] = useState(false);
  const [doc, setDoc] = useState([]);
  const [isCourseContentVisible, setIsCourseContentVisible] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [lessonResources, setLessonResources] = useState({});

  // const[selectModule,setSelectedModule] = useState(null);

  // const [showAssignment, setShowAssignment] = useState(false)

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
  const [unitPDF, setUnitPDF] = useState([]);
  const [unitAssignment, setUnitAssignment] = useState([]);

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

  const handleUnitPDF = (unit) => {
    fetch(`http://127.0.0.1:8000/api/units/${unit.id}/files/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("Units", result);
          setUnitPDF(result);
        });
      } else {
        console.log(response);
      }
    });
    fetch(`http://127.0.0.1:8000/api/units/${unit.id}/assignments/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("Units", result);
          setUnitAssignment(result);
        });
      } else {
        console.log(response);
      }
    });
  };

  // Check if this is Module 1 and set the default selected lesson

  // ***************************** Need changes   ****************************************

  // this function will not be true because module.lessons.length is undefined so it needs to
  // fix.

  // useEffect(() => {
  //   console.log("hi");
  //   if (module.title === "Module 1" && module.lessons.length > 0) {
  //     console.log(module.lessons[0]);
  //     handleLessonSelect(module.lessons[0]);
  //   }
  // }, [module]);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleLesson = (lesson) => {
    fetch(`http://127.0.0.1:8000/api/units/${lesson.id}/videos/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("Api result: ", result[0].video_completed);
          // setUnitCompletion(result[0].video_completed)
          setVideoCompletion(result[0].video_completed);
          handleLessonSelect(result[0]);
        });
      }
    });
  };
  const toggleCourseContent = () => {
    setIsCourseContentVisible(!isCourseContentVisible);
  };
  // const handleAssignmentClick = (assignment) => {
  //   // Handle assignment click here
  //   console.log("Clicked Assignment:", assignment);

  //   // Use the handleAssignmentSelect function passed from CourseTable
  //   setSelectedAssignment(assignment);
  // };

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

  const handleViewPdf = (file) => {
    console.log("pdf url", file);
    // const obj = moduleUnit.filter((unit) => {
    //   return unit.id === id;
    // });
    // console.log('handleViewPdf ka obj',obj)
    setDoc(() => file);
    setShowPdf(!showPDF);
    window.open(file, "_blank");
  };

  const toggleResources = (lessonId, lessonResources) => {
    setLessonResources((prevResources) => ({
      ...prevResources,
      [lessonId]: !prevResources[lessonId],
    }));
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
            {/* {module.lessons.map((lesson) => { */}
            {moduleUnit.length === 0
              ? "No Unit Found for this Module"
              : moduleUnit &&
                moduleUnit.map((unit, index) => {
                  const lessonAssignments = unit.assignments || [];
                  return (
                    <div className="module-content-container" key={unit.id}>
                      <div className="check-box-div">
                        <form onSubmit={(e) => e.preventDefault()}>
                          <input
                            className="checkbox"
                            type="checkbox"
                            id={`lesson-${unit.id}`}
                            name="lesson"
                            // value={`lesson-${unit.id}`}
                            value={unitCompletion}
                            checked={unitCompletion}
                          />
                        </form>
                      </div>
                      <div className="content-inside-container">
                        <li
                          data-bs-toggle="collapse"
                          data-bs-target={`#${unit.id}`}
                          className={`lesson-item ${
                            selectedLesson === unit ? "active" : ""
                          } upper-row`}
                        >
                          <li className="lecture-sno">{index + 1}</li>
                          <li
                            className="lecture-name"
                            onClick={() => {
                              handleUnitPDF(unit)
                              // toggleLesson(unit);
                            }}
                          >
                            {" "}
                            {unit.title}
                          </li>
                          <li>
                            {" "}
                            {/* <i
                          className={`fas fa-caret-up ${
                            isExpanded ? "fa-rotate-180" : ""
                          } arrow`}
                        ></i> */}
                            <i
                              className={`fas fa-thin fa-chevron-down ${
                                isExpanded ? "fa-rotate-180" : ""
                              }arrow`}
                            ></i>
                          </li>
                        </li>
                        <div
                          className={`video-player-icon collapse ${
                            selectedLesson === unit ? "active" : ""
                          }`}
                          id={unit.id}
                        >
                          <li
                            key={unit.id}
                            onClick={() => {
                              toggleLesson(unit);
                            }}
                            data-bs-toggle="collapse"
                            data-bs-target={`#${unit.id}`}
                            className={`lesson-item upper-row`}
                          >
                            <div className="lesson-content-container">
                              <div className="lesson-title">
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  id={`lesson-${unit.id}`}
                                  name="lesson"
                                  // value={`lesson-${unit.id}`}
                                  value={videoCompletion}
                                  checked={videoCompletion}
                                />
                                <FontAwesomeIcon
                                  icon={faCirclePlay}
                                  className="my-icon"
                                  style={{ marginTop: "3px" }}
                                />

                                <li>{unit.title}</li>
                              </div>
                              <div className="lecture-pdf">
                                {unitPDF.length === 0
                                  ? "No Document"
                                  : unitPDF &&
                                    unitPDF.map((pdf) => {
                                      return (
                                        <div
                                          className=""
                                          onClick={() => {
                                            handleViewPdf(pdf.file);
                                            console.log("pdf url ", pdf.file);
                                          }}
                                        >
                                          <i class="fas fa-solid fa-file-pdf"></i>
                                          <li>{pdf.title}</li>
                                        </div>
                                      );
                                    })}
                              </div>
                              <div
                                onClick={() => setShowAssignment((pre) => !pre)}
                              >
                                {unitAssignment.length === 0
                                  ? "No Assignment"
                                  : unitAssignment &&
                                    unitAssignment.map((assignment) => {
                                      return (
                                        <span
                                          onClick={() =>
                                            // navigate("/course/my-assignments")
                                            handleAssignmentClick(assignment)
                                          }
                                        >
                                          {assignment.title}
                                        </span>
                                      );
                                    })}
                              </div>
                            </div>
                          </li>
                          <li>
                            {/* {Array.isArray(assignments) && assignments.length > 0 ? (
            assignments.map((assignment) => (
    <div
      key={assignment.id}
      className={`assignment-item ${
        selectedAssignment === assignment ? "selected" : ""
      }`}
      onClick={() => handleAssignmentClick(assignment)}
    >
      {assignment.title}
    </div>
  ))
) : (
  <p>No assignments available.</p>
)} */}
                          </li>
                          <li>
                            {/* <DocViewer
                          documents={lesson.file_uri}
                          pluginRenderers={DocViewerRenderers}
                          style={{ height: 1000 }}
                        /> */}
                          </li>
                        </div>

                        <div className="lesson-resources">
                          <button
                            onClick={() =>
                              toggleResources("lesson.id, lesson.resources")
                            }
                            className="resource-button"
                          >
                            Resources
                          </button>
                        </div>

                        {lessonResources["lesson.id"] && (
                          <div className="resources-popup">
                            <div className="resources-list">
                              {/* {lesson.resources.map((resource, index) => (
                            <div
                              key={index}
                              className="resource-item"
                            >
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {resource.title}
                              </a>
                            </div>
                          ))} */}
                            </div>
                          </div>
                        )}
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

import React, { useState, useEffect } from "react";
import Collapse from "react-collapse";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "../styles/CourseTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

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
}) => {
  const [showPDF, setShowPdf] = useState(false);
  const [doc, setDoc] = useState([]);
  const [isCourseContentVisible, setIsCourseContentVisible] = useState(true);

  const [lessonResources, setLessonResources] = useState({});

  useEffect(() => {
    if (!isExpanded) {
      handleVideoCompleted(false);
    }
  }, [isExpanded, module]);

  useEffect(() => {
    if (module.title === "Module 1" && module.lessons.length > 0) {
      handleLessonSelect(module.lessons[0]);
    }
  }, [module]);

  const toggleLesson = (lesson) => {
    handleLessonSelect(lesson);
  };

  const handleViewPdf = (id, uri) => {
    const obj = module.lessons.filter((lesson) => {
      return lesson.id === id;
    });

    setDoc(() => obj);
    setShowPdf(!showPDF);
    window.open(uri, "_blank");
  };

  const toggleResources = (lessonId, lessonResources) => {
    setLessonResources((prevResources) => ({
      ...prevResources,
      [lessonId]: !prevResources[lessonId],
    }));
  };

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
              const lessonAssignments = lesson.assignments || [];
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
                        <i
                          className={`fas fa-thin fa-chevron-down ${
                            isExpanded ? "fa-rotate-180" : ""
                          }arrow`}
                        ></i>
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
                            <i className="fas fa-solid fa-file-pdf"></i>
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
                          <div
                            onClick={() => setShowAssignment((pre) => !pre)}
                          >
                            {lesson.assignments &&
                              lesson.assignments.map((assignment) => {
                                return (
                                  <span
                                    onClick={() =>
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
                        {/* You can add your assignment handling code here */}
                      </li>
                      <li>
                        {/* Add the DocViewer component here */}
                      </li>
                    </div>

                    <div className="lesson-resources">
                      <button
                        onClick={() => toggleResources(lesson.id, lesson.resources)}
                        className="resource-button"
                      >
                         Resources
                      </button>
                    </div>

                    {lessonResources[lesson.id] && (
                      <div className="resources-popup">
                        
                        <div className="resources-list">
                          {lesson.resources.map((resource, index) => (
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
                          ))}
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
    </div>
  );
};

export default ModuleCard;




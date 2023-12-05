import React, { useState } from "react";
import SingleVideo from "./SingleVideo";
import { useNavigate } from "react-router-dom";
import SinglePdf from "./SinglePdf";

const SingleUnit = ({
  unit,
  unitCompletion,
  selectedLesson,
  isExpanded,
  videoCompletion,
  handleLessonSelect,
  handleAssignmentClick,
  setShowAssignment,
}) => {
  const navigate = useNavigate();
  const [unitPDF, setUnitPDF] = useState([]);
  const [unitAssignment, setUnitAssignment] = useState([]);
  const [unitResources, setUnitResources] = useState([]);
  const [showResource, setShowResource] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [openUnit, setOpenUnit] = useState("show");

  const handleUnitPDF = (id) => {
    fetch(`http://127.0.0.1:8000/api/units/${id}/files/`, {
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

    fetch(`http://127.0.0.1:8000/api/units/${unit.id}/resources/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("Resources: ", result);
          setUnitResources(result);
        });
      } else {
        console.log(response);
      }
    });
  };
  const handleViewResource = (file) => {
    setShowResource(!showResource);
    window.open(file, "_blank");
  };

  const toggleLesson = (lesson) => {
    fetch(`http://127.0.0.1:8000/api/units/${lesson.id}/videos/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("API result Video =", result);
          setVideoData(result);
          // setUnitCompletion(result[0].video_completed)
          // setVideoCompletion(result[0].video_completed);
          // handleLessonSelect(result[0]);
        });
      }
    });
  };

  const handleOpenCloseUnit = (id) => {
    var collapse = document.getElementById(`${id}`);
    if (collapse && openUnit === "show") {
      collapse.classList.add(openUnit);
      setOpenUnit("remove");
    } else if (openUnit === "remove") {
      collapse.classList.remove("show");
      setOpenUnit("show");
    }
  };

  return (
    <div>
      <div className="module-content-container" key={unit.id}>
        {/* <div className="check-box-div">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className="checkbox"
              type="checkbox"
              id={`lesson-${unit.id}`}
              name="lesson"
              // value={`lesson-${unit.id}`}
              value={unitCompletion}
              checked={unit.completion}
            />
          </form>
        </div> */}
        <div className="content-inside-container">
          <li
            onClick={() => {
              handleOpenCloseUnit(unit.id);
            }}
            // data-bs-toggle="collapse"
            // data-bs-target={`#${unit.id}`}
            className={`lesson-item ${
              selectedLesson === unit ? "active" : ""
            } upper-row`}
          >
            {/* <li className="lecture-sno">{index + 1}</li> */}
            <li
              className="lecture-name"
              onClick={() => {
                handleUnitPDF(unit.id);
                toggleLesson(unit);
              }}
            >
              <div>{unit.title}</div>
              <div>
                <i
                  className={`fas fa-thin fa-chevron-down ${
                    isExpanded ? "fa-rotate-180" : ""
                  }arrow`}
                ></i>
              </div>
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
              // data-bs-toggle="collapse"
              // data-bs-target={`#${unit.id}`}
              className={`lesson-item upper-row`}
            >
              <div className="lesson-content-container">
                {videoData.length !== 0 &&
                  videoData.map((video) => {
                    return (
                      <SingleVideo
                        video={video}
                        videoCompletion={videoCompletion}
                        handleLessonSelect={handleLessonSelect}
                      />
                    );
                  })}

                <div className="lecture-pdf">
                  {unitPDF.length === 0
                    ? "No Document"
                    : unitPDF &&
                      unitPDF.map((pdf) => {
                        return <SinglePdf handleUnitPDF={handleUnitPDF} pdf={pdf} />;
                      })}
                </div>
                <div
                  className="assignment-container"
                  onClick={() => setShowAssignment((pre) => !pre)}
                >
                  {unitAssignment.length === 0
                    ? null
                    : unitAssignment &&
                      unitAssignment.map((assignment) => {
                        return (
                          <div
                            className="NoDoc-pdf-container"
                            onClick={
                              () =>
                                navigate(
                                  `/course/my-assignments/${assignment.id}`,
                                  { state: { assignment: assignment } }
                                )
                              // handleAssignmentClick(assignment)
                            }
                          >
                            <div>
                              <input
                                className="checkbox"
                                type="checkbox"
                                name="lesson-checkbox"
                                checked={assignment.completion}
                              />
                            </div>
                            <i class="far fa-file-alt"></i>
                            <div className="assignment-pdf">
                              {assignment.title.length < 35 ? assignment.title : assignment.title.slice(0,35)+"..."}
                            </div>
                          </div>
                        );
                      })}
                </div>
                {/* -----------xxxxxxxxx-------------- */}
                {/* <div className="additional-resources-container">
                    
                  {unitResources.length === 0
                    ? null
                    : unitResources.map((resource) => {
                        return (
                          <div>
                            <div class="dropdown">
                              <button class="dropbtn"><i class="fas fa-folder"></i> Resources <i class="fas fa-thin fa-chevron-down fa-rotate-180arrow resources-arrow"></i> </button>
                              <div class="dropdown-content">
                              <div>{resource.title}</div>
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                </div> */}
                {/* --------------------------------------- */}
                {unitResources.length !== 0 && 
                                <div class="dropdown">
                                <button class="dropbtn">
                                  <i class="fas fa-folder"></i> Resources
                                  <i class="fas fa-thin fa-chevron-down fa-rotate-180arrow resources-arrow ms-1"></i>
                                </button>
                                <div class="dropdown-content">
                                  {unitResources.length === 0
                                    ? null
                                    : unitResources.map((resource) => {
                                        return (
                                          <div
                                            onClick={() =>
                                              handleViewResource(resource.resource)
                                            }
                                          >
                                            {resource.title}
                                          </div>
                                        );
                                      })}
                                </div>
                              </div>
                }

                {/* --------------------------------------- */}
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUnit;

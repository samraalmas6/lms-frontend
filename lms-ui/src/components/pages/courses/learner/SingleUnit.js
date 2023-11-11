import React, { useState } from "react";
import SingleVideo from "./SingleVideo";

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
  const [unitPDF, setUnitPDF] = useState([]);
  const [unitAssignment, setUnitAssignment] = useState([]);
  const [unitResources, setUnitResources] = useState([]);
  const [showPDF, setShowPdf] = useState(false);
  const [showResource, setShowResource] = useState(false); 
  const [doc, setDoc] = useState([]);
  const [isCourseContentVisible, setIsCourseContentVisible] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [lessonResources, setLessonResources] = useState({});
  const [lectureCompleted, setLectureCompleted] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const handleFileComplete = (file) => {
    let completed = "";
    if (lectureCompleted !== true) {
      completed = file.file_completed;
    } else {
      completed = lectureCompleted;
    }
    const updatedObj = {
      title: file.title,
      instructor: file.instructor,
      unit: file.unit,
      updated_by: sessionStorage.getItem("user_id"),
      file_completed: completed,
    };

    fetch(`http://127.0.0.1:8000/api/files/${file.id}/`, {
      method: "PUT",
      body: JSON.stringify(updatedObj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("updated data: ", result);
        });
      } else {
        console.log(response);
      }
    });
  };

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

    fetch(`http://127.0.0.1:8000/api/units/1/resources/`, {
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

  const handleViewPdf = (file) => {
    console.log("pdf url", file);
    // const obj = moduleUnit.filter((unit) => {
    //   return unit.id === id;
    // });
    // console.log('handleViewPdf ka obj',obj)
    // setDoc(() => file);
    setShowPdf(!showPDF);
    setLectureCompleted(true);
    window.open(file, "_blank");
  };

  const handleViewResource = (file) => {
    alert(file)
    console.log("pdf url", file);
    // const obj = moduleUnit.filter((unit) => {
    //   return unit.id === id;
    // });
    // console.log('handleViewPdf ka obj',obj)
    // setDoc(() => file);
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

  return (
    <div>
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
              checked={unit.unit_completed}
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
            {/* <li className="lecture-sno">{index + 1}</li> */}
            <li
              className="lecture-name"
              onClick={() => {
                handleUnitPDF(unit);
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
              data-bs-toggle="collapse"
              data-bs-target={`#${unit.id}`}
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
                        return (
                          <div
                            className="pdf-doc-container"
                            onClick={() => {
                              handleViewPdf(pdf.file);
                            }}
                          >
                            <div
                              className="check-box-div"
                              onClick={handleFileComplete(pdf)}
                            >
                              <input
                                className="checkbox"
                                type="checkbox"
                                id={pdf.id}
                                name="lesson-checkbox"
                                value={pdf.id}
                                checked={pdf.file_completed}
                              />
                            </div>
                            <i class="fas fa-solid fa-file-pdf"></i>
                            <li>{pdf.title}</li>
                          </div>
                        );
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
                            onClick={() =>
                              // navigate("/course/my-assignments")
                              handleAssignmentClick(assignment)
                            }
                          >
                            <div>
                              <input
                                className="checkbox"
                                type="checkbox"
                                name="lesson-checkbox"
                                checked={assignment.assignment_completed}
                              />
                            </div>
                            <i class="far fa-file-alt"></i>
                            <div className="assignment-pdf">
                              {assignment.title}
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
                <div class="dropdown">
                  <button class="dropbtn">
                    <i class="fas fa-folder"></i> Resources
                    <i class="fas fa-thin fa-chevron-down fa-rotate-180arrow resources-arrow"></i>{" "}
                  </button>
                  <div class="dropdown-content">
                    {unitResources.length === 0
                      ? null
                      : unitResources.map((resource) => {
                          return <div onClick={()=> handleViewResource(resource.resource)}>{resource.title}</div>;
                        })}
                  </div>
                </div>
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

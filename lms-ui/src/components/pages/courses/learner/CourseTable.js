import React, { useState, useEffect } from "react";
import "../../../styles/CourseTable.css";
import VideoPlayer from "./VideoPlayer";

import ModuleCard from "./ModuleCard";
import AssignmentView from "./AssignmentView";
import { useLocation } from "react-router-dom";

// const coursesData = [
//   {
//     id: 1,
//     title: "Cloud Native",
//     modules: [
//       {
//         id: 1,
//         title: "Module 1",
//         lessons: [
//           {
//             id: 1,
//             sno: "1.1",
//             title: "Extreme Programming",
//             lecture_name: "Introduction",
//             url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
//             duration: "7 min",
//             doc_name: "extreme prog doc",
//             doc: [{ uri: require("../../../content/files/MOMS.pdf") }],
//             assignments: [
//               {
//                 id: 1,
//                 title: "Assignment 1",
//                 description: "Complete the first assignment.",
//                 dueDate: "2023-09-30 14:00",
//                 resourceFiles: ["file1.pdf", "file2.doc"],
//                 submissionLinks: [
//                   "https://example.com",
//                   "https://anotherlink.com",
//                 ],
//               },
//             ],
//             // fileType: "pdf",
//             // fileName: "Min of meeting",
//           },
//           {
//             id: 2,
//             sno: "1.2",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "dummy doc",
//             url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
//             duration: "1 hr",
//             doc: [{ uri: require("../../../content/files/MyProjects.pdf") }],
//           },
//         ],
//       },
//       {
//         id: 2,
//         title: "Module 2",
//         lessons: [
//           {
//             id: 3,
//             sno: "1.3",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "lecture 3 doc",
//             url: "https://youtu.be/gwWKnnCMQ5c?si=_av7yUDr5ZKqGbgt",
//             duration: "7 min",
//             doc: [{ uri: require("../../../content/files/third_lec.pdf") }],
//             assignments: [
//               {
//                 id: 1,
//                 title: "Assignment 1",
//                 description: "Complete the first assignment.",
//                 dueDate: "2023-09-30",
//               },
//             ],
//           },
//           {
//             id: 4,
//             sno: "1.4",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "lecture 4 doc",
//             url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
//             duration: "2 hr",
//             doc: [{ uri: require("../../../content/files/fourth_lec.pdf") }],
//           },
//         ],
//       },
//       {
//         id: 3,
//         title: "Module 3: ",
//         lessons: [
//           {
//             id: 1,
//             sno: "1.1",
//             title: "Extreme Programming",
//             lecture_name: "Introduction",
//             url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
//             duration: "7 min",
//             doc_name: "extreme prog doc",
//             doc: [{ uri: require("../../../content/files/MOMS.pdf") }],
//             // fileType: "pdf",
//             // fileName: "Min of meeting",
//           },
//           {
//             id: 2,
//             sno: "1.2",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "dummy doc",
//             url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
//             duration: "1 hr",
//             doc: [{ uri: require("../../../content/files/MyProjects.pdf") }],
//           },
//         ],
//       },
//       {
//         id: 4,
//         title: "Module 4: ",
//         lessons: [
//           {
//             id: 1,
//             sno: "1.1",
//             title: "Extreme Programming",
//             lecture_name: "Introduction",
//             url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
//             duration: "7 min",
//             doc_name: "extreme prog doc",
//             doc: [{ uri: require("../../../content/files/MOMS.pdf") }],
//             // fileType: "pdf",
//             // fileName: "Min of meeting",
//           },
//           {
//             id: 2,
//             sno: "1.2",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "dummy doc",
//             url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
//             duration: "1 hr",
//             doc: [{ uri: require("../../../content/files/MyProjects.pdf") }],
//           },
//         ],
//       },
//       {
//         id: 5,
//         title: "Module 5: ",
//         lessons: [
//           {
//             id: 1,
//             sno: "1.1",
//             title: "Extreme Programming",
//             lecture_name: "Introduction",
//             url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
//             duration: "7 min",
//             doc_name: "extreme prog doc",
//             doc: [{ uri: require("../../../content/files/MOMS.pdf") }],
//             // fileType: "pdf",
//             // fileName: "Min of meeting",
//           },
//           {
//             id: 2,
//             sno: "1.2",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "dummy doc",
//             url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
//             duration: "1 hr",
//             doc: [{ uri: require("../../../content/files/MyProjects.pdf") }],
//           },
//         ],
//       },
//       {
//         id: 6,
//         title: "Module 6: ",
//         lessons: [
//           {
//             id: 1,
//             sno: "1.1",
//             title: "Extreme Programming",
//             lecture_name: "Introduction",
//             url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
//             duration: "7 min",
//             doc_name: "extreme prog doc",
//             doc: [{ uri: require("../../../content/files/MOMS.pdf") }],
//             // fileType: "pdf",
//             // fileName: "Min of meeting",
//           },
//           {
//             id: 2,
//             sno: "1.2",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "dummy doc",
//             url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
//             duration: "1 hr",
//             doc: [{ uri: require("../../../content/files/MyProjects.pdf") }],
//           },
//         ],
//       },
//       {
//         id: 7,
//         title: "Module 7: ",
//         lessons: [
//           {
//             id: 1,
//             sno: "1.1",
//             title: "Extreme Programming",
//             lecture_name: "Introduction",
//             url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
//             duration: "7 min",
//             doc_name: "extreme prog doc",
//             doc: [{ uri: require("../../../content/files/MOMS.pdf") }],
//             // fileType: "pdf",
//             // fileName: "Min of meeting",
//           },
//           {
//             id: 2,
//             sno: "1.2",
//             title: "Lesson Title",
//             lecture_name: "Introduction",
//             doc_name: "dummy doc",
//             url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
//             duration: "1 hr",
//             doc: [{ uri: require("../../../content/files/MyProjects.pdf") }],
//           },
//         ],
//       },
//     ],
//   },
//   // Add more courses and modules as needed
// ];

function CourseTable({ modules, assignments }) {
  const {state} = useLocation();
  
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [isCourseContentVisible, setIsCourseContentVisible] = useState(true);
  const [videoPaneState, setVideoPaneState] = useState("collapsed");
  const [videoProgress, setVideoProgress] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAssignmentDetail, setShowAssignmentDetail] = useState(false);
  const [videoCompletion, setVideoCompletion] = useState(false);
  const [unitCompletion, setUnitCompletion] = useState(false)


  const [showAssignment, setShowAssignment] = useState(false);
  const [courseContent, setCourseContent] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);

  // Load video progress from localStorage when component mounts
  useEffect(() => {
    const storedVideoProgress = JSON.parse(
      localStorage.getItem("videoProgress")
    );
    if (storedVideoProgress) {
      setVideoProgress(storedVideoProgress);
    }

    const getCourseData = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if(response.status === 200){
        response.json().then(function (result) {
          console.log(result);
          setCourseContent(result);
        });
      }
      else{
        console.log(response);
      }
      });
    };

    const getModuleData = () => {
      fetch(`http://127.0.0.1:8000/api/courses/${state.courseId}/modules`, {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if(response.status === 200){
        response.json().then(function (result) {
          console.log(result);
          setModuleContent(result);
        });
      }
      else {
        console.log(response);
      }
      });
    };

    getModuleData();
    getCourseData();
  }, [0]);

  // Save video progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("videoProgress", JSON.stringify(videoProgress));
  }, [videoProgress]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const handleAssignmentSelect = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleAssignmentClick = (assignment) => {
    // Set the selected assignment and show the assignment detail screen
    setSelectedAssignment(assignment);
    setShowAssignmentDetail(true);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleVideoCompleted = (videoState) => {
    setVideoCompleted(videoState);
  };

  const toggleModule = (index) => {
    if (expandedModule === index) {
      setExpandedModule(null);
    } else {
      setExpandedModule(index);
    }
  };

  const toggleCourseContent = () => {
    if (isCourseContentVisible) {
      setVideoPaneState("expanded");
    } else {
      setVideoPaneState("collapsed");
    }
    setIsCourseContentVisible(!isCourseContentVisible);
  };

  // const handleVideoProgress = ({ played, playedSeconds }) => {
  //   // Set a threshold value (e.g., 0.95) to consider the video as completed
  //   if (played >= 0.95 && !videoCompleted) {
  //     // Mark the video as completed
  //     setVideoCompleted(true);

  //     // Use the lesson id to select the corresponding checkbox
  //     const checkboxId = `lesson-${selectedLesson.id}`;
  //     const checkbox = document.getElementById(checkboxId);

  //     // Check the checkbox
  //     if (checkbox) {
  //       checkbox.checked = true;
  //     }
  //   }
  // };
  const handleVideoProgress = ({ progress, played, playedSeconds }) => {

        // Calculate the percentage of video completion
        // const percentage = progress.played * 100;
        // setVideoProgress(percentage);
    
        // // Check if the video is played 90% or more
        // if (percentage >= 90) {
        //   setVideoCompleted(true);
        // }
    // if (selectedLesson) {
    //   setVideoProgress((prevProgress) => ({
    //     ...prevProgress,
    //     [selectedLesson.id]: {
    //       played,
    //       completed: played >= 0.95, // Mark as completed when played >= 0.95
    //     },
    //   }));
    // }
  };

  // Pass the video progress to the VideoPlayer component
  const videoProgressData = selectedLesson && videoProgress[selectedLesson.id];

  return (
    <>
      {showAssignment ? (
        <div>
          <AssignmentView 
          selectedAssignments={selectedAssignment} />
        </div>
      ) : (
        <div className="">
          <div className="main-outer-container">
            <div className={`course-main ${videoPaneState}`}>
              <div className="videos-section">
                <VideoPlayer
                  selectedLesson={selectedLesson}
                  handleVideoProgress={handleVideoProgress}
                  setVideoCompletion={setVideoCompletion}
                />
                {/* tabs below video */}
              </div>

              <div className="tabs-container">
                <ul className="tabs">
                  <li
                    className={activeTab === "Course Content" ? "active" : ""}
                    onClick={() => handleTabChange("Course Content")}
                  >
                    <p
                    // onClick={toggleCourseContent}
                    >
                      Course-Content
                    </p>
                  </li>
                  <li
                    className={activeTab === "Overview" ? "active" : ""}
                    onClick={() => handleTabChange("Overview")}
                  >
                    Overview
                  </li>
                </ul>

                <div className="tab-content">
                  {activeTab === "Course Content" && (
                    <div>
                      {/* Add content for Course Content tab */}
                      <p>Course Content tab.</p>
                    </div>
                  )}

                  {activeTab === "Overview" && (
                    <div>
                      {/* Add content for Overview tab */}
                      <p>Overview tab.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isCourseContentVisible && (
              <div className="App">
                <header className="App_header">
                  <h1>Course Content</h1>
                  <i
                    className="fa fa-times close-icon"
                    aria-hidden="true"
                    onClick={toggleCourseContent}
                  ></i>
                </header>
                <div className="course_list">
                  {/* {coursesData.map((course) => ( */}
                  {/* {courseContent.length === 0 ||
          courseContent.detail == "No objects found"
            ? courseContent.detail
            : courseContent &&
            courseContent.map((course) => ( */}
                  <div key={"course.id"} className="course_card">
                    {/* <h2>{course.title}</h2> */}

                    {moduleContent.length === 0 ||
                    moduleContent.detail === 'No module found for this course.'
                      ? moduleContent.detail
                      : moduleContent &&
                        moduleContent.map((module, index) => (
                          <ModuleCard
                            key={module.id}
                            module={module}
                            isExpanded={index === expandedModule}
                            toggleModule={() => toggleModule(index)}
                            handleLessonSelect={handleLessonSelect}
                            handleVideoCompleted={handleVideoCompleted}
                            assignments={assignments}
                            videoProgressData={videoProgressData}
                            // selectedLesson={selectedLesson}
                            handleAssignmentClick={handleAssignmentClick}
                            setShowAssignment={setShowAssignment}
                            videoCompletion={videoCompletion}
                            setVideoCompletion={setVideoCompleted}
                            unitCompletion={unitCompletion}
                            setUnitCompletion={setUnitCompletion}
                          />
                        ))}
                  </div>
                  {/* ))} */}
                </div>
              </div>
            )}

            {!isCourseContentVisible && (
              // <button type="button" class="expand-view-btn" onClick={toggleCourseContent}>
              //   <i class="fas fa-solid fa-arrow-right fa-rotate-180"></i> Course Content
              //   </button>
              <button
                type="button"
                class="ud-btn ud-btn-large ud-btn-primary ud-heading-md course-content-toggle--button--RLfW6 btn-content"
                onClick={toggleCourseContent}
              >
                <i class="fas fa-solid fa-arrow-right fa-rotate-180"></i>
                <span class="course-content-toggle--label--IP79B">
                  Course content
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="extended-view-container">
        {/* Conditionally render the AssignmentView */}
        {/* Conditionally render the AssignmentView */}
        {/* {selectedAssignment && (
          <AssignmentView
            assignment={selectedAssignment}
            onClose={() => setSelectedAssignment(null)}
          />
        )} */}
      </div>
    </>
  );
}

export default CourseTable;

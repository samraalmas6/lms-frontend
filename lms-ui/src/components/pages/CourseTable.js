import React, { useState, useEffect } from "react";
import "../styles/CourseTable.css";
import VideoPlayer from "./VideoPlayer";
import Navbar from "../content/Navbar";

import ModuleCard from "./ModuleCard";
import AssignmentView from "./AssignmentView"; 



const coursesData = [
  {
    id: 1,
    title: "Cloud Native",
    modules: [
      {
        id: 1,
        title: "Module 1",
        lessons: [
          {
            id: 1,
            sno: "1.1",
            title: "Extreme Programming",
            lecture_name: "Introduction",
            url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
            duration: "7 min",
            doc_name: "extreme prog doc",
            doc: [{ uri: require("../content/files/MOMS.pdf") }],
            resources: [
              {
                title: "Resource 1",
                url: "https://example.com/resource1",
              },
              {
                title: "Resource 2",
                url: "https://example.com/resource2",
              },
            ],
            assignments: [
              {
                id: 1,
                title: "Assignment 1",
                description: "Complete the first assignment.",
                dueDate: "2023-09-30 14:00",
                resourceFiles: ["file1.pdf", "file2.doc"],
                submissionLinks: ["https://example.com", "https://anotherlink.com"],
              },             
            ]
            // fileType: "pdf",
            // fileName: "Min of meeting",
          },
          {
            id: 2,
            sno: "1.2",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "dummy doc",
            url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
            duration: "1 hr",
            doc: [{ uri: require("../content/files/MyProjects.pdf") }],
            resources: [
              {
                title: "Resource 1",
                url: "https://example.com/resource1",
              },
              {
                title: "Resource 2",
                url: "https://example.com/resource2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Module 2",
        lessons: [
          {
            id: 3,
            sno: "1.3",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "lecture 3 doc",
            url: "https://youtu.be/gwWKnnCMQ5c?si=_av7yUDr5ZKqGbgt",
            duration: "7 min",
            doc: [{ uri: require("../content/files/third_lec.pdf") }],
            assignments: [
              {
                id: 1,
                title: 'Assignment 1',
                description: 'Complete the first assignment.',
                dueDate: '2023-09-30'
              }
            ]
          },
          {
            id: 4,
            sno: "1.4",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "lecture 4 doc",
            url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
            duration: "2 hr",
            doc: [{ uri: require("../content/files/fourth_lec.pdf") }],
          },
        ],
      },
      {
        id: 3,
        title: "Module 3: ",
        lessons: [
          {
            id: 1,
            sno: "1.1",
            title: "Extreme Programming",
            lecture_name: "Introduction",
            url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
            duration: "7 min",
            doc_name: "extreme prog doc",
            doc: [{ uri: require("../content/files/MOMS.pdf") }],
            // fileType: "pdf",
            // fileName: "Min of meeting",
          },
          {
            id: 2,
            sno: "1.2",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "dummy doc",
            url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
            duration: "1 hr",
            doc: [{ uri: require("../content/files/MyProjects.pdf") }],
          },
        ],
      },
      {
        id: 4,
        title: "Module 4: ",
        lessons: [
          {
            id: 1,
            sno: "1.1",
            title: "Extreme Programming",
            lecture_name: "Introduction",
            url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
            duration: "7 min",
            doc_name: "extreme prog doc",
            doc: [{ uri: require("../content/files/MOMS.pdf") }],
            // fileType: "pdf",
            // fileName: "Min of meeting",
          },
          {
            id: 2,
            sno: "1.2",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "dummy doc",
            url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
            duration: "1 hr",
            doc: [{ uri: require("../content/files/MyProjects.pdf") }],
          },
        ],
      },
      {
        id: 5,
        title: "Module 5: ",
        lessons: [
          {
            id: 1,
            sno: "1.1",
            title: "Extreme Programming",
            lecture_name: "Introduction",
            url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
            duration: "7 min",
            doc_name: "extreme prog doc",
            doc: [{ uri: require("../content/files/MOMS.pdf") }],
            // fileType: "pdf",
            // fileName: "Min of meeting",
          },
          {
            id: 2,
            sno: "1.2",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "dummy doc",
            url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
            duration: "1 hr",
            doc: [{ uri: require("../content/files/MyProjects.pdf") }],
          },
        ],
      },
      {
        id: 6,
        title: "Module 6: ",
        lessons: [
          {
            id: 1,
            sno: "1.1",
            title: "Extreme Programming",
            lecture_name: "Introduction",
            url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
            duration: "7 min",
            doc_name: "extreme prog doc",
            doc: [{ uri: require("../content/files/MOMS.pdf") }],
            // fileType: "pdf",
            // fileName: "Min of meeting",
          },
          {
            id: 2,
            sno: "1.2",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "dummy doc",
            url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
            duration: "1 hr",
            doc: [{ uri: require("../content/files/MyProjects.pdf") }],
          },
        ],
      },
      {
        id: 7,
        title: "Module 7: ",
        lessons: [
          {
            id: 1,
            sno: "1.1",
            title: "Extreme Programming",
            lecture_name: "Introduction",
            url: "https://youtu.be/apGV9Kg7ics?si=0H7Du27QWZP7DQ6u",
            duration: "7 min",
            doc_name: "extreme prog doc",
            doc: [{ uri: require("../content/files/MOMS.pdf") }],
            // fileType: "pdf",
            // fileName: "Min of meeting",
          },
          {
            id: 2,
            sno: "1.2",
            title: "Lesson Title",
            lecture_name: "Introduction",
            doc_name: "dummy doc",
            url: "https://youtu.be/rZ41y93P2Qo?si=FEzJeeSY_baszCQ4",
            duration: "1 hr",
            doc: [{ uri: require("../content/files/MyProjects.pdf") }],
          },
        ],
      },
    ],
  },
  // Add more courses and modules as needed
];

function CourseTable({ modules, assignments }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [extendedView, setExtendedView] = useState(false);
  const [isCourseContentVisible, setIsCourseContentVisible] = useState(true);
  const [videoPaneState, setVideoPaneState] = useState('collapsed');
  const [videoProgress, setVideoProgress] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showAssignmentDetail, setShowAssignmentDetail] = useState(false);

  const [showAssignment, setShowAssignment] = useState(false)

// Load video progress from localStorage when component mounts
useEffect(() => {
  const storedVideoProgress = JSON.parse(localStorage.getItem("videoProgress"));
  if (storedVideoProgress) {
    setVideoProgress(storedVideoProgress);
  }
}, []);

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

  const handleExtendedView = () => {
    setExtendedView(!extendedView);
  };

  const toggleCourseContent = () => {
    if(isCourseContentVisible) {
      setVideoPaneState('expanded')
    }
    else {
      setVideoPaneState('collapsed')
    }
    setIsCourseContentVisible(!isCourseContentVisible);
  };

  const handleVideoProgress = ({ played, playedSeconds }) => {
    // Set a threshold value (e.g., 0.95) to consider the video as completed
    if (played >= 0.95 && !videoCompleted) {
      // Mark the video as completed
      setVideoCompleted(true);

      // Use the lesson id to select the corresponding checkbox
      const checkboxId = `lesson-${selectedLesson.id}`;
      const checkbox = document.getElementById(checkboxId);

      // Check the checkbox
      if (checkbox) {
        checkbox.checked = true;
      }
    }
  };
  // const handleVideoProgress = ({ played, playedSeconds }) => {
  //   if (selectedLesson) {
  //     setVideoProgress((prevProgress) => ({
  //       ...prevProgress,
  //       [selectedLesson.id]: {
  //         played,
  //         completed: played >= 0.95, // Mark as completed when played >= 0.95
  //       },
  
  //     }));
  //   }
  // };

  // Pass the video progress to the VideoPlayer component
  const videoProgressData =
    selectedLesson && videoProgress[selectedLesson.id];

  return (
    <>
      <div className="main-outer-container">
        <div className={`course-main ${videoPaneState}`}>
        { showAssignment ? <div>
           <AssignmentView selectedAssignments={selectedAssignment} />
          </div> :
          <div className="video-section">
            <VideoPlayer
              selectedLesson={selectedLesson}
              handleVideoProgress={handleVideoProgress}
            />

            {/* <h1>video container</h1> */}
            {/* <div className="video_player_container"> */}
            {/* <VideoPlayer selectedLesson={selectedLesson} /> */}
            {/* </div> */}
            {/* tabs below video */}
          </div>
  }
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
              {coursesData.map((course) => (
                <div key={course.id} className="course_card">
                  {/* <h2>{course.title}</h2> */}
                  {course.modules.map((module, index) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      isExpanded={index === expandedModule}
                      toggleModule={() => toggleModule(index)}
                      handleLessonSelect={handleLessonSelect}
                      handleVideoCompleted={handleVideoCompleted}
                      assignments={assignments}
                      videoProgressData={videoProgressData} 
                      handleAssignmentClick={handleAssignmentClick}
                      setShowAssignment={setShowAssignment}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        
        {!isCourseContentVisible && 
        <button onClick={toggleCourseContent}>
          return 
          </button>}
      </div>
      <div className="extended-view-container">
      
        {/* Conditionally render the AssignmentView */}
       {/* Conditionally render the AssignmentView */}
       {selectedAssignment && (
          <AssignmentView
            assignment={selectedAssignment}
            onClose={() => setSelectedAssignment(null)}
          />
        )}
      </div>
     
    </>
  );
}

export default CourseTable;

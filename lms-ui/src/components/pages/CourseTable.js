import React, { useState } from "react";
import "../styles/CourseTable.css";
import VideoPlayer from "./VideoPlayer";
import Navbar from "../content/Navbar";

import ModuleCard from "./ModuleCard";

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

function CourseTable() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [extendedView, setExtendedView] = useState(false);
  const [isCourseContentVisible, setIsCourseContentVisible] = useState(true);
  const [videoPaneState, setVideoPaneState] = useState('collapsed')

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
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

  return (
    <>
      <div className="main-outer-container">
        <div className={`course-main ${videoPaneState}`}>
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
      <div className="extended-view-container"></div>
    </>
  );
}

export default CourseTable;

import React from "react";
import "../styles/CourseTable.css";

import ModuleCard from "./ModuleCard";

const coursesData = [
  {
    id: 1,
    title: "Course 1",
    modules: [
      {
        id: 1,
        title: "Module 1",
        lessons: [
          { id: 1, title: "Lesson 1.1", videoId: "your-youtube-video-id-1" },
          { id: 2, title: "Lesson 1.2", videoId: "your-youtube-video-id-2" },
        ],
      },
      {
        id: 2,
        title: "Module 2",
        lessons: [
          { id: 3, title: "Lesson 2.1", videoId: "your-youtube-video-id-3" },
          { id: 4, title: "Lesson 2.2", videoId: "your-youtube-video-id-4" },
        ],
      },
    ],
  },
  // Add more courses and modules as needed
];

function CourseTable() {
  return (
    <>
      {/* nav */}
      <div className="course-nav"></div>
      {/* sidebar div */}
      <div className="main-outer-container">
        {/* main-div*/}
        <div className="course-main">
          <h1>main central video div</h1>
        </div>
        <div className="App">
          <header className="App_header">
            <h1>Course Content</h1>
          </header>
          <div className="course_list">
            {coursesData.map((course) => (
              <div key={course.id} className="course_card">
                <h2>{course.title}</h2>
                {course.modules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseTable;

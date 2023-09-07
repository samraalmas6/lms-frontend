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
          { id: 1,sno:"1.1", title: "Lesson Title", videoId: "your-youtube-video-id-1" , duration:"7 min"},
          { id: 2, sno:"1.2", title: "Lesson Title", videoId: "your-youtube-video-id-2",duration:"7 min" },
        ],
      },
      {
        id: 2,
        title: "Module 2",
        lessons: [
          { id: 3, sno:"1.3", title: "Lesson Title", videoId: "your-youtube-video-id-3",duration:"7 min" },
          { id: 4, sno:"1.4", title: "Lesson Title", videoId: "your-youtube-video-id-4", },
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
          <i class="fa fa-times close-icon" aria-hidden="true"></i>
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

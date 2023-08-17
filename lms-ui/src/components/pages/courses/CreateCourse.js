import React, { useState } from "react";
import CourseModule from "./CourseModule";
import "../../styles/Courses.css";

const CreateCourse = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  const [courseTitle, setCourseTitle] = useState("");
  const [courseStart, setCourseStart] = useState(minDate);
  const [courseEnd, setCourseEnd] = useState("2025-12-30");

  const [showModule, setShowModule] = useState(false);
  const [moduleData, setModuleData] = useState([]);

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };
  const handleCourseStart = (e) => {
    setCourseStart(e.target.value);
  };
  const handleCourseEnd = (e) => {
    setCourseEnd(e.target.value);
  };

  return (
    <div>
      <h1>New Course</h1>

      <button
        type="button"
        className="btn btn-primary w-100"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        Create Course +
      </button>
      <div
        id="collapseOne"
        className="collapse "
        data-bs-parent="#accordionExample"
      >
        <div className="course-main">
          <form className="course-create-form">
            <div className="course-title">
              <label>Course Name:</label>
              <input
                type="text"
                placeholder="Course Title"
                value={courseTitle}
                onChange={handleCourseTitle}
              />
            </div>
            <div className="course-start">
              <label>Course Start Date:</label>
              <input
                type="date"
                placeholder="Start Date"
                min={minDate}
                value={courseStart}
                onChange={handleCourseStart}
              />
            </div>
            <div className="course-end">
              <label>Course End Date:</label>
              <input
                type="date"
                max="2030-12-30"
                min={minDate}
                placeholder="End Date"
                value={courseEnd}
                onChange={handleCourseEnd}
              />
            </div>
          </form>
          <ul>
            {moduleData
              ? moduleData.map((data) => {
                  return (
                    <div key={data.moduleTitle}>
                      <li>{data.moduleTitle}</li>
                    </div>
                  );
                })
              : ""}
          </ul>
          <div className="course-module-section">
            <div>
            <button
              type="button"
              className="btn btn-secondary w-50"
              onClick={() => setShowModule((pre) => !pre)}
            >
              Add Module
            </button>
            {showModule && (
              <CourseModule
                setModuleData={setModuleData}
                setShowModule={setShowModule}
                minDate={minDate}
              />
            )}
            </div>
          </div>

          <div className="add-course-btn">
            <button type="button" className="btn btn-outline-primary">
              Create Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;

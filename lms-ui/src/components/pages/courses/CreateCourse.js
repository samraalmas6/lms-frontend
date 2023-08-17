import React, { useState } from "react";
import CourseModule from './CourseModule'
import '../../styles/Courses.css'

const CreateCourse = () => {
  const [showModule, setShowModule] = useState(false)
  const [moduleData, setModuleData] = useState([])
 
  return (
    <div>
      <h1>New Course</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
             Create Course +
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <form className="course-create-form">
                <label>
                  Course Name
                  <input type="text" placeholder="Course Title" />
                </label>
                <label>
                  Course Start Date
                  <input type="date" placeholder="Start Date" />
                </label>
                <label>
                  Course End Date
                  <input type="date" placeholder="End Date" />
                </label>
              </form>
              <ul>
              {moduleData ? moduleData.map(data => {
                return(
                <div key={data.moduleTitle}>
                  <li>{data.moduleTitle}</li>
                </div>)
                
              }): ''}
              </ul>

              <button type="button" onClick={() => setShowModule(pre => !pre)}>Add Module</button>
               {showModule && <CourseModule setModuleData={setModuleData} setShowModule={setShowModule} />}
               <button type="button">Create Course</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;

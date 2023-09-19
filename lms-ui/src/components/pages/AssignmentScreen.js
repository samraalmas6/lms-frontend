import React from "react";
import AssignmentPartners from "../content/AssignmentPartners";
import "../styles/AssignmentScreen.css";
import { useState } from "react";
import AssigDesc from "../content/AssigDesc";

const AssignmentScreen = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  const [showComp, setShowComp] = useState(false);
  const [courseEnd, setCourseEnd] = useState("2025-12-30");


  const handleClick = () => {
    console.log("button is pressed");
    setShowComp(true);
  };

  const handleCourseEnd = (e) => {
    setCourseEnd(e.target.value);
  };

  return (
    <div>
      <div className="main-container">
        <div className="assignment-details">
          {/* <p>title</p>
          <p>description</p>
          <p>attach file</p> */}
          <form>
            <input type="text" placeholder="Title" />
          </form>
          <div className="editor">
            <AssigDesc />
          </div>
        </div>
        <div className="side-container">
          <div className="due-date-and-time">
            {/* <p>due date</p> */}
            <div className="course-end">
              <label>Due Date:</label>
              <input
                type="date"
                // max="2030-12-30"
                // min={minDate}
                // placeholder="Due Date"
                value={courseEnd}
                onChange={handleCourseEnd}
              />
            </div>
            {/* <p>Due time</p> */}
            <div className="course-end">
              <label>Due Time:</label>
              <input
                type="time"
                // max="2030-12-30"
                // min={minDate}
                value={courseEnd}
                onChange={handleCourseEnd}
              />
            </div>
          </div>
          <div className="marks">
            <p>marks</p>
          </div>
          <div className="assignment-partners">
            <h2>Assignment Partners</h2>
            <div>
              <button onClick={handleClick}>
                <i class=" fas fa-solid fa-plus"></i>
              </button>
              {showComp && <AssignmentPartners />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentScreen;

import React from "react";
import AssignmentPartners from "../content/AssignmentPartners";
import "../styles/AssignmentScreen.css";
import { useState } from "react";
import AssigDesc from "../content/AssigDesc";
import UploadPicture from "./UploadPicture";
import FileUploadComponent from "../content/FileUploadComponent";

const AssignmentScreen = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  const [showComp, setShowComp] = useState(false);
  const [courseStart, setCourseStart] = useState(minDate);
  const [courseEnd, setCourseEnd] = useState("");
  const [showAttachFile, setShowFileAttach] = useState(false);

  const handleClick = () => {
    console.log("button is pressed");
    setShowComp(!showComp);
  };

  const handleCourseStart = (e) => {
    setCourseStart(e.target.value);
  };

  const handleCourseEnd = (e) => {
    setCourseEnd(e.target.value);
  };

  const handleFileAttachment = () => {
    setShowFileAttach(true);
  };

  return (
    <div>
      <div className="main-container">
        <div className="assignment-details">
          {/* <p>title</p>
          <p>description</p>
          <p>attach file</p> */}
          <form>
          <i class='fas fa-pen'></i>
            <input type="text" placeholder="Title" />
          </form>
          <div className="editor">
            <AssigDesc />
          </div>
          <div className="file">
            <FileUploadComponent />
          </div>
        </div>
        <div className="side-container">
          <div className="due-date-and-time">
            {/* <p>due date</p> */}

            <div className="due-date-time">
              {/* <label>Due Date:</label> */}
              <i class='fas fa-calendar-alt'></i>
              <input
                type="date"
                placeholder="Start Date"
                min={minDate}
                value={courseStart}
                onChange={handleCourseStart}
              />
            </div>
            {/* <p>Due time</p> */}
            <div className="due-date-time">
              {/* <label>Due Time:</label> */}
              <i class='far fa-clock'></i>
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
          <i class="fas fa-thin fa-star fa-lg"></i>
            <input type="text" placeholder="Enter Marks" />
          </div>
          <div className="assignment-partners">
            <div className="heading-container">
            <h3>Assignment Partners</h3>
            {/* <button onClick={handleClick}> */}
                {/* <i class=" fas fa-solid fa-plus"></i> */}
                <div className="user-icon"  onClick={handleClick}>
                <i class="fas fa-thin fa-user-plus"></i>
              </div>
              {/* </button> */}
            </div>
            {showComp && 
              <>
             <AssignmentPartners />
             </>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentScreen;

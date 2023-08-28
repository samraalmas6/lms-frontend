import React, { useRef, useState } from "react";
import CourseModule from "./CourseModule";

const LeasonForm = ({ setUnitData, handleAddModule }) => {
  const [unitTitle, setUnitTitle] = useState("");
  const [unitContent, setUnitContent] = useState([]);
  const slideRef = useRef('')

  const handleSlideInput = () => {
    slideRef.current.click()
  }
  const handleUploadSlide = (e) => {
    console.log(e.target.files[0]);
  }

  const handleUnitTitle = (e) => {
    setUnitTitle(e.target.value);
  };

  const handleUnitContent = (e) => {
    setUnitContent(e.target.value);
  };

  const handleAddUnit = (e) => {
    e.preventDefault();
    setUnitData((pre) => [...pre, { unitTitle }]);
    setUnitTitle("");
    handleAddModule();
  };
  console.log();
  return (
    <div>
      <form className="course-unit-form">
        <div className="unit-title">
          <label className="course-unit-form-label">Unit Name </label>
          <input
            type="text"
            placeholder="Unit Title"
            value={unitTitle}
            onChange={handleUnitTitle}
          />
        </div>
        <div className="unit-video">
          <label className="course-unit-form-label">Add Video </label>
          <input
            type="file"
            value={unitTitle}
            onChange={handleUnitTitle}
          />
        </div>
        <div className="unit-slide">
          <label className="course-unit-form-label" onClick={handleSlideInput}>Add slide
          
           </label><input
            type="file"
            ref={slideRef}
            style={{display:"none"}}
            onChange={handleUploadSlide}

          />
        </div>
        <div className="unit-pdf">
          <label className="course-unit-form-label">Add PDF </label>
          <input
            type="file"
            value={unitTitle}
            onChange={handleUnitTitle}
          />
        </div>

        <div className="unit-content">
          <label className="course-unit-content-label">Contents</label>

          <select value={unitContent} onChange={handleUnitContent}>
            <option value="">---Add content---</option>
            <option value="Video">Add Video</option>
            <option value="Audio">Add Audio</option>
            <option value="PPT">Add PPT</option>
            <option value="PDF">Add PDF</option>
            <option value="Quiz">Add Quiz</option>
            <option value="Assignment">Add Assignment</option>
          </select>
        </div>
   
        <div className="save-module-btn-container">
          <button type="button" onClick={handleAddUnit}>
            Save Module
          </button>
        </div>
      </form>
      {/* <button type="button" onClick={() => setShowModule(true)}>Add Module</button> */}
      {/* {showModule && <CourseModule />} */}
    </div>
  );
};

export default LeasonForm;

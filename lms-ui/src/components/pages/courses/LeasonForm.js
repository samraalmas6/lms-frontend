import React, { useRef, useState } from "react";
import CourseModule from "./CourseModule";

const LeasonForm = ({ setUnitData, handleAddModule, minDate }) => {
  const [unitTitle, setUnitTitle] = useState("");
  const [unitVideo, setUnitVideo] = useState('')
  const [unitPdf, setUnitPdf] = useState('')
  const [unitPpt, setUintPpt] = useState('')
  const [unitAssignment, setUnitAssignment] = useState(null)
  const [unitQuiz, setUnitQuiz] = useState(null)
  const [unitReadingResource, setUnitReadingResource] = useState([])
  const [unitContent, setUnitContent] = useState([]);
  const [unitStart, setUnitStart] = useState('')
  const [unitEnd, setUnitEnd] = useState('')

  const pdfRef = useRef(null)
  const pptRef = useRef(null)
  const quizRef = useRef(null)
  const assignmentRef = useRef(null)



  const slideRef = useRef('')

  const handleSlideInput = () => {
    slideRef.current.click()
  }
  const handleUnitTitle = (e) => {
    setUnitTitle(e.target.value);
  };
  const handleUnitVideo = (e) => {
    setUnitVideo(e.target.value);
  };
  const handleUnitPdf = (e) => {
    setUnitPdf(e.target.files[0]);
  };
  const handleUnitPpt = (e) => {
    setUintPpt(e.target.value);
  };
  const handleUnitAssingment = (e) => {
    setUnitAssignment(e.target.value);
  };
  const handleUnitQuiz = (e) => {
    setUnitQuiz(e.target.value);
  };
  const handleUnitReadingResource = (e) => {
    setUnitReadingResource(e.target.value)
  }
  const handleUnitStart = (e) => {
    setUnitStart(e.target.value)
  }
  const handleUnitEnd = (e) => {
    setUnitEnd(e.target.value)
  }
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
        <div className="unit-start">
            <label>Unit Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={unitStart}
              min={minDate}
              onChange={handleUnitStart}
            />
          </div>
          <div className="unit-end">
            <label>Unit End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={unitEnd}
              max="2030-12-30" 
              min={minDate}
              onChange={handleUnitEnd}
            />
          </div>
        <div className="unit-video">
          <label className="course-unit-form-label">Add Video </label>
          <input
            type="url"
            value={unitVideo}
            placeholder="Upload Video Url Here"
            onChange={handleUnitVideo}
          />
        </div>
        <div className="unit-slide">
          <label className="course-unit-form-label">Add slide</label>
          <span onClick={() => pptRef.current.click()}>{unitPpt ? unitPpt.name : 'No PPT Selected'}</span>
          <input
            type="file"
            accept=".ppt"
            ref={pptRef}
            value={unitPpt}
            style={{ display: 'none' }}
            onChange={handleUnitPpt}
          />
        </div>
        <div className="unit-pdf">
          <label className="course-unit-form-label">Add PDF </label>
          <span onClick={() => pdfRef.current.click()}>{unitPdf ? unitPdf[0].name : 'No PDF Selected'}</span>
          <input
            type="file"
            accept=".pdf"
            ref={pdfRef}
            value={unitPdf}
            style={{ display: 'none' }}
            onChange={handleUnitPdf}
          />
        </div>
        <div className="unit-assignment">
          <label className="course-unit-form-label">Add Assignment </label>
          <span onClick={() => assignmentRef.current.click()}>{unitAssignment ? unitAssignment : 'No Assignment Selected'}</span>
          <input
            type="file"
            ref={assignmentRef}
            value={unitAssignment}
            style={{ display: 'none' }}
            onChange={handleUnitAssingment}
          />
        </div>
        <div className="unit-quiz">
          <label className="course-unit-form-label">Add Quiz </label>
          <span onClick={() => quizRef.current.click()}>{unitQuiz ? unitQuiz : 'No Quiz Selected'}</span>
          <input
            type="file"
            ref={quizRef}
            value={unitQuiz}
            style={{ display: 'none' }}
            onChange={handleUnitQuiz}
          />
        </div>
        <div className="unit-quiz">
          <label className="course-unit-form-label">Resource Link</label>
          <input
            type="url"
            placeholder="Reading Resources Link"
            value={unitReadingResource}
            onChange={handleUnitReadingResource}
          />
        </div>
   
        <div className="save-module-btn-container">
          <button type="button" onClick={handleAddUnit}>
            Save Unit
          </button>
        </div>
      </form>
      {/* <button type="button" onClick={() => setShowModule(true)}>Add Module</button> */}
      {/* {showModule && <CourseModule />} */}
    </div>
  );
};

export default LeasonForm;

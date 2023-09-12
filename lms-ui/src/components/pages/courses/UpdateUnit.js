import React, { useEffect, useRef, useState } from 'react'

const UpdateUnit = ({ setUnitData, unitContent, minDate }) => {

    const [unitTitle, setUnitTitle] = useState("");
    const [unitVideo, setUnitVideo] = useState("");
    const [unitPdf, setUnitPdf] = useState("");
    const [unitPpt, setUintPpt] = useState("");
    const [unitAssignment, setUnitAssignment] = useState(null);
    const [unitQuiz, setUnitQuiz] = useState(null);
    const [unitReadingResource, setUnitReadingResource] = useState([]);
    const [unitStart, setUnitStart] = useState("");
    const [unitEnd, setUnitEnd] = useState("");
    const [visibility, setVisibility] = useState(false);
  
  
    const pdfRef = useRef(null);
    const pptRef = useRef(null);
    const quizRef = useRef(null);
    const assignmentRef = useRef(null);
  
  useEffect(() => {
    if (unitContent && unitContent !== 'undefined' ){
        setUnitTitle(unitContent.title)
        setUnitStart(unitContent.start_date)
        setUnitEnd(unitContent.end_date)
        setUintPpt(unitContent.ppt)
        setUnitPdf(unitContent.pdf)
        setUnitAssignment(unitContent.assignment)
        setUnitQuiz(unitContent.quiz)
        setUnitVideo(unitContent.video)
        setVisibility(unitContent.visibility)
    }
  },[unitContent])
 
    const handleUnitTitle = (e) => {
      setUnitTitle(e.target.value);
    };
    const handleUnitVideo = (e) => {
      setUnitVideo(e.target.value);
    };
    const handleUnitPdf = (e) => {
      let file = e.target.files[0];
      setUnitPdf(file);
    };
    const handleUnitPpt = (e) => {
      setUintPpt(e.target.files[0]);
    };
    const handleUnitAssingment = (e) => {
      setUnitAssignment(e.target.files[0]);
    };
    const handleUnitQuiz = (e) => {
      setUnitQuiz(e.target.files[0]);
    };
    const handleUnitReadingResource = (e) => {
      setUnitReadingResource(e.target.value);
    };
    const handleVisibility = (e) => {
      setVisibility(e.target.value);
    };
    const handleUnitStart = (e) => {
      setUnitStart(e.target.value);
    };
    const handleUnitEnd = (e) => {
      setUnitEnd(e.target.value);
    };
    
    console.log('unitContent',unitContent);
    const handleAddUnit = (e) => {
        e.preventDefault();
        const obj = {
          id: Math.floor(Math.random() * 1000),
          title: unitTitle,
          start_date: unitStart,
          end_date: unitEnd,
          video: unitVideo,
          ppt: unitPpt,
          pdf: unitPdf,
          assignment: unitAssignment,
          quiz: unitQuiz,
          visibility,
        };
        setUnitData((pre) => [...pre, obj]);
        setUnitTitle("");
        setUnitStart("");
        setUnitEnd("");
        setUnitVideo("");
        setUintPpt("");
        setUnitPdf("");
        setUnitAssignment("");
        setUnitQuiz("");
        setVisibility(false);
        // setShowForm(!showForm)
        // setShowUnit((pre) => !pre)
        // setShowModule(pre => !pre)
        // handleAddModule();
      };

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
          <span onClick={() => pptRef.current.click()}>
            {unitPpt ? unitPpt.name : "No PPT Selected"}
          </span>
          <input
            type="file"
            accept=".ppt"
            ref={pptRef}
            style={{ display: "none" }}
            onChange={handleUnitPpt}
          />
        </div>
        <div className="unit-pdf">
          <label className="course-unit-form-label">Add PDF </label>
          <span onClick={() => pdfRef.current.click()}>
            {unitPdf ? unitPdf.name : "No PDF Selected"}
          </span>
          <input
            type="file"
            accept=".pdf"
            ref={pdfRef}
            style={{ display: "none" }}
            onChange={handleUnitPdf}
          />
        </div>
        <div className="unit-assignment">
          <label className="course-unit-form-label">Add Assignment </label>
          <span onClick={() => assignmentRef.current.click()}>
            {unitAssignment ? unitAssignment.name : "No Assignment Selected"}
          </span>
          <input
            type="file"
            ref={assignmentRef}
            style={{ display: "none" }}
            onChange={handleUnitAssingment}
          />
        </div>
        <div className="unit-quiz">
          <label className="course-unit-form-label">Add Quiz </label>
          <span onClick={() => quizRef.current.click()}>
            {unitQuiz ? unitQuiz.name : "No Quiz Selected"}
          </span>
          <input
            type="file"
            ref={quizRef}
            style={{ display: "none" }}
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
        <div className="form-check form-switch visibility">
          <label htmlFor="IsActive" className=" course-unit-form-label">
            Visibility
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            value={visibility}
            onChange={handleVisibility}
            id="flexSwitchCheckDefault"
          />
        </div>

        <div className="save-module-btn-container">
          <button type="button" onClick={handleAddUnit}>
            Save Unit
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateUnit

import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";

const UpdateUnit = ({ setShowUnit, setUnitData, unitContent, minDate }) => {
  const editorRef = useRef(null);

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

  const [showAssignmentContent, setShowAssignmentContent] = useState("");

  const pdfRef = useRef(null);
  const pptRef = useRef(null);
  const quizRef = useRef(null);
  const assignmentRef = useRef(null);
  const unitForm = useRef(null);

  useEffect(() => {
    if (unitContent && unitContent !== "undefined") {
      setUnitTitle(unitContent.title);
      setUnitStart(unitContent.start_date);
      setUnitEnd(unitContent.end_date);
      setUintPpt(unitContent.ppt);
      setUnitPdf(unitContent.pdf);
      setUnitAssignment(unitContent.assignment);
      setUnitQuiz(unitContent.quiz);
      setUnitVideo(unitContent.video);
      setVisibility(unitContent.visibility);
    }
  }, [unitContent]);

  const showAssignment = () => {
    setShowAssignmentContent("show");
  };

  const handleUnitTitle = (e) => {
    setUnitTitle(e.target.value);
  };
  const handleUnitVideo = (e) => {
    setUnitVideo(e.target.value);
  };
  const handleUnitPdf = (e) => {
    let file = e.target.files[0];
    console.log(file);
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

  console.log("unitContent", unitContent);
  const handleAddUnit = (e) => {
    e.preventDefault();
    if (unitTitle) {
      const obj = {
        title: unitTitle,
        description: "this is test descripion",
        start_date: unitStart,
        end_date: unitEnd,
        module: 1,
        updated_by: 1
      };

      fetch("http://127.0.0.1:8000/api/units/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status == 201) {
          response.json().then(function (result) {
            console.log(result);
            setUnitTitle("");
            setUnitStart("");
            setUnitEnd("");
            setUnitVideo("");
            setUintPpt("");
            setUnitPdf("");
            setUnitAssignment("");
            setUnitQuiz("");
            setVisibility(false);
            // window.location.reload();
            setShowUnit((pre) => !pre);
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  return (
    <div>
      <form className="course-unit-form" onSubmit={(e) => e.preventDefault()}>
        <div className="unit-title">
          <label className="course-unit-form-label">Unit Name </label>
          <input
            type="text"
            placeholder="Unit Title"
            value={unitTitle}
            onChange={handleUnitTitle}
            required
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
        <div className="unit-content-section">
          <p
            className="text-center w-50"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseUnitContent"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add Unit contents
          </p>
        </div>
        <div className="collapse" id="collapseUnitContent">
        <div className="unit-video">
          <label className="course-unit-form-label">Add Video </label>
          <input
            type="url"
            value={unitVideo}
            placeholder="Upload Video Url Here"
            onChange={handleUnitVideo}
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
        <div className="unit-slide">
          <label className="course-unit-form-label">Add slide</label>
          <i
            className="fas fa-solid fa-pls"
            onClick={() => pptRef.current.click()}
          >
            {unitPpt ? unitPpt.name : "No PPT Selected"}
            {/* Upload Slides */}
          </i>
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
          <i
            className="fas fa-solid fa-plu"
            onClick={() => pdfRef.current.click()}
          >
            {unitPdf ? unitPdf.name : "No PDF Selected"}
            {/* Upload PDF */}
          </i>
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
          <i
            className="fas fa-solid fa-plu"
            onClick={() => assignmentRef.current.click()}
          >
            {/* {unitAssignment ? unitAssignment.name : "No Assignment Selected"} */}
            Upload Assignment
          </i>
          <button
            type="button"
            ref={assignmentRef}
            style={{ display: "none" }}
            onClick={showAssignment}
          />
        </div>
        <div className="unit-quiz">
          <label className="course-unit-form-label">Add Quiz </label>
          <i
            className="fas fa-solid fa-pls"
            onClick={() => quizRef.current.click()}
            style={{ cursor: "not-allowed", color: "red" }}
          >
            {unitQuiz ? unitQuiz.name : "Not Allowed"}
          </i>
          <input
            type="file"
            ref={quizRef}
            style={{ display: "none" }}
            onChange={handleUnitQuiz}
            disabled
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
        </div>


        <div className="save-module-btn-container">
          <button
            type="submit"
            onClick={(e) => {
              unitForm.current.click();
              handleAddUnit(e);
            }}
          >
            Save Unit
          </button>
        </div>
        <button
          type="button"
          style={{ display: "none" }}
          ref={unitForm}
        ></button>
      </form>

      <div
        className={`offcanvas offcanvas-top module-list-show ${showAssignmentContent}`}
        id="show-unit"
        tabindex="-1"
      >
        <div className="module-content-section">
          <div className="content">
            <div
              className={"styles.addBtnSection"}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>Add Assignment</h3>
              <button
                type="button"
                onClick={() => setShowAssignmentContent("")}
                className="btn btn-close text-danger"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUnit;

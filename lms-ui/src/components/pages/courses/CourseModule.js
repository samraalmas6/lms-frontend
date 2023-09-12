import React, { useState } from "react";
import LeasonForm from "./LeasonForm";

const Module = ({
  moduleData,
  setModuleData,
  setShowModule,
  minDate,
  unitData,
  setUnitData,
}) => {
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleStart, setModuleStart] = useState("");
  const [moduleEnd, setModuleEnd] = useState("");
  const [visibility, setVisibility] = useState(false);

  const [show, setShow] = useState(false);
  const [moduleContent, setModuelContent] = useState([]);

  const [showUnit, setShowUnit] = useState(false);

  const showModuleList = () => {
    setShow("show");
  };
  const handleModuleTitle = (e) => {
    setModuleTitle(e.target.value);
  };
  const handleModuleStart = (e) => {
    setModuleStart(e.target.value);
  };
  const handleModuleEnd = (e) => {
    setModuleEnd(e.target.value);
  };
  const handleVisibility = (e) => {
    setVisibility(e.target.value);
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    const obj = {
      id: Math.floor(Math.random() * 1000),
      title: moduleTitle,
      start_date: moduleStart,
      end_date: moduleEnd,
      unit: unitData,
    };
    setModuleData((pre) => [...pre, obj]);
    setModuleTitle("");
    setModuleStart("");
    setModuleEnd("");
    // setShowModule((pre) => !pre);
  };
  console.log(moduleData);
  return (
    <div>
      <div className="unitData-section">
        {moduleData.length === 0 ? (
          "No Module Added"
        ) : (
          <ul className="units d-grid gap-2 w-50">
            {moduleData.map((module) => {
              return (
                <li
                  key={module.id}
                  type="button"
                  className="text-start ms-0 ps-2"
                  onClick={() => {
                    showModuleList();
                    // setUnitContent(unit)
                    setModuelContent(module);
                  }}
                >
                  <span>{module.title}</span>
                  <i class="fas fa-solid fa-caret-up"></i>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="course-module">
        <form className="course-module-form">
          <div className="module-title">
            <label>Module Name</label>
            <input
              type="text"
              placeholder="Module Title"
              value={moduleTitle}
              onChange={handleModuleTitle}
            />
          </div>
          <div className="module-start">
            <label>Module Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={moduleStart}
              min={minDate}
              onChange={handleModuleStart}
            />
          </div>
          <div className="module-end">
            <label>Module End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={moduleEnd}
              max="2030-12-30"
              min={minDate}
              onChange={handleModuleEnd}
            />
          </div>
          <div className="form-check form-switch visibility">
            <label htmlFor="IsActive" className=" course-unit-form-label">
              Module Visibility
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
        </form>
        {showUnit && (
          <LeasonForm
            minDate={minDate}
            setShowUnit={setShowUnit}
            setShowModule={setShowModule}
            unitData={unitData}
            setUnitData={setUnitData}
          />
        )}
        {!showUnit && (
          <button
            type="button"
            className="btn w-50 add-unit-btn"
            onClick={() => setShowUnit(!showUnit)}
          >
            Add Unit
            <i className="fas fa-solid fa-plus ms-2"></i>
          </button>
        )}
        <button className="btn btn-success w-50" onClick={handleAddModule}>
          save Module
        </button>
      </div>


      <div
        className={`offcanvas offcanvas-top module-list-show ${show}`}
        id="show-unit"
        tabindex="-1"
      >
        <div className="module-content-section">
          <div className="navigation">
          <ul style={{ paddingLeft: "10px", listStyle: 'none' }}>
                  {moduleContent && moduleContent.unit.map((unit) => {
                      return (
                        <div key={unit.id}>
                          <li>
                            <a
                              role="button"
                              onClick={() => {
                                // s('ddd');
                              }}
                            >
                              {unit.title}
                            </a>
                          </li>
                        </div>
                      );
                    })}
                </ul>
          </div>
          <div className="content">
            <div
              className={"styles.addBtnSection"}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>Update Module</h3>
              <button
                type="button"
                onClick={() => setShow("")}
                className="btn btn-close text-danger"
              ></button>
            </div>
            <form className="course-module-form">
              <div className="module-title">
                <label>Module Name</label>
                <input
                  type="text"
                  placeholder="Module Title"
                  value={moduleContent.title}
                  onChange={handleModuleTitle}
                />
              </div>
              <div className="module-start">
                <label>Module Start Date</label>
                <input
                  type="date"
                  placeholder="Start Date"
                  value={moduleContent.start_date}
                  min={minDate}
                  onChange={handleModuleStart}
                />
              </div>
              <div className="module-end">
                <label>Module End Date</label>
                <input
                  type="date"
                  placeholder="End Date"
                  value={moduleContent.end_date}
                  max="2030-12-30"
                  min={minDate}
                  onChange={handleModuleEnd}
                />
              </div>
              <div className="form-check form-switch visibility">
                <label htmlFor="IsActive" className=" course-unit-form-label">
                  Module Visibility
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
            </form>
          </div>
        </div>

        {/* <form className="course-unit-form">

          <div className="unit-title">
            <label className="course-unit-form-label">Unit Name </label>
            <input
              type="text"
              placeholder="Unit Title"
              value={unitContent.title}
              onChange={handleUnitTitle}
            />
          </div>
          <div className="unit-start">
            <label>Unit Start Date</label>
            <input
              type="date"
              placeholder="Start Date"
              value={unitContent.start_date}
              min={minDate}
              onChange={handleUnitStart}
            />
          </div>
          <div className="unit-end">
            <label>Unit End Date</label>
            <input
              type="date"
              placeholder="End Date"
              value={unitContent.end_date}
              max="2030-12-30"
              min={minDate}
              onChange={handleUnitEnd}
            />
          </div>
          <div className="unit-video">
            <label className="course-unit-form-label">Add Video </label>
            <input
              type="url"
              value={unitContent.video}
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
              Update Unit
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default Module;

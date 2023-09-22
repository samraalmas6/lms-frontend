import React, { useRef, useState } from "react";
import LeasonForm from "./LeasonForm";
import UpdateUnit from "./UpdateUnit";

const Module = ({
  moduleData,
  setShowModule,
  minDate,
  unitData,
  setUnitData,
}) => {
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleStart, setModuleStart] = useState("");
  const [moduleEnd, setModuleEnd] = useState("");
  const [visibility, setVisibility] = useState(false);

  const moduleForm = useRef(null);
  // const [show, setShow] = useState(false);
  const [unitContent, setUnitContent] = useState([]);
  // const [moduleContent, setModuelContent] = useState([]);

  const [showUnit, setShowUnit] = useState(false);
  const [showUnitContent, setShowUnitContent] = useState("");

  const showUnitList = () => {
    setShowUnitContent("show");
  };

  // const showModuleList = () => {
  //   setShow("show");
  // };
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
    if (moduleTitle) {
      const obj = {
        title: moduleTitle,
        start_date: moduleStart,
        end_date: moduleEnd,
        course: 2,
      };

      fetch("http://127.0.0.1:8000/api/modules/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem('user_token')}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status == 201) {
          response.json().then(function (result) {
            console.log(result);
            setModuleTitle("");
            setModuleStart("");
            setModuleEnd("");
            // window.location.reload();
             setShowModule((pre) => !pre);
          });
        } else {
          console.log(response);
        }
      });

      // setModuleData((pre) => [...pre, obj]);
      // setModuleTitle("");
      // setModuleStart("");
      // setModuleEnd("");
      // setShowModule((pre) => !pre);
    } else {
      // alert('Moule title is required')
    }
  };
  console.log(moduleData);
  return (
    <div>

      <div className="course-module">
        <form
          className="course-module-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="module-title">
            <label>Module Name</label>
            <input
              type="text"
              placeholder="Module Title"
              value={moduleTitle}
              onChange={handleModuleTitle}
              required
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
          <button
            type="button"
            style={{ display: "none" }}
            ref={moduleForm}
          ></button>
        </form>
        {/* <hr style={{ margin: "0px 5px 0px -7%", width: '65%' }} /> */}
        <hr style={{ margin: "20px 0px 40px -7%", width: "107%" }} />
        <div className="unitData-section ms-5"></div>
        {showUnit && (
          <LeasonForm
            minDate={minDate}
            setShowUnit={setShowUnit}
            setShowModule={setShowModule}
            unitData={unitData}
            setUnitData={setUnitData}
            showUnitContent={showUnitContent}
            setShowUnitContent={setShowUnitContent}
            unitContent={unitContent}
          />
        )}
        {!showUnit && (
          <div className="module-btn-section">
            <button
              type="button"
              className="btn w-50 add-unit-btn"
              onClick={() => setShowUnit(!showUnit)}
            >
              Add Unit
              <i className="fas fa-solid fa-plus ms-2"></i>
            </button>
          </div>
        )}
        <button
          className="btn btn-success w-50"
          onClick={(e) => {
            moduleForm.current.click();
            handleAddModule(e);
          }}
        >
          save Module
        </button>
      </div>
    </div>
  );
};

export default Module;

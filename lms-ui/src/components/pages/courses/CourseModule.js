import React, { useRef, useState } from "react";
import LeasonForm from "./LeasonForm";
import UpdateUnit from "./UpdateUnit";

const Module = ({
  moduleData,
  setModuleData,
  setShowModule,
  minDate,
  unitData,
  setUnitData,
  showModuleContent,
  setShowModuleContent,
  moduleContent
}) => {
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleStart, setModuleStart] = useState("");
  const [moduleEnd, setModuleEnd] = useState("");
  const [visibility, setVisibility] = useState(false);

  const moduleForm = useRef(null)
  // const [show, setShow] = useState(false);
  const [unitContent, setUnitContent] =useState([])
  // const [moduleContent, setModuelContent] = useState([]);

  const [showUnit, setShowUnit] = useState(false);
  const [showUnitContent, setShowUnitContent] = useState('')

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
    e.preventDefault()
    if(moduleTitle){
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
    setShowModule((pre) => !pre);
  }else {
    // alert('Moule title is required')
  }
  };
  console.log(moduleData);
  return (
    <div>
      {/* <div className="unitData-section">
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
      </div> */}

      <div className="course-module">
        <form className="course-module-form" onSubmit={(e) => e.preventDefault()}>
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
          <button type="button" style={{ display: 'none'}} ref={moduleForm}></button>
        </form>
        <div className="unitData-section">
        {unitData.length === 0 ? (
          "No Unit Added"
        ) : (
          <ul className="units d-grid gap-2 w-50">
            {unitData && unitData.map((unit) => {
              return (
                <li
                  key={unit.id}
                  type="button"
                  className="text-start ms-0 ps-2"
                  onClick={() => {
                    showUnitList()
                    setUnitContent(unit)
                  }}
                >
                  <span>{unit.title}</span><i class="fas fa-solid fa-caret-up"></i>
                </li>
              );
            })}
          </ul>
        )}
      </div>
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
        <button className="btn btn-success w-50" onClick={(e) => {
          moduleForm.current.click()
          handleAddModule(e)
          }}>
          save Module
        </button>
      </div>

      <div
        className={`offcanvas offcanvas-top module-list-show ${showModuleContent}`}
        id="show-unit"
        tabindex="-1"
      >
        <div className="module-content-section">
          <div className="navigation">
            <ul style={{ paddingLeft: "10px", listStyle: "none" }}>
              {moduleContent.unit &&
                moduleContent.unit.map((unit) => {
                  return (
                    <div key={unit.id}>
                      <li>
                        <a
                          role="button"
                          onClick={() => {
                            setUnitContent(unit)
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
                onClick={() => setShowModuleContent("")}
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
            <UpdateUnit unitContent={unitContent} minDate={minDate} setUnitData={setUnitData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module;

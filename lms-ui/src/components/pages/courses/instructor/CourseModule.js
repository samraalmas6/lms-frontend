import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import CourseUnit from "./CourseUnit";
import SingleModule from "./SingleModule";
import { CourseProbs } from "../../../../App";
import '../../../styles/CourseModule.css'

export const ModuleProbs = createContext(null);

const CourseModule = ({ moduleData, moduleCounter, setModuleData, courseId }) => {
  // ****************   Module Refs   *********************
  // ******************************************************
  const userId = sessionStorage.getItem("user_id")
  const startDateRefModule = useRef(null);
  const endDateRefModule = useRef(null);
  const startDatePickerRefModule = useRef(null);
  const endDatePickerRefModule = useRef(null);

  const {instructor, setInstructor} = useContext(CourseProbs)
  const [initModuleName, setInitModuleName] = useState(0);
  const [moduleId, setModuleId] = useState(null);

  const [showAddModule, setShowAddModule] = useState(false);
  const [saveUnit, setSaveUnit] = useState(false);
  const [unitTitle, setUnitTitle] = useState("");

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleStart, setModuleStart] = useState("2023-10-08");
  const [moduleEnd, setModuleEnd] = useState("2023-11-08");
  const [moduleDescription, setModuleDescription] = useState("");
  const [visibility, setVisibility] = useState(false);

  const [moduleContent, setModuelContent] = useState([]);

  const [increment, setIncrement] = useState(0);
  const [listModule, setListModule] = useState([]);

  useEffect(() => {
    if(moduleData.length !== 0){
      setInstructor(moduleData[0].instructor)
    }
    setInitModuleName(
     moduleCounter+1
    );
  }, [moduleCounter]);

  const handleModuleTitle = (e) => {
    setModuleTitle(e.target.value);
  };
  const handlModuleStart = (e) => {
    startDateRefModule.current.removeAttribute(
      "className",
      "module-start-field"
    );
    startDatePickerRefModule.current.setAttribute(
      "className",
      "module-start-field"
    );
    setModuleStart(e.target.value);
  };
  const handlModuleEnd = (e) => {
    endDateRefModule.current.removeAttribute("className", "module-end-field");
    endDatePickerRefModule.current.setAttribute(
      "className",
      "module-end-field"
    );
    setModuleEnd(e.target.value);
  };

  const handleVisibility = (e) => {
    setVisibility(e.target.value);
  };

  const handleModuleDescription = (e) => {
    setModuleDescription(e.target.value);
  };

  const handleCreateNewModule = () => {
    setShowAddModule(true);
  };

  

  const handleSaveModule = (moduleTitle) => {
    // e.preventDefault();
    setModuleTitle(moduleTitle);
    const obj = {
      title: moduleTitle,
      description: "module Description",
      start_date: moduleStart,
      end_date: moduleEnd,
      course: courseId,
      updated_by: userId,
      instructor
    };
    fetch("http://127.0.0.1:8000/api/modules/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 201) {
        response.json().then(function (result) {
          // setModuleData((pre) => [...pre, result])
          setInitModuleName((pre) => Number(pre + 1));
          setModuleId(() => result.id);
          // setModuleTitle("");
          setModuleDescription("");
          window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  return (
    <div className="">
      <div className="unitData-section">
        <div className="accordion accordion-flush w-100" id="module-section">
          {moduleData.length === 0
            ? "No module found for this course."
            : moduleData &&
              moduleData.map((module) => {
                return (
                  <ModuleProbs.Provider
                    value={{
                      moduleId,
                      // unitData,
                      // setUnitData,
                      unitTitle,
                      setUnitTitle,
                    }}
                    
                  >
                    <SingleModule
                      key={module.id}
                      module={module}
                      setModuleId={setModuleId}
                      // handleModuleContent={handleModuleContent}
                      setModuelContent={setModuelContent}
                    />
                  </ModuleProbs.Provider>
                );
              })}

          {/* Create New Module Section */}

          {showAddModule &&
            listModule.length !== 0 &&
            listModule.map((element) => {
              return (
                <div className="add-new-module-section">
                  <div className="new-module-heading-section">
                    <div className="">
                      <span className="me-3">Module</span>
                      <input
                        type="text"
                        placeholder="Enter Module Title"
                        value={moduleTitle}
                        onChange={(e) => handleModuleTitle(e)}
                        className="moduleTitle"
                        required
                      />
                    </div>

                    <div className="">
                      <label>Start Date:</label>
                      <i
                        className="bi bi-calendar-date date-picker"
                        role="button"
                        ref={startDatePickerRefModule}
                        onClick={() => startDateRefModule.current.showPicker()}
                      ></i>
                      <input
                        type="date"
                        value={moduleStart}
                        className="module-start-field"
                        ref={startDateRefModule}
                        id="module-date-field"
                        onChange={(e) => handlModuleStart(e)}
                      />
                      <label>End Date:</label>
                      <i
                        className="bi bi-calendar-date date-picker"
                        role="button"
                        ref={endDatePickerRefModule}
                        onClick={() => endDateRefModule.current.showPicker()}
                      ></i>
                      <input
                        type="date"
                        value={moduleEnd}
                        onChange={(e) => handlModuleEnd(e)}
                        className="module-end-field"
                        id="module-date-field"
                        ref={endDateRefModule}
                      />
                    </div>

                    <div className="btn-group dropstart">
                      <i
                        className="bi bi-three-dots-vertical "
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => null}
                      ></i>
                      <button
                        type="button"
                        className="btn btn-close"
                        onClick={() => {
                          setListModule(() =>
                            listModule.filter((module) => {
                              return module !== element;
                            })
                          );
                        }}
                      ></button>
                      <div className="dropdown-menu option-main-container module-option">
                        <ul
                          className="option-ul"
                          style={{
                            display: "flex",
                          }}
                        >
                          <li>
                            <div className="form-check form-switch visibility">
                              <input
                                className="form-check-input "
                                type="checkbox"
                                role="switch"
                                value={visibility}
                                onChange={handleVisibility}
                                id="flexSwitchCheckDefault"
                              />
                            </div>
                          </li>
                          <li>
                            <i
                              className="bi bi-trash text-danger"
                              onClick={() => null}
                            ></i>
                          </li>
                          <li>
                            <i className="bi bi-copy text-info"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="module-form-section">
                    <form className="module-form">
                      <ModuleProbs.Provider
                        value={{
                          moduleId,
                          // unitData,
                          // setUnitData,
                          unitTitle,
                          setUnitTitle,
                        }}
                      >
                        {/* <CourseUnit showUnit={false} /> */}
                      </ModuleProbs.Provider>
                      <div className="saveModule-button-section">
                        {/* <button
                      type="button"
                      onClick={(e) => {
                          e.preventDefault()
                        // handleSaveModule()
                      }}
                      className="btn btn-secondary saveModule-button"
                    >
                      Save Module
                    </button> */}
                      </div>
                    </form>
                  </div>
                </div>
              );
            })}

          <div className="add-module-btn">
            <button
              type="button"
              className="btn"
              onClick={(e) => {
                // setModuleTitle(() => 'Module '+increment)
                handleSaveModule("Module " + Number(initModuleName));
                handleCreateNewModule();
                setIncrement((pre) => pre + 1);
                setListModule((pre) => [...pre, increment + 1]);
              }}
            >
              Add Module <i className="bi bi-plus-circle plus-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModule;

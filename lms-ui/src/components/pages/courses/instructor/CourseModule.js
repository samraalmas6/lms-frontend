import React, { useRef, useState } from "react";
import CourseUnit from "./CourseUnit";

const CourseModule = ({ moduleData, courseId }) => {
 

  // ****************   Module Refs   *********************
  // ******************************************************

  const startDateRefModule = useRef(null);
  const endDateRefModule = useRef(null);
  const startDatePickerRefModule = useRef(null);
  const endDatePickerRefModule = useRef(null);

  const [moduleId, setModuleId] = useState(null)

  const [showAddModule, setShowAddModule] = useState(false);

  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleStart, setModuleStart] = useState("");
  const [moduleEnd, setModuleEnd] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [visibility, setVisibility] = useState(false);

  const [moduleContent, setModuelContent] = useState([]);

  const [unitData, setUnitData] = useState([]);

  const handleModuleTitle = (e) => {
    setModuleTitle(e.target.value);
  };
  const handlModuleStart = (e) => {
    startDateRefModule.current.removeAttribute("class", "module-start-field");
    startDatePickerRefModule.current.setAttribute(
      "class",
      "module-start-field"
    );
    setModuleStart(e.target.value);
  };
  const handlModuleEnd = (e) => {
    endDateRefModule.current.removeAttribute("class", "module-end-field");
    endDatePickerRefModule.current.setAttribute("class", "module-end-field");
    setModuleEnd(e.target.value);
  };

  const handleVisibility = (e) => {
    setVisibility(e.target.value);
  };

  const handleModuleDescription = (e) => {
    setModuleDescription(e.target.value);
  };

  const handleCreateNewModule = () => {
    setShowAddModule(!showAddModule);
  };

  const handleModuleContent = (module) => {
    setModuleId(module.id)
    fetch(`http://127.0.0.1:8000/api/modules/${module.id}/units`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      response.json().then(function (result) {
        console.log("Api result: ", result);
        setUnitData(result);
      });
    });
  };

  const handleSaveModule = (e) => {
    e.preventDefault();
    if (moduleTitle) {
      const obj = {
        title: moduleTitle,
        description: moduleDescription,
        start_date: "2023-12-25",
        end_date: "2023-12-25",
        course: courseId,
        updated_by: 1,
      };
      fetch("http://127.0.0.1:8000/api/modules/", {
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
            setModuleTitle("");
            setModuleDescription("");
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  return (
    <div className="">
      <div className="unitData-section">
        <div className="accordion accordion-flush w-100" id="module-section">
          {moduleData.length === 0 ||
          moduleData.detail == "No module found for this course."
            ? moduleData.detail
            : moduleData &&
              moduleData.map((module) => {
                return (
                  <div
                    key={module.id}
                    type="button"
                    className="accordion-item mb-1"
                    role="button"
                    aria-expanded="false"
                    onClick={() => {
                      // showModuleList();
                      // setUnitContent(unit)
                      handleModuleContent(module);
                      setModuelContent(() => module);
                    }}
                  >
                    <h2
                      className="accordion-header module-collapse-button"
                      id={`flush-module${module.id}`}
                    >
                      <div
                        className="accordion-button collapsed module-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#module${module.id}`}
                        aria-expanded="false"
                        aria-controls={`flush-module${module.id}`}
                      >
                        <div className="module-heading-container">
                          <div className="">
                            <span className="me-3">MODULE</span>
                            <input
                              type="text"
                              placeholder="Module Title"
                              value={module.title}
                              className="moduleTitle"
                              // onChange={"handleModuleTitle"}
                              required
                            />
                          </div>
                          <div className="">
                            <label>Start Date:</label>
                            {/* <i
                              class="bi bi-calendar-date date-picker"
                              role="button"
                              ref={startDatePickerRefModule}
                              onClick={() =>
                                startDateRefModule.current.showPicker()
                              }
                            ></i> */}
                            <input
                              type="date"
                              value={moduleStart}
                              className="module-start-fiel"
                              ref={startDateRefModule}
                              id="module-date-field"
                              onChange={(e) => handlModuleStart(e)}
                            />
                            <label>End Date:</label>
                            {/* <i
                              class="bi bi-calendar-date date-picker"
                              role="button"
                              ref={endDatePickerRefModule}
                              onClick={() =>
                                endDateRefModule.current.showPicker()
                              }
                            ></i> */}
                            <input
                              type="date"
                              value={moduleEnd}
                              onChange={(e) => handlModuleEnd(e)}
                              className="module-end-fiel"
                              id="module-date-field"
                              ref={endDateRefModule}
                            />
                          </div>

                          <div class="btn-group dropstart">
                            <i
                              className="bi bi-three-dots-vertical "
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              onClick={() => null}
                            ></i>
                            <div className="dropdown-menu option-main-container module-option">
                              <ul class="option-ul" style={{ display: "flex" }}>
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
                                  <i class="bi bi-copy text-info"></i>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </h2>
                    <div
                      id={`module${module.id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`flush-module${module.id}`}
                      data-bs-parent="#module-section"
                    >
                      <div className="accordion-body">
                        <CourseUnit unitData={unitData}
                          moduleId={moduleId}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

          {/* Create New Module Section */}

          {showAddModule && (
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
                    class="bi bi-calendar-date date-picker"
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
                    class="bi bi-calendar-date date-picker"
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

                <div class="btn-group dropstart">
                  <i
                    className="bi bi-three-dots-vertical "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={() => null}
                  ></i>
                  <button type="button" className="btn btn-close" onClick={() => setShowAddModule(false)}></button>
                  <div className="dropdown-menu option-main-container module-option">
                    <ul
                      class="option-ul"
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
                        <i class="bi bi-copy text-info"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="module-form-section">
                <form className="module-form">
                  <div className="module-title">
                    <label className="moduleDescription-label">
                      Module Description
                    </label>
                    <input
                      type="text"
                      className="moduleDescription-field"
                      placeholder="Module Description"
                      value={moduleDescription}
                      onChange={(e) => handleModuleDescription(e)}
                      required
                    />
                  </div>

                  <div className="saveModule-button-section">
                    <button
                      type="button"
                      onClick={(e) => handleSaveModule(e)}
                      className="btn btn-secondary saveModule-button"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="add-module-btn">
            <button
              type="button"
              className="btn"
              onClick={() => handleCreateNewModule()}
            >
              Add Module <i class="bi bi-plus-circle plus-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

   
  );
};

export default CourseModule;

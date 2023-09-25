import React, { useRef, useState } from "react";
import LeasonForm from "./CourseUnit";
import UpdateUnit from "./UpdateUnit";
import CourseUnit from "./CourseUnit";

const Module = ({ moduleData }) => {
  // const moduleForm = useRef(null);
  // // const [show, setShow] = useState(false);
  // const [unitContent, setUnitContent] = useState([]);
  // // const [moduleContent, setModuelContent] = useState([]);

  // const [showUnit, setShowUnit] = useState(false);
  // const [showUnitContent, setShowUnitContent] = useState("");

  // const showUnitList = () => {
  //   setShowUnitContent("show");
  // };

  // // const showModuleList = () => {
  // //   setShow("show");
  // // };
  // const handleModuleTitle = (e) => {
  //   setModuleTitle(e.target.value);
  // };
  // const handleModuleStart = (e) => {
  //   setModuleStart(e.target.value);
  // };
  // const handleModuleEnd = (e) => {
  //   setModuleEnd(e.target.value);
  // };

  // const handleAddModule = (e) => {
  //   e.preventDefault();
  //   if (moduleTitle) {
  //     const obj = {
  //       title: moduleTitle,
  //       start_date: moduleStart,
  //       end_date: moduleEnd,
  //       course: 2,
  //     };

  //     fetch("http://127.0.0.1:8000/api/modules/", {
  //       method: "POST",
  //       body: JSON.stringify(obj),
  //       headers: {
  //         Authorization: `Token ${sessionStorage.getItem('user_token')}`,
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     }).then((response) => {
  //       if (response.status == 201) {
  //         response.json().then(function (result) {
  //           console.log(result);
  //           setModuleTitle("");
  //           setModuleStart("");
  //           setModuleEnd("");
  //           // window.location.reload();
  //            setShowModule((pre) => !pre);
  //         });
  //       } else {
  //         console.log(response);
  //       }
  //     });

  //     // setModuleData((pre) => [...pre, obj]);
  //     // setModuleTitle("");
  //     // setModuleStart("");
  //     // setModuleEnd("");
  //     // setShowModule((pre) => !pre);
  //   } else {
  //     // alert('Moule title is required')
  //   }
  // };
  // console.log(moduleData);

  // ****************   Module Refs   *********************
  // ******************************************************

  const startDateRefModule = useRef(null);
  const endDateRefModule = useRef(null);
  const startDatePickerRefModule = useRef(null);
  const endDatePickerRefModule = useRef(null);

  const [moduleStart, setModuleStart] = useState("");
  const [moduleEnd, setModuleEnd] = useState("");
  const [visibility, setVisibility] = useState(false);

  const [moduleContent, setModuelContent] = useState([]);

  const [unitData, setUnitData] = useState([]);

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

  const handleModuleContent = (module) => {
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
                            <i
                              class="bi bi-calendar-date date-picker"
                              role="button"
                              ref={startDatePickerRefModule}
                              onClick={() =>
                                startDateRefModule.current.showPicker()
                              }
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
                              onClick={() =>
                                endDateRefModule.current.showPicker()
                              }
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
                        <CourseUnit unitData={unitData} />
                      </div>
                    </div>
                  </div>
                );
              })}
          <div className="add-module-btn">
            <button type="button" className="btn">
              Add Module <i class="bi bi-plus-circle plus-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    // ***************  Old Module Design   ***************
    // ****************************************************

    // <div>
    //   <div className="course-module">
    //     <form
    //       className="course-module-form"
    //       onSubmit={(e) => e.preventDefault()}
    //     >
    //       <div className="module-title">
    //         <label>Module Name</label>
    //         <input
    //           type="text"
    //           placeholder="Module Title"
    //           value={moduleTitle}
    //           onChange={handleModuleTitle}
    //           required
    //         />
    //       </div>
    //       <div className="module-start">
    //         <label>Module Start Date</label>
    //         <input
    //           type="date"
    //           placeholder="Start Date"
    //           value={moduleStart}
    //           min={minDate}
    //           onChange={handleModuleStart}
    //         />
    //       </div>
    //       <div className="module-end">
    //         <label>Module End Date</label>
    //         <input
    //           type="date"
    //           placeholder="End Date"
    //           value={moduleEnd}
    //           max="2030-12-30"
    //           min={minDate}
    //           onChange={handleModuleEnd}
    //         />
    //       </div>
    //       <div className="form-check form-switch visibility">
    //         <label htmlFor="IsActive" className=" course-unit-form-label">
    //           Module Visibility
    //         </label>
    //         <input
    //           className="form-check-input"
    //           type="checkbox"
    //           role="switch"
    //           value={visibility}
    //           onChange={handleVisibility}
    //           id="flexSwitchCheckDefault"
    //         />
    //       </div>
    //       <button
    //         type="button"
    //         style={{ display: "none" }}
    //         ref={moduleForm}
    //       ></button>
    //     </form>
    //     {/* <hr style={{ margin: "0px 5px 0px -7%", width: '65%' }} /> */}
    //     <hr style={{ margin: "20px 0px 40px -7%", width: "107%" }} />
    //     <div className="unitData-section ms-5"></div>
    //     {showUnit && (
    //       <LeasonForm
    //         minDate={minDate}
    //         setShowUnit={setShowUnit}
    //         setShowModule={setShowModule}
    //         unitData={unitData}
    //         setUnitData={setUnitData}
    //         showUnitContent={showUnitContent}
    //         setShowUnitContent={setShowUnitContent}
    //         unitContent={unitContent}
    //       />
    //     )}
    //     {!showUnit && (
    //       <div className="module-btn-section">
    //         <button
    //           type="button"
    //           className="btn w-50 add-unit-btn"
    //           onClick={() => setShowUnit(!showUnit)}
    //         >
    //           Add Unit
    //           <i className="fas fa-solid fa-plus ms-2"></i>
    //         </button>
    //       </div>
    //     )}
    //     <button
    //       className="btn btn-success w-50"
    //       onClick={(e) => {
    //         moduleForm.current.click();
    //         handleAddModule(e);
    //       }}
    //     >
    //       save Module
    //     </button>
    //   </div>
    // </div>
  );
};

export default Module;

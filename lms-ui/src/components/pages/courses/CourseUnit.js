import React, { useRef, useState } from "react";
import UpdateUnit from "./UpdateUnit";

const CourseUnit = ({ unitData }) => {
  //  ************************* Unit Ref Hooks  ********************
  // ***************************************************************
  const startDateRefUnit = useRef(null);
  const endDateRefUnit = useRef(null);
  const startDatePickerRefUnit = useRef(null);
  const endDatePickerRefUnit = useRef(null);

  const [unitStart, setUnitStart] = useState("");
  const [unitEnd, setUnitEnd] = useState("");
  const [visibility, setVisibility] = useState("");
  const [unitFiles, setUnitFiles] = useState([]);

  const [showAddUnit, setShowAddUnit] = useState(false) 

  const handlUnitStart = (e) => {
    startDateRefUnit.current.removeAttribute("class", "unit-start-field");
    startDatePickerRefUnit.current.setAttribute("class", "unit-start-field");
    setUnitStart(e.target.value);
  };
  const handlUnitEnd = (e) => {
    endDateRefUnit.current.removeAttribute("class", "unit-end-field");
    endDatePickerRefUnit.current.setAttribute("class", "unit-end-field");
    setUnitEnd(e.target.value);
  };

  const handleVisibility = (e) => {
    setVisibility(e.target.value);
  };

  const handleShowAddUnit = () => {
    setShowAddUnit(!showAddUnit)
  }

  const handleUnitContent = (unit) => {
    fetch(`http://127.0.0.1:8000/api/units/${unit.id}/files`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      response.json().then(function (result) {
        console.log("Api result Files: ", result);
        setUnitFiles(result);
      });
    });
  };

  return (
    <div className="">
      <div
        className="accordion accordion-flush module-unit-section"
        id="unit-section"
      >
        {/* <h1 className="text-center rounded unit-list-heading" >Units</h1> */}
        {unitData.length === 0 ||
        unitData.detail == "No unit found for this module."
          ? unitData.detail
          : unitData &&
            unitData.map((unit) => {
              return (
                <div
                  key={unit.id}
                  type="button"
                  className="accordion-item mb-0 mt-1 unitSection"
                  role="button"
                  aria-expanded="false"
                  onClick={() => {
                    handleUnitContent(unit);
                  }}
                >
                  <h2
                    className="accordion-header unit-collapse-button"
                    id={`flush-unit${unit.id}`}
                  >
                    <div
                      className="accordion-button collapsed unit-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#unit${unit.id}`}
                      aria-expanded="false"
                      aria-controls={`flush-unit${unit.id}`}
                    >
                      <div className="module-heading-container">
                        <div className="">
                          <span className="me-3">Unit</span>
                          <input
                            type="text"
                            placeholder="Unit Title"
                            value={unit.title}
                            className="unitTitle"
                            required
                          />
                        </div>
                        <div className="">
                          <label>Start Date:</label>
                          <i
                            class="bi bi-calendar-date date-picker"
                            role="button"
                            ref={startDatePickerRefUnit}
                            onClick={() =>
                              startDateRefUnit.current.showPicker()
                            }
                          ></i>
                          <input
                            type="date"
                            value={unitStart}
                            className="unit-start-field"
                            ref={startDateRefUnit}
                            id="unit-date-field"
                            onChange={(e) => handlUnitStart(e)}
                          />
                          <label>End Date:</label>
                          <i
                            class="bi bi-calendar-date date-picker"
                            role="button"
                            ref={endDatePickerRefUnit}
                            onClick={() => endDateRefUnit.current.showPicker()}
                          ></i>
                          <input
                            type="date"
                            value={unitEnd}
                            onChange={(e) => handlUnitEnd(e)}
                            className="unit-end-field"
                            id="unit-date-field"
                            ref={endDateRefUnit}
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
                    </div>
                  </h2>
                  <div
                    id={`unit${unit.id}`}
                    className="accordion- collapse"
                    aria-labelledby={`flush-unit${unit.id}`}
                    data-bs-parent="#unit-section"
                  >
                    <div className="accordion-body">
                      <div className="video-section">
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "15%",
                          }}
                        >
                          <h5>Add Content</h5>
                          <i class="bi bi-plus-circle plus-icon"></i>
                        </div>
                        <div className="file-content">
                          <ul className="outer-ul">
                            {unitFiles.length === 0 ||
                            unitFiles.detail == "No files found for this unit."
                              ? unitFiles.detail
                              : unitFiles &&
                                unitFiles.map((file) => {
                                  return (
                                    <li key={file.id} className="outer-ul-list">
                                      <a className="w-50" href={file.url}>
                                        {file.title}
                                      </a>
                                      <span className="w-50">
                                        {file.created_at.substr(0, 10)}
                                      </span>
                                      <i
                                        className="bi bi-three-dots-vertical"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        onClick={() => null}
                                      ></i>
                                      <div className="dropdown-menu file-content-options">
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
                                    </li>
                                  );
                                })}
                          </ul>
                        </div>
                      </div>
                      <div className="slide-section"></div>
                      <div className="pdf-section"></div>
                    </div>
                  </div>
                </div>
              );
            })}
            {
              showAddUnit &&         <div className="add-new-unit-section">
              <div className="new-unit-heading-section">
                  <div className="">
                    <span className="me-3">Unit</span>
                    <input
                      type="text"
                      placeholder="Unit Title"
                      // value={title}
                      className="unitTitle"
                      required
                    />
                  </div>
                  {/* <div className="">
                              <label>Start Date:</label>
                              <i
                                class="bi bi-calendar-date date-picker"
                                role="button"
                                ref={startDatePickerRefUnit}
                                onClick={() =>
                                  startDateRefUnit.current.showPicker()
                                }
                              ></i>
                              <input
                                type="date"
                                value={unitStart}
                                className="unit-start-field"
                                ref={startDateRefUnit}
                                id="unit-date-field"
                                onChange={(e) => handlUnitStart(e)}
                              />
                              <label>End Date:</label>
                              <i
                                class="bi bi-calendar-date date-picker"
                                role="button"
                                ref={endDatePickerRefUnit}
                                onClick={() => endDateRefUnit.current.showPicker()}
                              ></i>
                              <input
                                type="date"
                                value={unitEnd}
                                onChange={(e) => handlUnitEnd(e)}
                                className="unit-end-field"
                                id="unit-date-field"
                                ref={endDateRefUnit}
                              />
                            </div> */}
    
                  <div class="btn-group dropstart">
                    <i
                      className="bi bi-three-dots-vertical "
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={() => null}
                    ></i>
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
              
              <div className="unit-form-section">
                <form className="unit-form">
                  <div className="video-section">
                    <span>Video</span>
                    <i class="bi bi-plus-circle plus-icon"></i>
                  </div>
                  <div className="slides-section">
                    <span>Slide</span>
                    <i class="bi bi-plus-circle plus-icon"></i>
                  </div>
                  <div className="pdf-section">
                    <span>PDF</span>
                    <i class="bi bi-plus-circle plus-icon"></i>
                  </div>
                  <div className="assignment-section">
                    <span>Assignment</span>
                    <i class="bi bi-plus-circle plus-icon"></i>
                  </div>
                </form>
              </div>
            </div>
            }

        <div className="add-unit-btn">
          <button type="button" className="btn" onClick={handleShowAddUnit}>
            Add Unit <i class="bi bi-plus-circle plus-icon"></i>
          </button>
        </div>
      </div>
    </div>

    // *********************  Old Unit design   *******************
    // ************************************************************

    // <div className="ms-5">
    //   <UpdateUnit setShowUnit={setShowUnit} setUnitData={setUnitData} minDate={minDate}/>
    //   <div
    //     className={`offcanvas offcanvas-top unit-list-show ${showUnitContent}`}
    //     id="show-unit"
    //     tabindex="-1"
    //   >
    //     <div
    //       className={"styles.addBtnSection"}
    //       style={{ display: "flex", justifyContent: "space-between" }}
    //     >
    //       <h3>Update Unit</h3>
    //       <button
    //         type="button"
    //         onClick={() => setShowUnitContent("")}
    //         className="btn btn-close text-danger"
    //       ></button>
    //     </div>
    //     <UpdateUnit setShowUnit={setShowUnit} unitContent={unitContent}  minDate={minDate} setUnitData={setUnitData}/>
    //   </div>
    // </div>
  );
};

export default CourseUnit;

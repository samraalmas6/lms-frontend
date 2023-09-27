import React, { useEffect, useRef, useState } from "react";
import UpdateUnit from "./UpdateUnit";

const CourseUnit = ({ unitData, moduleId }) => {
  //  ************************* Unit Ref Hooks  ********************
  // ***************************************************************
  const startDateRefUnit = useRef(null);
  const endDateRefUnit = useRef(null);
  const startDatePickerRefUnit = useRef(null);
  const endDatePickerRefUnit = useRef(null);
  const videoFieldRef = useRef(null);
  const pdfFieldRef = useRef(null);
  const slideFieldRef = useRef(null);
  const videoSection = useRef(null);

  const [unitTitle, setUnitTitle] = useState("");
  const [unitStart, setUnitStart] = useState("");
  const [unitEnd, setUnitEnd] = useState("");
  const [visibility, setVisibility] = useState("");
  const [unitFiles, setUnitFiles] = useState([]);
  const [videoUrl, setVidoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [unitPDF, setUnitPDF] = useState("");
  const [unitSlide, setUnitSlide] = useState("");

  const [showAddUnit, setShowAddUnit] = useState(false);

  useEffect(() => {}, [0]);

  const handlUnitStart = (e) => {
    // startDateRefUnit.current.removeAttribute("class", "unit-start-field");
    // startDatePickerRefUnit.current.setAttribute("class", "unit-start-field");
    setUnitStart(e.target.value);
  };
  const handlUnitEnd = (e) => {
    // endDateRefUnit.current.removeAttribute("class", "unit-end-field");
    // endDatePickerRefUnit.current.setAttribute("class", "unit-end-field");
    setUnitEnd(e.target.value);
  };

  const handleVisibility = (e) => {
    setVisibility(e.target.value);
  };

  const handleUnitTitle = (e) => {
    setUnitTitle(e.target.value);
  };

  const hanldeVideoUpload = () => {
    videoFieldRef.current.removeAttribute("id", "hide-field");
  };
  const hanldePDFUpload = () => {
    pdfFieldRef.current.click();
  };
  const hanldeSlideUpload = () => {
    slideFieldRef.current.removeAttribute("id", "hide-field");
    slideFieldRef.current.click();
  };

  const hanldeVido = (e) => {
    setVidoUrl(e.target.value);
  };
  const hanldeVidoTitle = (e) => {
    setVideoTitle(e.target.value);
  };
  const handleUnitPDF = (e) => {
    let file = e.target.files[0];
    if (file) {
      videoSection.current.removeAttribute("id", "hide-field");
    } else {
      videoSection.current.setAttribute("id", "hide-field");
    }
    setUnitPDF(file);
  };
  const handleUnitSlide = (e) => {
    let file = e.target.files[0];
    setUnitSlide(file);
  };

  const handleShowAddUnit = () => {
    setShowAddUnit(!showAddUnit);
  };

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
        // setUnitEnd(unit.end_date.substr(0,10))
        // setUnitStart(unit.start_date.substr(0,10))
      });
    });
  };

  const handleUploadVideo = (e) => {
    e.preventDefault();
    if (videoUrl) {
      const obj = {
        title: unitTitle,
        description: "Unit Test Description",
        start_date: "2023-12-25",
        end_date: "2023-12-25",
        module: moduleId,
        updated_by: 1,
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
            // setModuleDescription("");
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  const handleSaveUnit = (e) => {
    e.preventDefault();
    if (unitTitle) {
      const obj = {
        title: unitTitle,
        description: "Unit Test Description",
        start_date: "2023-12-25",
        end_date: "2023-12-25",
        module: moduleId,
        updated_by: 1,
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
            // setModuleDescription("");
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
                  {/* {(function() {
                setUnitEnd(unit.end_date.substr(0,10))
                setUnitStart(unit.start_date.substr(0,10))
              }())} */}
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

                          <input
                            type="date"
                            value={unitStart}
                            className="unit-start-fiel"
                            ref={startDateRefUnit}
                            id="unit-date-field"
                            onChange={(e) => handlUnitStart(e)}
                          />
                          <label>End Date:</label>
                          <input
                            type="date"
                            value={unitEnd}
                            onChange={(e) => handlUnitEnd(e)}
                            className="unit-end-fiel"
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
                                      <a
                                        className="w-50"
                                        href={file.file}
                                        target="_blank"
                                      >
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
        {showAddUnit && (
          <div className="add-new-unit-section">
            <div className="new-unit-heading-section">
              <div className="">
                <span className="me-3">Unit</span>
                <input
                  type="text"
                  placeholder="Enter Unit Title"
                  value={unitTitle}
                  onChange={(e) => handleUnitTitle(e)}
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
                  onClick={() => startDateRefUnit.current.showPicker()}
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

            <div className="unit-form-section">
              <form className="unit-form">
                <div className="video-section">
                  <div className="unit-selection-section">
                    <span className="unit-form-span-title">Video</span>
                    <i
                      class="bi bi-plus-circle plus-icon unit-form-i-title"
                      onClick={() => hanldeVideoUpload()}
                    ></i>
                  </div>
                  <div
                    className="unit-field-section unit-video-main-container"
                    id="hide-field"
                    ref={videoFieldRef}
                  >
                    <div
                      className="unit-video-fields"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        type="text"
                        className="video-title-field"
                        value={videoUrl}
                        onChange={(e) => hanldeVidoTitle(e)}
                        placeholder="Enter Video Title"
                      />
                      <input
                        type="url"
                        className="video-url"
                        value={videoUrl}
                        onChange={(e) => hanldeVido(e)}
                        placeholder="Video Link"
                      />
                    </div>
                    <div className="unit-video-icon-section">
                      <i
                        class="bi bi-check-lg check-unit-content text-success"
                        onClick={(e) => handleUploadVideo(e)}
                      ></i>
                      <i class="bi bi-x check-unit-content text-danger"></i>
                    </div>
                  </div>
                </div>
                <div className="slides-section">
                  <div className="unit-selection-section">
                    <span className="unit-form-span-title">Slide</span>
                    <i
                      class="bi bi-plus-circle plus-icon unit-form-i-title"
                      onClick={() => hanldeSlideUpload()}
                    ></i>
                  </div>
                  <div className="unit-field-section" id="hide-field">
                    <input
                      type="file"
                      className="slide-field"
                      ref={slideFieldRef}
                      onChange={handleUnitSlide}
                      style={{ display: "none" }}
                    />
                    <span>{unitSlide && unitSlide.name}</span>
                    <i class="bi bi-check-lg check-unit-content text-success"></i>
                    <i class="bi bi-x check-unit-content text-danger"></i>
                  </div>
                </div>
                <div className="pdf-section">
                  <div className="unit-selection-section">
                    <span className="unit-form-span-title">PDF</span>
                    <i
                      class="bi bi-plus-circle plus-icon unit-form-i-title"
                      onClick={() => hanldePDFUpload()}
                    ></i>
                  </div>
                  <div
                    className="unit-field-section"
                    id="hide-field"
                    ref={videoSection}
                  >
                    <input
                      type="file"
                      className="pdf-field"
                      onChange={handleUnitPDF}
                      ref={pdfFieldRef}
                      style={{ display: "none" }}
                    />
                    <span>{unitPDF && unitPDF.name}</span>
                    <i class="bi bi-check-lg check-unit-content text-success"></i>
                    <i class="bi bi-x check-unit-content text-danger"></i>
                  </div>
                </div>
                <div className="assignment-section">
                  <div className="unit-selection-section">
                    <span className="unit-form-span-title">Assignment</span>
                    <i class="bi bi-plus-circle plus-icon unit-form-i-title"></i>
                  </div>
                  <div className="unit-field-section"></div>
                </div>

                <div className="saveModule-button-section">
                  <button
                    type="button"
                    onClick={(e) => handleSaveUnit(e)}
                    className="btn btn-secondary saveModule-button"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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

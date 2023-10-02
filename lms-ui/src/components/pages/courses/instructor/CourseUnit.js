import React, { useEffect, useRef, useState } from "react";
import UpdateUnit from "./UpdateUnit";
import { useNavigate } from "react-router-dom";

const CourseUnit = ({ unitData, moduleId, showUnit, unitTitle, setUnitTitle, handleSaveUnit }) => {
  //  ************************* Unit Ref Hooks  ********************
  // ***************************************************************

  const navigate = useNavigate();

  const startDateRefUnit = useRef(null);
  const endDateRefUnit = useRef(null);
  const startDatePickerRefUnit = useRef(null);
  const endDatePickerRefUnit = useRef(null);
  const videoFieldRef = useRef(null);
  const videoAddRef = useRef(null);
  const pdfFieldRef = useRef(null);
  const slideFieldRef = useRef(null);
  const pdfSection = useRef(null);
  const slideSection = useRef(null);
  const pdfSelector = useRef(null);
  const slideSelector = useRef(null);

  const [unitId, setUnitId] = useState(null)

  const [unitStart, setUnitStart] = useState("");
  const [unitEnd, setUnitEnd] = useState("");
  const [visibility, setVisibility] = useState("");
  const [unitFiles, setUnitFiles] = useState([]);
  const [videoUrl, setVidoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [unitPDF, setUnitPDF] = useState("");
  const [unitSlide, setUnitSlide] = useState("");

  const [increment, setIncrement] = useState(0);
  const [listUnit, setListUnit] = useState([0]);

  const [showAddUnit, setShowAddUnit] = useState(!showUnit);
  const [showUnitList, setShoshowUnitList] = useState(showUnit);
  const [showUnitContent, setShowUnitContent] = useState(false)

  useEffect(() => {

  }, [0]);

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

  const hanldeVideoUpload = (e) => {
    // e.stopPropagation();
    videoFieldRef.current.removeAttribute("id", "hide-field");
    videoAddRef.current.setAttribute("id", "hide-field");
  };
  const handleAddVido = () => {
    videoAddRef.current.removeAttribute("id", "hide-field");
    videoFieldRef.current.setAttribute("id", "hide-field");
  };

  const hanldePDFUpload = () => {
    pdfFieldRef.current.click();
  };

  const handleRemovePDF = () => {
    pdfSelector.current.removeAttribute("id", "hide-field");
    pdfSection.current.setAttribute("id", "hide-field");
    setUnitPDF(null);
  };

  const hanldeSlideUpload = () => {
    slideFieldRef.current.removeAttribute("id", "hide-field");
    slideFieldRef.current.click();
  };
  const handleRemoveSlide = () => {
    slideSelector.current.removeAttribute("id", "hide-field");
    slideSection.current.setAttribute("id", "hide-field");
    setUnitPDF(null);
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
      pdfSection.current.removeAttribute("id", "hide-field");
      pdfSelector.current.setAttribute("id", "hide-field");
    } else {
      pdfSection.current.setAttribute("id", "hide-field");
    }
    setUnitPDF(file);
    console.log(file.name);
  };
  const handleUnitSlide = (e) => {
    let file = e.target.files[0];
    if (file) {
      slideSection.current.removeAttribute("id", "hide-field");
      slideSelector.current.setAttribute("id", "hide-field");
    } else {
      pdfSection.current.setAttribute("id", "hide-field");
    }
    setUnitSlide(file);
  };

  const handleAssignment = () => {
    navigate("/course/create-assignment");
  };

  const handleShowAddUnit = () => {
    setShowAddUnit(true);
  };

  const handleUnitContent = (unit) => {
    setUnitId(unit.id)
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
        title: videoTitle,
        url: videoUrl,
        unit: unitId,
        updated_by: 1,
      };
      fetch("http://127.0.0.1:8000/api/videos/", {
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
            setVideoTitle("");
            setVidoUrl("");
            // setModuleDescription("");
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (unitSlide) {
      formData.append("file", unitSlide);
      formData.append("title", "Anonymous" + unitData[0].id);
      formData.append("unit", 5);
      formData.append("updated_by", 1);
    } else {
      formData.append("file", unitPDF);
      formData.append("title", "Anonymous" + unitData[0].id);
      formData.append("unit", 5);
      formData.append("updated_by", 1);
    }
    fetch("http://127.0.0.1:8000/api/files/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        // "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status == 201) {
        response.json().then(function (result) {
          console.log(result);
          setUnitPDF(null);
          setUnitSlide(null);
          // setVidoUrl("");
          // setModuleDescription("");
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };


  // const handleSaveUnit = () => {
  //   // e.preventDefault();
  //   if (unitTitle) {
  //     const obj = {
  //       title: unitTitle,
  //       description: "Unit Test Description",
  //       start_date: "2023-12-25T00:00:00Z",
  //       end_date: "2023-12-25T00:00:00Z",
  //       module: moduleId,
  //       updated_by: 1,
  //     };
  //     fetch("http://127.0.0.1:8000/api/units/", {
  //       method: "POST",
  //       body: JSON.stringify(obj),
  //       headers: {
  //         Authorization: `Token ${sessionStorage.getItem("user_token")}`,
  //         "Content-type": "application/json; charset=UTF-8",
  //       },
  //     }).then((response) => {
  //       if (response.status == 201) {
  //         response.json().then(function (result) {
  //           console.log(result);
  //           setUnitTitle("");
  //           // setModuleDescription("");
  //           // window.location.reload();
  //         });
  //       } else {
  //         console.log(response);
  //       }
  //     });
  //   }
  // };

  return (
    <div className="">
      {showUnitList && (
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
                        className="accordion-button collapsed unit-button w-100"
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
                        <div className="video-sections">
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "15%",
                            }}
                          >
                            <h5>Add Content</h5>
                            <i
                              class="bi bi-plus-circle plus-icon"
                              onClick={() => setShowUnitContent(true)}
                            ></i>
                          </div>
                          <div className="file-content">
                            <ul className="outer-ul">
                              {unitFiles.length === 0 ||
                              unitFiles.detail ==
                                "No files found for this unit."
                                ? unitFiles.detail
                                : unitFiles &&
                                  unitFiles.map((file) => {
                                    return (
                                      <li
                                        key={file.id}
                                        className="outer-ul-list"
                                      >
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
                          {
                            showUnitContent && <div className="unit-form-section">
                            <form className="unit-form">
                              <div className="unit-video-section">
                                <div className="unit-selection-section unit-selection-section-video">
                                  <span className="unit-form-span-title">
                                    Video
                                  </span>
                                  <i
                                    class="bi bi-plus-circle plus-icon unit-form-i-title"
                                    ref={videoAddRef}
                                    onClick={(e) => hanldeVideoUpload(e)}
                                  ></i>
                                </div>
                                <div
                                  className="unit-field-section unit-video-main-container"
                                  id="hide-field"
                                  ref={videoFieldRef}
                                >
                                  <div
                                    className="unit-video-fields"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      className="video-title-field"
                                      value={videoTitle}
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
                                    <i
                                      class="bi bi-x check-unit-content text-danger"
                                      onClick={() => handleAddVido()}
                                    ></i>
                                  </div>
                                </div>
                              </div>
                              <div className="slides-section">
                                <div className="unit-selection-section">
                                  <span className="unit-form-span-title">
                                    Slide
                                  </span>
                                  <i
                                    class="bi bi-plus-circle plus-icon unit-form-i-title"
                                    ref={slideSelector}
                                    onClick={() => hanldeSlideUpload()}
                                  ></i>
                                </div>
                                <div
                                  className="unit-field-section"
                                  ref={slideSection}
                                  id="hide-field"
                                >
                                  <input
                                    type="file"
                                    className="slide-field"
                                    ref={slideFieldRef}
                                    onChange={handleUnitSlide}
                                    style={{ display: "none" }}
                                  />
                                  <span>{unitSlide && unitSlide.name}</span>
                                  <i
                                    class="bi bi-check-lg check-unit-content text-success"
                                    onClick={(e) => handleUploadFile(e)}
                                  ></i>
                                  <i
                                    class="bi bi-x check-unit-content text-danger"
                                    onClick={() => handleRemoveSlide()}
                                  ></i>
                                </div>
                              </div>
                              <div className="pdf-section">
                                <div className="unit-selection-section">
                                  <span className="unit-form-span-title">
                                    PDF
                                  </span>
                                  <i
                                    class="bi bi-plus-circle plus-icon unit-form-i-title"
                                    ref={pdfSelector}
                                    onClick={() => hanldePDFUpload()}
                                  ></i>
                                </div>
                                <div
                                  className="unit-field-section"
                                  id="hide-field"
                                  ref={pdfSection}
                                >
                                  <input
                                    type="file"
                                    className="pdf-field"
                                    onChange={(e) => handleUnitPDF(e)}
                                    ref={pdfFieldRef}
                                    style={{ display: "none" }}
                                  />
                                  <span>{unitPDF && unitPDF.name}</span>
                                  <i
                                    class="bi bi-check-lg check-unit-content text-success"
                                    onClick={(e) => handleUploadFile(e)}
                                  ></i>
                                  <i
                                    class="bi bi-x check-unit-content text-danger"
                                    onClick={() => handleRemovePDF()}
                                  ></i>
                                </div>
                              </div>
                              <div className="assignment-section">
                                <div className="unit-selection-section">
                                  <span className="unit-form-span-title">
                                    Assignment
                                  </span>
                                  <i
                                    class="bi bi-plus-circle plus-icon unit-form-i-title"
                                    onClick={() => handleAssignment()}
                                  ></i>
                                </div>
                              </div>
                            </form>
                          </div>
                          }

                        </div>
                        <div className="slide-section"></div>
                        <div className="pdf-section"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      )}
      <div className="">
        {showAddUnit &&
          listUnit.length !== 0 &&
          listUnit.map((element) => {
            if (element == 0) {
              return null;
            } else {
              return (
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
                      <button
                        type="button"
                        className="btn btn-close"
                        onClick={() => {
                          setListUnit(() =>
                            listUnit.filter((module) => {
                              return module !== element;
                            })
                          );
                        }}
                      ></button>
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
                        <div className="unit-selection-section  unit-selection-section-video">
                          <span className="unit-form-span-title">Video</span>
                          <i
                            class="bi bi-plus-circle plus-icon unit-form-i-title"
                            ref={videoAddRef}
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
                              value={videoTitle}
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
                            <i
                              class="bi bi-x check-unit-content text-danger"
                              onClick={() => handleAddVido()}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="slides-section">
                        <div className="unit-selection-section">
                          <span className="unit-form-span-title">Slide</span>
                          <i
                            class="bi bi-plus-circle plus-icon unit-form-i-title"
                            ref={slideSelector}
                            onClick={() => hanldeSlideUpload()}
                          ></i>
                        </div>
                        <div
                          className="unit-field-section"
                          ref={slideSection}
                          id="hide-field"
                        >
                          <input
                            type="file"
                            className="slide-field"
                            ref={slideFieldRef}
                            onChange={handleUnitSlide}
                            style={{ display: "none" }}
                          />
                          <span>{unitSlide && unitSlide.name}</span>
                          <i
                            class="bi bi-check-lg check-unit-content text-success"
                            onClick={(e) => handleUploadFile(e)}
                          ></i>
                          <i
                            class="bi bi-x check-unit-content text-danger"
                            onClick={() => handleRemoveSlide()}
                          ></i>
                        </div>
                      </div>
                      <div className="pdf-section">
                        <div className="unit-selection-section">
                          <span className="unit-form-span-title">PDF</span>
                          <i
                            class="bi bi-plus-circle plus-icon unit-form-i-title"
                            ref={pdfSelector}
                            onClick={() => hanldePDFUpload()}
                          ></i>
                        </div>
                        <div
                          className="unit-field-section"
                          id="hide-field"
                          ref={pdfSection}
                        >
                          <input
                            type="file"
                            className="pdf-field"
                            onChange={(e) => handleUnitPDF(e)}
                            ref={pdfFieldRef}
                            style={{ display: "none" }}
                          />
                          <span>{unitPDF && unitPDF.name}</span>
                          <i
                            class="bi bi-check-lg check-unit-content text-success"
                            onClick={(e) => handleUploadFile(e)}
                          ></i>
                          <i
                            class="bi bi-x check-unit-content text-danger"
                            onClick={() => handleRemovePDF()}
                          ></i>
                        </div>
                      </div>
                      <div className="assignment-section">
                        <div className="unit-selection-section">
                          <span className="unit-form-span-title">
                            Assignment
                          </span>
                          <i
                            class="bi bi-plus-circle plus-icon unit-form-i-title"
                            onClick={() => handleAssignment()}
                          ></i>
                        </div>
                        <div className="unit-field-section"></div>
                      </div>

                      <div className="saveModule-button-section">
                        <button
                          type="button"
                          onClick={(e) => handleSaveUnit(moduleId)}
                          className="btn btn-secondary saveUnit-button"
                        >
                          Save Unit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              );
            }
          })}

        <div className="add-unit-btn">
          <button
            type="button"
            className="btn"
            onClick={() => {
              handleShowAddUnit();
              setIncrement((pre) => pre + 1);
              setListUnit((pre) => [...pre, increment + 1]);
            }}
          >
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

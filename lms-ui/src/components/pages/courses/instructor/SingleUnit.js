import React, { useRef, useState } from "react";
import AddUnit from "./AddUnit";

const SingleUnit = ({ unit, setUnitId }) => {

    const startDateRefUnit = useRef(null);
    const endDateRefUnit = useRef(null);
    const [showUnitContent, setShowUnitContent] = useState(false);

    const [unitFiles, setUnitFiles] = useState([]);
    const [unitVideos, setUnitVideos] = useState([]);

  const [unitTitle, setUnitTitle] = useState(unit.title);
  const [unitStart, setUnitStart] = useState("2023-12-25");
  const [unitEnd, setUnitEnd] = useState("2023-12-25");
  const [visibility, setVisibility] = useState("");

  const handlUnitStart = (e) => {
    // startDateRefUnit.current.removeAttribute("className", "unit-start-field");
    // startDatePickerRefUnit.current.setAttribute("className", "unit-start-field");
    setUnitStart(e.target.value);
  };
  const handlUnitEnd = (e) => {
    // endDateRefUnit.current.removeAttribute("className", "unit-end-field");
    // endDatePickerRefUnit.current.setAttribute("className", "unit-end-field");
    setUnitEnd(e.target.value);
  };

  const handleVisibility = (e) => {
    setVisibility(e.target.value);
  };

  const handleUnitTitle = (e) => {
    setUnitTitle(e.target.value);
  };



  const handleUnitContent = (id) => {
    setUnitId(id);

      //      Unit File API 
    fetch(`http://127.0.0.1:8000/api/units/${id}/files`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if(response.status === 200){
      response.json().then(function (result) {
        setUnitFiles(result);
      });
    }
    else {
      console.log(response);
      setUnitFiles([])
    }
    });

       //      Unit Video API 
    fetch(`http://127.0.0.1:8000/api/units/${id}/videos`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if(response.status === 200){
      response.json().then(function (result) {
        setUnitVideos(result);
      });
    }
    else {
      console.log(response);
      setUnitVideos([])
    }
    });
  };



  return (
    <div
      type="button"
      className="accordion-item mb-3 mt-0 unitSection"
      role="button"
      aria-expanded="false"
      onClick={(e) => {
        handleUnitContent(unit.id);
        e.stopPropagation();
      }}
    >
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
                value={unitTitle}
                className="unitTitle"
                onChange={(e) => handleUnitTitle(e)}
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

            <div className="btn-group dropstart">
              <i
                className="bi bi-three-dots-vertical "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => e.stopPropagation()}
              ></i>
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
        </div>
      </h2>
      <div
        id={`unit${unit.id}`}
        className="accordion- collapse"
        aria-labelledby={`flush-unit${unit.id}`}
        // data-bs-parent="#unit-section"
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
            ></div>
            <div className="file-content">
              <table className="table table-striped ">
                <caption className="caption-top mb-0 text-success">
                  <strong>Unit Files</strong>
                </caption>
                {unitFiles.length === 0 ? (
                  "No File Found"
                ) : (
                  <>
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">type</th>
                        <th scope="col">File</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {unitFiles &&
                        unitFiles.map((file, index) => {
                          return (
                            <tr key={file.id}>
                              <td>{index + 1}</td>
                              <td>{file.title.slice(0, 20)}...</td>
                              <td>{file.file.split(".").slice(-1)}</td>
                              <td>
                                <a href={file.file} target="_blank">
                                  {file.file.substr(34)}
                                </a>
                              </td>
                              <td>{file.created_at}</td>
                              <td colspan="2">
                                {/* {String(file.is_active).toUpperCase()} */}
                                <ul className="unit-content-file-vidoe-options">
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
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </>
                )}
              </table>
              <hr />

              <table className="table table-striped ">
                <caption className="caption-top mb-0 text-warning">
                  <strong>Unit Videos</strong>
                </caption>
                {unitVideos.length === 0 ? (
                  "No Video Found"
                ) : (
                  <>
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Video</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Action</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {unitVideos &&
                        unitVideos.map((video, index) => {
                          return (
                            <tr key={video.id}>
                              <td>{index + 1}</td>
                              <td>{video.title.slice(0, 20)}...</td>
                              <td>
                                <a href={video.url} target="_blank">
                                  {video.url}
                                </a>
                              </td>
                              <td>{video.created_at}</td>
                              <td colspan="2">
                                {/* {String(file.is_active).toUpperCase()} */}
                                <ul className="unit-content-file-vidoe-options">
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
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </>
                )}
              </table>

              {/* <ul className="outer-ul">
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
                      </li>
                    );
                  })}
            </ul> */}
            </div>
            <div className="add-content-unit">
              <h5>Add Content</h5>
              <i
                className="bi bi-plus-circle plus-icon"
                onClick={() => setShowUnitContent((pre) => !pre)}
              ></i>
            </div>

            {showUnitContent && (
              <AddUnit />
            )}
           
          </div> 
          <div className="slide-section"></div>
          <div className="pdf-section"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleUnit;

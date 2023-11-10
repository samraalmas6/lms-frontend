import React, { useContext, useEffect, useRef, useState } from "react";
import AddUnit from "./AddUnit";
import { ModuleProbs } from "./CourseModule";
// import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SingleUnit = ({ unit, setUnitId }) => {
  const userId = sessionStorage.getItem("user_id");
  const navigate = useNavigate();
  const { moduleId } = useContext(ModuleProbs);
  const accordion = useRef(null);

  const startDateRefUnit = useRef(null);
  const endDateRefUnit = useRef(null);
  const [showUnitContent, setShowUnitContent] = useState(false);
  const [fileShow, setFileShow] = useState(false);
  const [vidoShow, setVideoShow] = useState(false);
  const [assignmentShow, setAssignmentShow] = useState(false);

  const [unitFiles, setUnitFiles] = useState([]);
  const [unitVideos, setUnitVideos] = useState([]);
  const [unitAssignment, setUnitAssignment] = useState([]);

  const [unitTitle, setUnitTitle] = useState(unit.title);
  const [unitStart, setUnitStart] = useState("2023-12-25");
  const [unitEnd, setUnitEnd] = useState("2023-12-25");
  const [visibility, setVisibility] = useState("");
  const [userName, setUserName] = useState("");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUsers = () => {
      fetch("http://127.0.0.1:8000/list_all_users/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setUserData(result);
          });
        } else {
          console.log(response);
        }
      });
    };
    getUsers();
  }, []);

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
    setVisibility(!visibility);

    const obj = {
      title: unitTitle,
      is_active: !visibility,
      start_date: unitStart,
      end_date: unitEnd,
      module: moduleId,
      updated_by: sessionStorage.getItem("user_id"),
    };

    fetch(`http://127.0.0.1:8000/api/units/${unit.id}/`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log(result);
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleUnitTitle = (e) => {
    setUnitTitle(e.target.value);
  };

  const preventAccordionClose = () => {
    accordion.current.setAttribute("data-bs-toggle", "");
  };
  const preventAccordionOpen = () => {
    accordion.current.setAttribute("data-bs-toggle", "collapse");
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
      if (response.status === 200) {
        response.json().then(function (result) {
          setUnitFiles(result);
        });
      } else {
        console.log(response);
        setUnitFiles([]);
      }
    });

    //      Unit Video API
    fetch(`http://127.0.0.1:8000/api/units/${id}/videos`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          setUnitVideos(result);
        });
      } else {
        console.log(response);
        setUnitVideos([]);
      }
    });

    //      Assignment API
    fetch(`http://127.0.0.1:8000/api/units/${id}/assignments`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          setUnitAssignment(result);

          // Fetch user data for each assignment
          result.forEach((assignment) => {
            const userId = assignment.updated_by;
            // fetchUserData(userId);
          });
        });
      } else {
        console.log(response);
        setUnitAssignment([]);
      }
    });

    // Function to fetch user data for a specific ID
    // const fetchUserData = async (id) => {
    //   try {
    //     const response = await fetch(
    //       `http://127.0.0.1:8000/list_single_user/${id}/`,
    //       {
    //         method: "GET",
    //         headers: {
    //           Authorization: `Token ${sessionStorage.getItem("user_token")}`,
    //         },
    //       }
    //     );

    //     if (response.status === 200) {
    //       const user = await response.json();
    //       setUserData((prevUserData) => ({
    //         ...prevUserData,
    //         [id]: user,
    //       }));
    //     } else {
    //       console.error("Error fetching user data:", response);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // };
  };

  const getUSerFullName = (id) => {
    if (id) {
      const name = userData.filter((users) => users.id === id);
      return `${name[0].first_name} ${name[0].last_name}`;
    } else {
      return "N/A";
    }
  };

  const handleAssignmentClick = (id) => {
    navigate("/course/create-assignment", {
      state: { assignmentId: id, showContent: true },
    });
  };

  const handleDeleteUnit = (unit, deleted) => {
    let action = "";
    if (deleted) {
      action = "Delete";
    } else {
      action = "Restore";
    }
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#d33",
    //   cancelButtonColor: "#3085d6",
    //   confirmButtonText: `${action}`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
        const obj = {
          title: unit.title,
          is_updated: true,
          is_delete: deleted,
          created_by: unit.created_by,
          module: unit.module,
          updated_by: userId,
        };

        fetch(`http://127.0.0.1:8000/api/units/${unit.id}/`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 200) {
            response.json().then(function (result) {
              console.log("Api result: ", result);
              // Swal.fire(
              //   `${action}!`,
              //   `${unit.title} has been ${action}.`,
              //   "success"
              // ).then((res) => {
              //   navigate(-1);
              // });
              // setCourseContent((pre) => [...pre, result]);
              // setCourseCreator(result.created_by);
              // setCourseCategory("");
              // setCourseTitle("");
              //
            });
          } else {
            console.log(response);
          }
        // });
      // }
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
          ref={accordion}
        >
          <div className="module-heading-container">
            <div className="">
              <span className="me-3">Unit</span>
              <span>{unitTitle}</span>
              {/* <input
                type="text"
                placeholder="Unit Title"
                value={unitTitle}
                className="unitTitle"
                onChange={(e) => handleUnitTitle(e)}
                required
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
              /> */}
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
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
              />
              <label>End Date:</label>
              <input
                type="date"
                value={unitEnd}
                onChange={(e) => handlUnitEnd(e)}
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
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
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
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
                        checked={visibility}
                        onChange={handleVisibility}
                        id="flexSwitchCheckDefault"
                        onMouseEnter={preventAccordionClose}
                        onMouseLeave={preventAccordionOpen}
                      />
                    </div>
                  </li>
                  <li>
                    {unit.length !== 0 && unit.is_delete ? (
                      <i
                        className="bi bi-recycle text-success"
                        onMouseEnter={preventAccordionClose}
                        onMouseLeave={preventAccordionOpen}
                        onClick={() => handleDeleteUnit(unit, false)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-trash text-danger"
                        onClick={() => handleDeleteUnit(unit, true)}
                        onMouseEnter={preventAccordionClose}
                        onMouseLeave={preventAccordionOpen}
                      ></i>
                    )}
                  </li>
                  <li>
                    <i
                      className="bi bi-copy text-info"
                      onMouseEnter={preventAccordionClose}
                      onMouseLeave={preventAccordionOpen}
                    ></i>
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
              <div
                className="caption-top mb-0 text-success unit-file-heading mb-3"
                onClick={() => setFileShow(!fileShow)}
              >
                <div
                  className=""
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="course-line btn-info"></div>
                  <strong className="text-info">Unit Files</strong>
                  <div className="collapse-icon-course ms-3">
                    <i class="fa fa-chevron-circle-down text-info"></i>
                  </div>
                </div>

                <div className="course-line btn-info"></div>
              </div>
              {fileShow && (
                <table className="table table-striped ">
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
              )}

              {/************ Video Section ****************/}
              <div
                className="caption-top mb-0 text-success unit-video-heading mb-3"
                onClick={() => setVideoShow(!vidoShow)}
              >
                <div
                  className=""
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="course-line btn-success"></div>
                  <strong className="text-success">Unit Videos</strong>
                  <div className="collapse-icon-course ms-3">
                    <i class="fa fa-chevron-circle-down text-success"></i>
                  </div>
                </div>

                <div className="course-line btn-success"></div>
              </div>
              {vidoShow && (
                <table className="table table-striped ">
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
                          <th scope="col">Updated By</th>
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
                                <td>{getUSerFullName(video.updated_by)}</td>
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
              )}

              {/************ Assignment Section ****************/}
              <div
                className="caption-top mb-0 text-success unit-assignment-heading mb-3"
                onClick={() => setAssignmentShow(!assignmentShow)}
              >
                              <div
                  className=""
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="course-line btn-secondary"></div>
                  <strong className="text-secondary">Unit Assignments</strong>
                  <div className="collapse-icon-course ms-3">
                    <i class="fa fa-chevron-circle-down text-secondary"></i>
                  </div>
                </div>

                <div className="course-line btn-secondary"></div>
              </div>
              {assignmentShow && (
                <table className="table table-striped ">
                  {unitAssignment.length === 0 ? (
                    "No Assignment Found"
                  ) : (
                    <>
                      <thead className="table-light">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Title</th>
                          <th scope="col">Description</th>
                          <th scope="col">Due Date</th>
                          <th scope="col">Updated By</th>
                          <th scope="col">Action</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {unitAssignment &&
                          unitAssignment.map((assignment, index) => {
                            const userId = assignment.updated_by;
                            const userName = userData[userId]
                              ? `${userData[userId].first_name} ${userData[userId].last_name}`
                              : "none";
                            return (
                              <tr
                                key={assignment.id}
                                onClick={() =>
                                  handleAssignmentClick(assignment.id)
                                }
                              >
                                <td>{index + 1}</td>
                                <td>{assignment.title.slice(0, 20)}...</td>
                                <td>{assignment.description}</td>
                                <td>{assignment.due_date}</td>
                                {/* <td>{assignment.updated_by}</td> */}
                                <td>
                                  {getUSerFullName(assignment.updated_by)}
                                </td>
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
              )}
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
              <AddUnit
                setUnitVideos={setUnitVideos}
                setUnitFiles={setUnitFiles}
              />
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

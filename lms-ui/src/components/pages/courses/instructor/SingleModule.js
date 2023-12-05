import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CourseUnit from "./CourseUnit";
import { CourseProbs } from "../../../../App";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2';
export const ModuleProbs = createContext(null);

const SingleModule = ({ module, setModuelContent, setModuleId }) => {
  const userId = sessionStorage.getItem("user_id");
  const startDateRefModule = useRef(null);
  const endDateRefModule = useRef(null);
  const { courseId } = useContext(CourseProbs);
  const accordion = useRef(null);
  const [openModule, setOpenModule] = useState(false)
  const [moduleTitle, setModuleTitle] = useState(module.title);
  const [moduleStart, setModuleStart] = useState(module.start_date);
  const [moduleEnd, setModuleEnd] = useState(module.end_date);
  const [visibility, setVisibility] = useState(module.is_active);
  const [editModule, setEditModule] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [unitData, setUnitData] = useState([]);

  const preventAccordionClose = () => {
    accordion.current.setAttribute("data-bs-toggle", "");
  };
  const preventAccordionOpen = () => {
    accordion.current.setAttribute("data-bs-toggle", "collapse");
  };

  const handleModuleTitle = (e) => {
    setModuleTitle(e.target.value);
  };

  const handleUpdateTitle = (e, id) => {
    console.log("inside update function");
    if (e.key === "Enter" || e.type === "contextmenu") {
      e.preventDefault();
      console.log("title", moduleTitle, id);

      const obj = {
        title: moduleTitle,
        instructor: module.instructor,
        course: module.course,
        updated_by: userId,
      };

      fetch(`http://127.0.0.1:8000/api/modules/${id}/`, {
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
            setEditModule(false);
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };
  const handlModuleStart = (e) => {
    // startDateRefModule.current.removeAttribute("className", "module-start-field");
    // startDatePickerRefModule.current.setAttribute(
    //   "className",
    //   "module-start-field"
    // );
    setModuleStart(e.target.value);
  };
  const handlModuleEnd = (e) => {
    // endDateRefModule.current.removeAttribute("className", "module-end-field");
    // endDatePickerRefModule.current.setAttribute("className", "module-end-field");
    setModuleEnd(e.target.value);
  };

  const handleVisibility = (e) => {
    setVisibility(!visibility);

    const obj = {
      title: moduleTitle,
      is_active: !visibility,
      start_date: moduleStart,
      end_date: moduleEnd,
      course: courseId,
      instructor: module.instructor,
      updated_by: sessionStorage.getItem("user_id"),
    };

    fetch(`http://127.0.0.1:8000/api/modules/${module.id}/`, {
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
          Swal.fire({
            icon: "success",
            text: `${result.title} has been ${
              result.is_active ? "activated" : "deactivated"
            }`,
          });
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleDeleteModule = (module, deleted) => {
    let action = "";
    if (deleted) {
      action = "Delete";
    } else {
      action = "Restore";
    }
    Swal.fire({
      title: "Attention",
      text: `Do you want to ${action} this module?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          title: module.title,
          is_updated: true,
          is_delete: deleted,
          instructor: module.instructor,
          course: module.course,
          updated_by: userId,
        };

        fetch(`http://127.0.0.1:8000/api/modules/${module.id}/`, {
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
              Swal.fire(
                `${action}d!`,
                `${module.title} has been ${action}d.`,
                "success"
              ).then((res) => {
                window.location.reload();
              });
            });
          } else {
            console.log(response);
          }
        });
      }
    });
  };

  const handleModuleContent = (module) => {
    setModuleId(module.id);
    fetch(`http://127.0.0.1:8000/api/modules/${module.id}/units`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          const activeUnit = result.filter((unit) => unit.is_delete === false);
          if (sessionStorage.getItem("role") === "admin") {
            setUnitData(result);
          } else {
            setUnitData(activeUnit);
          }
        });
      } else {
        console.log(response);
        setUnitData([]);
      }
    });
  };

  const handleOpenModule = (id) => {
    var collapse = document.getElementById(id);
    if (collapse && openModule) {
      collapse.classList.add("show");
      setOpenModule(false)
    }
    else {
      collapse.classList.remove("show")
      setOpenModule(true)
    }
  };
  return (
    <div
      type="button"
      className="accordion-item mb-1 "
      role="button"
      onClick={(e) => {
        // showModuleList();
        // setUnitContent(unit)
        e.stopPropagation();
        handleModuleContent(module);
        setModuelContent(() => module);
      }}
    >
      <h2
        className="accordion-header module-collapse-button"
        id={`flush-module${module.id}`}
      >
        <div
          className="accordion-button collapsed module-button w-100  "
          type="button"
          onClick={() => {
            handleOpenModule(`module${module.id}`);
          }}
          // data-bs-toggle="collapse"
          // data-bs-target={`#module${module.id}`}
          // aria-expanded="false"
          // aria-controls={`flush-module${module.id}`}
          ref={accordion}
          // onClick={(e) => e.stopPropagation()}
        >
          <div
            className="module-heading-container"
            onMouseEnter={() => setShowEditBtn(true)}
            onMouseLeave={() => setShowEditBtn(false)}
          >
            <div
              className={`${
                module.is_delete
                  ? "deleted-content module-heading-container-title"
                  : " module-heading-container-title"
              }`}
            >
              <span
                className={`${
                  module.is_delete ? "deleted-content me-3" : "me-3"
                }`}
              >
                MODULE
              </span>
              {editModule ? (
                <input
                  type="text"
                  autoFocus
                  placeholder="Module Title"
                  value={moduleTitle}
                  disabled={module.is_delete}
                  className="moduleTitle w-50 course-module-title"
                  onChange={(e) => {
                    handleModuleTitle(e);
                  }}
                  required
                  onKeyDown={(e) => handleUpdateTitle(e, module.id)}
                  onContextMenu={(e) => handleUpdateTitle(e, module.id)}
                  onMouseEnter={preventAccordionClose}
                  onMouseLeave={preventAccordionOpen}
                />
              ) : (
                <span className="course-module-title w-50">
                  {moduleTitle}
                  {showEditBtn && (
                <i
                  className="bi bi-pencil ms-2 module-edit-btn"
                  onClick={(e) => {
                  
                    e.preventDefault();
                    setEditModule(true);
                  }}
                ></i>
              )}
                </span>
              )}
            
            </div>
            <div className={`${module.is_delete ? "deleted-content" : ""}`}>
              <label>Start Date:</label>
              {/* <i
              className="bi bi-calendar-date date-picker"
              role="button"
              ref={startDatePickerRefModule}
              onClick={() =>
                startDateRefModule.current.showPicker()
              }
            ></i> */}
              <input
                type="date"
                value={moduleStart}
                className={`${
                  module.is_delete
                    ? "deleted-content module-start-fiel"
                    : "module-start-fiel"
                }`}
                ref={startDateRefModule}
                id="module-date-field"
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
                onChange={(e) => handlModuleStart(e)}
              />
              <label>End Date:</label>
              {/* <i
              className="bi bi-calendar-date date-picker"
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
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
                className={`${
                  module.is_delete
                    ? "deleted-content module-end-fiel"
                    : "module-end-fiel"
                }`}
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
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
              ></i>
              <div className="dropdown-menu option-main-container module-option">
                <ul className="option-ul" style={{ display: "flex" }}>
                  <li>
                    <div className="form-check form-switch visibility">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        role="switch"
                        checked={visibility}
                        value={visibility}
                        onMouseEnter={preventAccordionClose}
                        onMouseLeave={preventAccordionOpen}
                        onChange={handleVisibility}
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </li>
                  <li>
                    {module.length !== 0 && module.is_delete ? (
                      <i
                        className="bi bi-recycle text-success"
                        onMouseEnter={preventAccordionClose}
                        onMouseLeave={preventAccordionOpen}
                        onClick={() => handleDeleteModule(module, false)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-trash text-danger"
                        onClick={() => handleDeleteModule(module, true)}
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
        id={`module${module.id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`flush-module${module.id}`}
        // data-bs-parent="#module-section"
      >
        <div className="accordion-body">
          <ModuleProbs.Provider>
            <CourseUnit
              showUnit={true}
              unitData={unitData}
              setUnitData={setUnitData}
            />
          </ModuleProbs.Provider>
        </div>
      </div>
    </div>
  );
};

export default SingleModule;

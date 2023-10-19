import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import CourseUnit from "./CourseUnit";
import { CourseProbs } from "./AllCourses";
export const ModuleProbs = createContext(null);

const SingleModule = ({ module, setModuelContent, handleModuleContent }) => {
  const startDateRefModule = useRef(null);
  const endDateRefModule = useRef(null);
  const { courseId } = useContext(CourseProbs);
  const accordion = useRef(null);

  const [moduleTitle, setModuleTitle] = useState(module.title);
  const [moduleStart, setModuleStart] = useState(module.start_date);
  const [moduleEnd, setModuleEnd] = useState(module.end_date);
  const [visibility, setVisibility] = useState(module.is_active);

  const preventAccordionClose = () => {
    accordion.current.setAttribute("data-bs-toggle", "");
  };
  const preventAccordionOpen = () => {
    accordion.current.setAttribute("data-bs-toggle", "collapse");
  };

  const handleModuleTitle = (e) => {
    setModuleTitle(e.target.value);
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
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  return (
    <div
      // type="button"
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
          className="accordion-button collapsed module-button w-100 "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#module${module.id}`}
          aria-expanded="false"
          aria-controls={`flush-module${module.id}`}
          ref={accordion}
          // onClick={(e) => e.stopPropagation()}
        >
          <div className="module-heading-container">
            <div className="">
              <span className="me-3">MODULE</span>
              <input
                type="text"
                placeholder="Module Title"
                value={moduleTitle}
                className="moduleTitle"
                onChange={(e) => {
                  handleModuleTitle(e);
                }}
                required
                onMouseEnter={preventAccordionClose}
                onMouseLeave={preventAccordionOpen}
                // onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="">
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
                className="module-start-fiel"
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
                className="module-end-fiel"
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
                    <i
                      className="bi bi-trash text-danger"
                      onClick={() => null}
                      onMouseEnter={preventAccordionClose}
                      onMouseLeave={preventAccordionOpen}
                    ></i>
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
            <CourseUnit showUnit={true} />
          </ModuleProbs.Provider>
        </div>
      </div>
    </div>
  );
};

export default SingleModule;

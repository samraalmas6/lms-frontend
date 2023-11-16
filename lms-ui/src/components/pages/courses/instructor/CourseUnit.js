import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import UpdateUnit from "./UpdateUnit";
import { useNavigate } from "react-router-dom";
import { ModuleProbs } from "./CourseModule";
import SingleUnit from "./SingleUnit";
import AddUnit from "./AddUnit";
import '../../../styles/CourseUnit.css'
import { CourseProbs } from "../../../../App";
export const UnitProbs = createContext(null);

const CourseUnit = ({ showUnit, unitData, setUnitData }) => {
  //  ************************* Unit Ref Hooks  ********************
  // ***************************************************************
  const userId = sessionStorage.getItem("user_id");
  const {  moduleId, unitTitle, setUnitTitle } =
    useContext(ModuleProbs);
    const {instructor, setInstructor} = useContext(CourseProbs)
  
  // console.log('unit data', unitData);
  const startDateRefUnit = useRef(null);
  const endDateRefUnit = useRef(null);
  const startDatePickerRefUnit = useRef(null);
  const endDatePickerRefUnit = useRef(null);

  const [initUnitName, setInitUnitName] = useState(
    unitData.length === 0 ? Number(1) : Number(unitData.length)
  );
  const [unitId, setUnitId] = useState(null);
  const [unitStart, setUnitStart] = useState("2023-12-25");
  const [unitEnd, setUnitEnd] = useState("2023-12-25");
  const [visibility, setVisibility] = useState("");

  const [increment, setIncrement] = useState(0);
  const [listUnit, setListUnit] = useState([0]);

  const [showAddUnit, setShowAddUnit] = useState(!showUnit);
  const [showUnitList, setShoshowUnitList] = useState(showUnit);

  useEffect(() => {
    if(unitData.length !== 0 ){
      setInstructor(unitData[0].instructor)
    }
    setInitUnitName(
      unitData.length === 0 ? Number(1) : Number(unitData.length + 1)
    );
  }, [unitData]);

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

  const handleShowAddUnit = () => {
    // setShowAddUnit(true);
  };

  const handleSaveUnit = (unitTitle) => {
    setUnitTitle(unitTitle);
    // e.preventDefault();
    if (unitTitle) {
      const obj = {
        title: unitTitle,
        description: "Unit Test Description",
        start_date: unitStart,
        end_date: unitEnd,
        module: moduleId,
        updated_by: userId,
        instructor
      };
      fetch("http://127.0.0.1:8000/api/units/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            setInitUnitName((pre) => Number(pre + 1));
            // setUnitTitle("");
            setUnitData(pre => [...pre, {result}])
            setUnitId(() => result.id);
            // setModuleDescription("");
            // window.location.reload();
            console.log('unit', result);
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  return (
    <div className="">
      {showUnitList && (
        <div
          className="accordion accordion-flush module-unit-section"
          id="unit-section"
        >
          {/* <h1 className="text-center rounded unit-list-heading" >Units</h1> */}
          {unitData.length === 0
            ? "No Unit Found"
            : unitData &&
              unitData.map((unit) => {
                return (
                  <UnitProbs.Provider value={{ unitId }}>
                    <SingleUnit
                      key={unit.id}
                      unit={unit}
                      setUnitId={setUnitId}

                      // handleUnitContent={handleUnitContent}
                    ></SingleUnit>
                  </UnitProbs.Provider>
                );
              })}
        </div>
      )}
      <div className="">
        {showAddUnit &&
          listUnit.length !== 0 &&
          listUnit.map((element) => {
            if (element === 0) {
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
                        className="bi bi-calendar-date date-picker"
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
                        className="bi bi-calendar-date date-picker"
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
                          setListUnit(() =>
                            listUnit.filter((module) => {
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
                  <UnitProbs.Provider value={{ unitId }}>
                    <AddUnit />
                  </UnitProbs.Provider>
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
              handleSaveUnit("Unit " + initUnitName);
              setIncrement((pre) => pre + 1);
              setListUnit((pre) => [...pre, increment + 1]);
            }}
          >
            Add Unit <i className="bi bi-plus-circle plus-icon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseUnit;

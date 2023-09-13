import React, { useRef, useState } from "react";
import CourseModule from "./CourseModule";
import UpdateUnit from "./UpdateUnit";

const LeasonForm = ({ minDate, setShowUnit, setUnitData, showUnitContent, setShowUnitContent, unitContent }) => {



  const [showForm, setShowForm] = useState(true);
  const [show, setShow] = useState("");

  // const showUnitList = () => {
  //   setShow("show");
  // };
  return (
    <div className="ms-5">
      {/* <div className="unitData-section">
        {unitData.length === 0 ? (
          "No Unit Added"
        ) : (
          <ul className="units d-grid gap-2 w-50">
            {unitData && unitData.map((unit) => {
              return (
                <li
                  key={unit.id}
                  type="button"
                  className="text-start ms-0 ps-2"
                  onClick={() => {
                    showUnitList()
                    setUnitContent(unit)
                  }}
                >
                  <span>{unit.title}</span><i class="fas fa-solid fa-caret-up"></i>
                </li>
              );
            })}
          </ul>
        )}
      </div> */}
      <UpdateUnit setShowUnit={setShowUnit} setUnitData={setUnitData} minDate={minDate}/>
      <div
        className={`offcanvas offcanvas-top unit-list-show ${showUnitContent}`}
        id="show-unit"
        tabindex="-1"
      >
        <div
          className={"styles.addBtnSection"}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3>Update Unit</h3>
          <button
            type="button"
            onClick={() => setShowUnitContent("")}
            className="btn btn-close text-danger"
          ></button>
        </div>
        <UpdateUnit setShowUnit={setShowUnit} unitContent={unitContent}  minDate={minDate} setUnitData={setUnitData}/>
      </div>
    </div>
  );
};

export default LeasonForm;

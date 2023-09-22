import React, { useRef, useState } from "react";
import CourseModule from "./CourseModule";
import UpdateUnit from "./UpdateUnit";

const LeasonForm = ({ minDate, setShowUnit, setUnitData, showUnitContent, setShowUnitContent, unitContent }) => {



  const [showForm, setShowForm] = useState(true);
  const [show, setShow] = useState("");

  return (
    <div className="ms-5">
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

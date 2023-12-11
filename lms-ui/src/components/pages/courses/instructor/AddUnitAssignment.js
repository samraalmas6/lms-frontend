import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CourseProbs } from "../../../../App";
import { UnitProbs } from "./CourseUnit";

const AddUnitAssignment = () => {
  const { courseId, instructor } = useContext(CourseProbs);
  const { unitId } = useContext(UnitProbs);
  const navigate = useNavigate();

  const handleAssignment = () => {
    navigate("/course/create-assignment", {
      state: { unitId, courseId, instructor },
    });
  };

  return (
    <div>
      <div className="add-unit-assign-section">
        <div className="add-unit-assign-selection-section">
          <span className="unit-form-span-title">Add Assignment  <i
            className="bi bi-plus-circle plus-icon unit-form-i-title"
            onClick={() => handleAssignment()}
          ></i></span>
         
        </div>
      </div>
    </div>
  );
};

export default AddUnitAssignment;

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
      <div className="assignment-section">
        <div className="unit-selection-section">
          <span className="unit-form-span-title">Add Assignment</span>
          <i
            className="bi bi-plus-circle plus-icon unit-form-i-title"
            onClick={() => handleAssignment()}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default AddUnitAssignment;

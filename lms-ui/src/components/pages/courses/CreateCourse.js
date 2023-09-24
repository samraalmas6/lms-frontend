import React, { useRef, useState } from "react";
import "../../styles/Courses.css";
import AllCourse from "./AllCourses";

const CreateCourse = ({  }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;
  

















  // const [unitData, setUnitData] = useState([]);
  // const [moduleData, setModuleData] = useState([]);





  return (
    <div>
      <AllCourse show={'show'} 
      minDate={minDate}
      />
    </div>
  );
};

export default CreateCourse;

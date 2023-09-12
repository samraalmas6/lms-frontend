import React, { useRef, useState } from "react";
import courseData from "../../hooks/courseData";
import CourseModule from "./CourseModule";
import "../../styles/Courses.css";
import AllCourse from "./AllCourses";

const CreateCourse = ({  }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  const [courseCategory, setCourseCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseImg, setCourseImg] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [unitData, setUnitData] = useState([]);
  const [moduleData, setModuleData] = useState([]);


  // const handleSave = (e) => {
  //   e.preventDefault();
  //   if (courseTitle) {
  //     const obj = {
  //       id: courseData[courseData.length - 1].id + 1,
  //       course_title: courseTitle,
  //       author: "",
  //       duration: 25,
  //       users_enrolled: 0,
  //       last_updated: "3 hours ago",
  //     };
  //     courseData.push(obj);
  //   }
  //   setCourseCategory("");
  //   setCourseTitle("");
  // };


  return (
    <div>
      <AllCourse show={'show'} 
      courseTitle={courseTitle} setCourseTitle= {setCourseTitle}
      courseCategory={courseCategory} setCourseCategory={setCourseCategory}
      courseImg={courseImg} setCourseImg={setCourseImg}
      minDate={minDate}
      unitData={unitData}
      setUnitData= {setUnitData}
      moduleData={moduleData}
      setModuleData={setModuleData}
      // handleSave={handleSave}
      />
    </div>
  );
};

export default CreateCourse;

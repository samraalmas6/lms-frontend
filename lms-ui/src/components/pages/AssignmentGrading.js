import React, { useEffect, useState } from "react";
import assignmentData from "../content/Data/assignmentData";
import courseData from "../content/Data/courseData";
import courseModuleData from "../content/Data/courseModulesData";
import courseUnitData from "../content/Data/courseUnitData";
import userData from "../content/Data//userData";
import Collapse from "react-collapse";
import Filters from "../hooks/Filters"
import SubmittedAssignTable from "../content/SubmittedAssignTable";
import "../styles/AssignmentGrading.css";
const AssignmentGrading = () => {
  const data = [
    { id: 1, userName: "User 1", submissionDate: "2023-09-30", status: "Passed" },
    { id: 2, userName: "User 2", submissionDate: "2023-09-30", status: "Pending" },
    { id: 3, userName: "User 3", submissionDate: "2023-09-29", status: "Not Passed" },
    // Add more data here
  ];

  // const [courseData, setCourseData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [module, setModule] = useState([]);
  const [unit, setUnit] = useState([]);
  const [isItemOpen, setIsItemOpen] = useState(
    Array(courseData.length).fill(false)
  );
  const [isSubItemOpen, setIsSubItemOpen] = useState(
    Array(courseData.length).fill(false)
  );

  // useEffect(() => {
  //   setCourseData[courseData];
  // });
  // console.log("I am course data", courseData);

  const minLength = Math.min(
    courseData.length,
    courseModuleData.length,
    courseUnitData.length,
    assignmentData.length
  );

  const elements = [];

  for (let i = 0; i < minLength; i++) {
    elements.push(
      <h6 key={i}>
        {/* Course: */}
        {courseData[i].title},{/* Module:  */}
        {courseModuleData[i].title} /,
        {/* Unit: */}
        {courseUnitData[i].title}/,
        {/* assignment :  */}
        {assignmentData[i].assignment}
      </h6>
    );
  }

  const toggleItem = (index) => {
    const updatedIsItemOpen = [...isItemOpen];
    updatedIsItemOpen[index] = !updatedIsItemOpen[index];
    setIsItemOpen(updatedIsItemOpen);
  };

  const toggleSubItem = (index) => {
    const updatedIsSubItemOpen = [...isSubItemOpen];
    updatedIsSubItemOpen[index] = !updatedIsSubItemOpen[index];
    setIsSubItemOpen(updatedIsSubItemOpen);
  };

  // console.log(elements);

  const myFunction = () => {
    var input, filter, ul, li, a, i;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

  const filteredData =
    activeFilter === "All"
      ? data
      : data.filter((item) => item.status === activeFilter);


  return (
    <div className="grading-screen-main-container">
      <div className="filters-container">
        filters
          <div class="search-menu">
            {/* <h2>Menu</h2> */}
            <input
              type="text"
              id="mySearch"
              onkeyup="myFunction()"
              placeholder="Search for users ,units or courses"
              title="Type in a category"
            />
            {/* <ul id="myMenu">
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
      <li><a href="#">JavaScript</a></li>
      <li><a href="#">PHP</a></li>
      <li><a href="#">Python</a></li>
      <li><a href="#">jQuery</a></li>
      <li><a href="#">SQL</a></li>
      <li><a href="#">Bootstrap</a></li>
      <li><a href="#">Node.js</a></li>
    </ul> */}
          </div>
          <div>
      <Filters activeFilter={activeFilter} onChangeFilter={setActiveFilter} />
      <SubmittedAssignTable data={filteredData} />
    </div>
          </div>
        <div className="course-title">
          <h6>Course Data</h6>
          <ul>
            {courseData.map((course, index) => (
              <li key={course.id}>
                <button onClick={() => toggleItem(index)}>
                  {course.title}
                </button>
                <Collapse isOpened={isItemOpen[index]}>
                  <ul>
                    {elements.map((element, subIndex) => (
                      <li key={subIndex}>
                        <button onClick={() => toggleSubItem(subIndex)}>
                          {element}
                        </button>
                        <Collapse isOpened={isSubItemOpen[subIndex]}>
                          {/* Render your sub-item content here */}
                          <div>
                            {/* Module: */}
                            {module.title} /{/* Unit:{" "} */}
                            {courseUnitData[subIndex].title} /
                            {/* Assignment:{" "} */}
                            {assignmentData[subIndex].assignment}
                          </div>
                        </Collapse>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </li>
            ))}
          </ul>
        </div>
        <div className="table_container"></div>
      </div>
  );
};

export default AssignmentGrading;

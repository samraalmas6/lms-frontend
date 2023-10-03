import React, { useEffect, useState } from "react";
// import assignmentData from "../content/Data/assignmentData";
// import courseData from "../content/Data/courseData";
// import courseModuleData from "../content/Data/courseModulesData";
// import courseUnitData from "../content/Data/courseUnitData";
import userData from "../content/Data//userData";
import Collapse from "react-collapse";
import Filters from "../hooks/Filters";
import SubmittedAssignTable from "../content/SubmittedAssignTable";
import "../styles/AssignmentTable.css";
import "../styles/AssignmentGrading.css";
const AssignmentGrading = () => {
  const data = [
    {
      id: 1,
      userName: "User 1",
      submissionDate: "2023-09-30",
      status: "Passed",
    },
    {
      id: 2,
      userName: "User 2",
      submissionDate: "2023-09-30",
      status: "Pending",
    },
    {
      id: 3,
      userName: "User 3",
      submissionDate: "2023-09-29",
      status: "Not Passed",
    },
    // Add more data here
  ];

  // const [courseData, setCourseData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [module, setModule] = useState([]);
  const [unit, setUnit] = useState([]);
  const [courseContent, setCourseContent] = useState([]);
  const [moduleContent, setModuleContent] = useState([]);
  const [unitContent, setUnitContent] = useState([]);
  const [assignmentContent, setAssignmentContent] = useState([]);
  const [moduleId, setModuleId] = useState(null);
  const [isItemOpen, setIsItemOpen] = useState(
    Array(courseContent.length).fill(false)
  );
  const [isSubItemOpen, setIsSubItemOpen] = useState(
    Array(courseContent.length).fill(false)
  );

  // useEffect(() => {
  //   setCourseData[courseData];
  // });
  // console.log("I am course data", courseData);

  const minLength = Math.min(
    courseContent.length,
    moduleContent.length,
    unitContent.length,
    assignmentContent.length
  );

  const elements = [];

  for (let i = 0; i < minLength; i++) {
    elements.push(
      <h6 key={i}>
        {/* Course: */}
        {courseContent[i].title},{/* Module:  */}
        {moduleContent[i].title} /,
        {/* Unit: */}
        {unitContent[i].title}/,
        {/* assignment :  */}
        {assignmentContent[i].assignment}
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

  // const filteredData =
  //   activeFilter === "All"
  //     ? data
  //     : data.filter((item) => item.status === activeFilter);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const [userFeedbackMap, setUserFeedbackMap] = useState({});
  const [userStatusMap, setUserStatusMap] = useState({});
  const [filterOption, setFilterOption] = useState("All");

  useEffect(() => {
    // Initialize userStatusMap with "Pending" for each assignment
    const initialStatusMap = {};
    assignmentContent.forEach((item) => {
      initialStatusMap[item.id] = "Pending";
    });
    setUserStatusMap(initialStatusMap);
  }, [0]);

  const openPopup = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    setFeedback(userFeedbackMap[assignmentId]?.feedback || ""); // Load existing feedback if available
    setGrade(userFeedbackMap[assignmentId]?.grade || ""); // Load existing grade if available
  };

  const closePopup = () => {
    setSelectedAssignment(null);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const calculateStatus = (assignmentId, inputGrade) => {
    const selectedAssignmentData = assignmentContent.find(
      (item) => item.id === assignmentId
    );
    if (selectedAssignmentData) {
      const totalMarks = parseInt(selectedAssignmentData.Grade, 10); // Parse as integer
      const inputGradeValue = parseInt(inputGrade, 10); // Parse inputGrade as integer
      const halfMarks = totalMarks / 2;
      return inputGradeValue < halfMarks ? "Not-Passed" : "Passed";
    }
    return "Pending"; // Default to 'Pending' if assignment data not found
  };

  const handleSubmit = () => {
    // Update the userFeedbackMap with the submitted feedback and grade
    setUserFeedbackMap({
      ...userFeedbackMap,
      [selectedAssignment]: { feedback, grade },
    });

    // Determine the status based on grade
    const status = calculateStatus(selectedAssignment, parseFloat(grade));

    // Update the userStatusMap
    setUserStatusMap({
      ...userStatusMap,
      [selectedAssignment]: status,
    });

    // Close the pop-up
    closePopup();
  };

  // Filter assignments based on the selected filter option
  const filteredAssignments = assignmentContent.filter((item) => {
    if (filterOption === "All") {
      return true; // Show all assignments
    } else if (filterOption === "Passed") {
      return userStatusMap[item.id] === "Passed";
    } else if (filterOption === "NotPassed") {
      return userStatusMap[item.id] === "Not-Passed";
    } else if (filterOption === "Pending") {
      return userStatusMap[item.id] === "Pending";
    }
    return true;
  });

  useEffect(() => {
    const getCourseData = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setCourseContent(result);
        });
      });
    };
    const getModuleData = () => {
      fetch("http://127.0.0.1:8000/api/modules/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setModuleContent(result);
        });
      });
    };
    const getUnitData = () => {};
    const getAssignmentData = () => {
      fetch("http://127.0.0.1:8000/api/units/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setAssignmentContent(result);
        });
      });
    };
    getCourseData();
    getModuleData();
    getUnitData();
    getAssignmentData();
  }, [0]);

  const handleCourseModule = (id) => {
    fetch(`http://127.0.0.1:8000/api/courses/${id}/modules/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      response.json().then(function (result) {
        console.log(result);
        setModuleContent(result);
      });
    });
    fetch("http://127.0.0.1:8000/api/modules/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      response.json().then(function (result) {
        console.log(result);
        setUnitContent(result);
      });
    });
  };
  return (
    <div className="grading-screen-main-container">
      <div className="filters-main-container">
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
        <div className="filter-container">
          {/* <label>Filter by:</label> */}
          <button
            className={`filter-button all ${
              filterOption === "All" ? "active" : ""
            }`}
            onClick={() => setFilterOption("All")}
          >
            All
          </button>
          <button
            className={`filter-button passed ${
              filterOption === "Passed" ? "active" : ""
            }`}
            onClick={() => setFilterOption("Passed")}
          >
            Passed
          </button>
          <button
            className={`filter-button failed ${
              filterOption === "NotPassed" ? "active" : ""
            }`}
            onClick={() => setFilterOption("NotPassed")}
          >
            Not Passed
          </button>
          <button
            className={`filter-button pending ${
              filterOption === "Pending" ? "active" : ""
            }`}
            onClick={() => setFilterOption("Pending")}
          >
            Pending
          </button>
        </div>
        <div>
          {/* <Filters activeFilter={activeFilter} onChangeFilter={setActiveFilter} />
      <SubmittedAssignTable data={filteredData} /> */}
        </div>
      </div>
      <div className="course-title">
        {/* <h6>Course Data</h6> */}
        <ul>
          {courseContent.map((course, index) => (
            <li key={course.id}>
              <button
                onClick={() => {
                  toggleItem(index);
                  handleCourseModule(course.id);
                }}
              >
                {course.title}
                <i class="fas fa-angle-double-down"></i>
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
                        {/* <div>
                          Module:
                          {module.title} /
                          Unit:{" "}
                          {courseUnitData[subIndex].title} /
                          Assignment:{" "}
                          {assignmentData[subIndex].assignment}
                        </div> */}
                        <div>
                          <table className="assignment-table">
                            <thead className="head-row">
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Submitted By</th>
                                <th scope="col">Assignment</th>
                                <th scope="col">Submission Date</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Partners</th>
                                <th scope="col">Graders Name</th>
                                <th scope="col">Grade</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="assign-lin">
                              {filteredAssignments.map((item) => (
                                <tr key={item.id} className="assign-col">
                                  <td>{item.id}</td>
                                  <td>{item.submitted_by}</td>
                                  <td>{item.assignment}</td>
                                  <td>{item.submission_date}</td>
                                  <td>{item.Due_Date}</td>
                                  <td>{item.Partners}</td>
                                  <td>{item.Graders_Name}</td>
                                  <td className="grade-column">
                                    {userFeedbackMap[item.id]?.grade || "-"}/
                                    {item.Grade}
                                  </td>
                                  <td
                                    className={`status-column ${userStatusMap[
                                      item.id
                                    ]?.toLowerCase()}-status`}
                                  >
                                    {userStatusMap[item.id]}
                                  </td>
                                  <td>
                                    <button
                                      className="view-button"
                                      onClick={() => openPopup(item.id)}
                                    >
                                      View
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          {selectedAssignment !== null && (
                            <div className="popup">
                              <div className="popup-content">
                                <button
                                  className="close-button"
                                  onClick={closePopup}
                                >
                                  X
                                </button>
                                <p>Assignment Content</p>
                                <p className="content">
                                  <a
                                    href={
                                      assignmentContent.find(
                                        (item) => item.id === selectedAssignment
                                      )?.content
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {
                                      assignmentContent.find(
                                        (item) => item.id === selectedAssignment
                                      )?.content
                                    }
                                  </a>
                                </p>

                                <div>
                                  <label className="feedback">Feedback:</label>
                                  <textarea
                                    id="feedback"
                                    name="feedback"
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                    className="feedback-input"
                                  />
                                </div>
                                <div>
                                  <label className="grade">Grade:</label>
                                  <input
                                    type="number"
                                    id="grade"
                                    name="grade"
                                    value={grade}
                                    onChange={handleGradeChange}
                                    className="grade-input"
                                    max={
                                      assignmentContent.find(
                                        (item) => item.id === selectedAssignment
                                      )?.Grade || 100
                                    }
                                  />
                                  <span className="grade-text">
                                    out of{" "}
                                    {assignmentContent.find(
                                      (item) => item.id === selectedAssignment
                                    )?.Grade || 100}
                                  </span>
                                </div>

                                <button
                                  onClick={handleSubmit}
                                  className="submit-button"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          )}
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
    </div>
  );
};

export default AssignmentGrading;

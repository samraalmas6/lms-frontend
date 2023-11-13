import React, { useEffect, useState } from "react";

import Collapse from "react-collapse";
import "../../../styles/AssignmentTable.css";
import "../../../styles/AssignmentGrading.css";
const AssignmentGrading = () => {

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }

  const userId = sessionStorage.getItem("user_id");
  const userRole = sessionStorage.getItem("role");

  const [courseContent, setCourseContent] = useState([]);
  const [courseCoauthors, setCourseCoauthors] = useState([]);
  const [openIndex, setOpenIndex] = useState(null); //one collapsible at a time
  const [moduleContent, setModuleContent] = useState([]);
  const [unitContent, setUnitContent] = useState([]);
  const [assignmentContent, setAssignmentContent] = useState([]);
  const [assignmentSubmissionContent, setAssignmentSubmissionContent] =
    useState([]);
  const [assignmentGrading, setAssignmentGrading] = useState([]);
  const [assignmentFilter, setAssignmentFilter] = useState(null);
  const [filteredData, setFilteredData] = useState();
  const [showTable, setShowTable] = useState(true);
  const [isCourseOpen, setIsCourseOpen] = useState(
    Array(courseContent.length).fill(false)
  );
  const [isModuleOpen, setIsModuleOpen] = useState(
    Array(moduleContent.length).fill(false)
  );
  const [isUnitOpen, setIsUnitOpen] = useState(
    Array(unitContent.length).fill(false)
  );
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(
    Array(assignmentContent.length).fill(false)
  );
  const toggleCourse = (course, index) => {
    setCourseCoauthors(course.editor);
    const updatedIsCourseOpen = [...isCourseOpen];
    updatedIsCourseOpen[index] = !updatedIsCourseOpen[index];
    setIsCourseOpen(updatedIsCourseOpen);
    //one collapsible at a time
    if (index === openIndex) {
      // Clicking the open one closes it
      setOpenIndex(null);
      console.log("one at a time logic if condition applied");
    } else {
      setOpenIndex(index);
      console.log("one at a time logic else condition applied");
    }
  };

  // const toggleCollapsible = (index) => {
  //   if (index === openIndex) {
  //     // Clicking the open one closes it
  //     setOpenIndex(null);
  //   } else {
  //     setOpenIndex(index);
  //   }
  // };

  const toggleModule = (index) => {
    const updatedIsModuleOpen = [...isModuleOpen];
    updatedIsModuleOpen[index] = !updatedIsModuleOpen[index];
    setIsModuleOpen(updatedIsModuleOpen);
  };
  const toggleUnit = (index) => {
    const updatedIsUnitOpen = [...isUnitOpen];
    updatedIsUnitOpen[index] = !updatedIsUnitOpen[index];
    setIsUnitOpen(updatedIsUnitOpen);
  };
  const toggleAssignment = (index) => {
    const updatedIsAssignmentOpen = [...isAssignmentOpen];
    updatedIsAssignmentOpen[index] = !updatedIsAssignmentOpen[index];
    setIsAssignmentOpen(updatedIsAssignmentOpen);
    // console.log(updatedIsAssignmentOpen);
    setShowTable();
  };

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const [userFeedbackMap, setUserFeedbackMap] = useState({});
  const [userStatusMap, setUserStatusMap] = useState({});
  const [filterOption, setFilterOption] = useState("All");
  const [submissionId, setSubmissionId] = useState();
  const [submittedBy, setSubmittedBy] = useState();
  const [gradingId, setGradingId] = useState();
  const [updatedStatus, setUpdatedStatus] = useState();
  const [userData, setUserData] = useState([]);
  const [authorData, setAuthorData] = useState([])
  const [overDue, setOverDue] = useState();
  // const [gradingStatus, setGradingStatus] = useState("");
  const [subDate,setSubDate] = useState('');
  const [subTime,setSubTime] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [dueTime,setDueTime] = useState('');


  useEffect(() => {
    // Initialize userStatusMap with "Pending" for each assignment
    const initialStatusMap = {};
    assignmentContent.forEach((item) => {
      initialStatusMap[item.id] = "Pending";
    });
    setUserStatusMap(initialStatusMap);
  }, [0]);

  const openPopup = (
    assignmentId,
    gradingId,
    submissionId,
    submitted_by,
    gradingStatus
  ) => {
    setSelectedAssignment(assignmentId);
    setGradingId(gradingId);
    setSubmissionId(submissionId);
    setSubmittedBy(submitted_by);
    setFeedback(userFeedbackMap[assignmentId]?.feedback || ""); // Load existing feedback if available
    setGrade(userFeedbackMap[assignmentId]?.grade || ""); // Load existing grade if available
    // setGradingStatus(gradingStatus)
  };

  // console.log("this is grade : .......", grade);
  // console.log("this is feedback.............", feedback);

  const closePopup = () => {
    setSelectedAssignment(null);
  };

  const closeTable = () => {
    setShowTable(null);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };

  const handleStatus = (e) => {
    setUpdatedStatus(e.target.value);
  };

  const handleOverDueDate = (subDate,subTime, dueDate,dueTime) => {
    // setSubDate(subDate);
    // setSubTime(subTime);
    // setDueDate(dueDate);
    // setDueTime(dueTime);

    console.log("dueDate",dueDate)
    console.log("dueTime",dueTime)
    console.log("subDate",subDate)
    console.log("subTime",subTime)

    const subDateTimeString = subDate + "T" + subTime + "Z";
    const dueDateTimeString = dueDate + "T" + dueTime + "Z";

    console.log("subDateTimeString",subDateTimeString)
    console.log("dueDateTimeString",dueDateTimeString)

    const dueDateTime = new Date(dueDateTimeString);
    const subDateTime = new Date(subDateTimeString);

    const dueMilliseconds = dueDateTime.getTime();
    const subMilliseconds = subDateTime.getTime();

    console.log("dueMilliseconds",dueMilliseconds)
    console.log("subMilliseconds",subMilliseconds)

  //   ----------------xxxxxxxxxx---------------------
  //   if (subDate > dueDate && subTime > dueTime) {
  //     console.log("lateeeeeeeeeeeeeeeeee")
  //     // setOverDue(true)
  //     return true;
  //   } else {
  //     return false;
  //   }
  //   -----------------xxxxxxxxxxxxxx------------------

    if (subMilliseconds > dueMilliseconds){
      console.log("late submission")
      return true;
    }
    else{
      console.log("on time submission")
      return false;
    }

  };

  const handleGraderName = (id) => {
    const author = authorData.filter(author => author.id === id);
    const graderName = userData.filter((obj) => obj.id === author[0].created_by);
    console.log("This is grader name", graderName);
    if (graderName.length !== 0) {
      return `${graderName[0].first_name} ${graderName[0].last_name}`;
    } else {
      return "";
    }
  };

  const handleSubmit = (userId, gradingId, submissionId) => {
    // Update the userFeedbackMap with the submitted feedback and grade
    // setUserFeedbackMap({
    //   ...userFeedbackMap,
    //   [selectedAssignment]: { feedback, grade },
    // });

    // Determine the status based on grade
    // const status = calculateStatus(selectedAssignment, parseFloat(grade));

    // Update the userStatusMap
    // setUserStatusMap({
    //   ...userStatusMap,
    //   [selectedAssignment]: status,
    // });

    putAssignmentGradingData(userId, gradingId, submissionId);

    // Close the pop-up
    closePopup();

    // getAssignmentGradingData()
  };

  // Filter assignments based on the selected filter option
  // const filteredAssignments = assignmentContent.filter((item) => {
  //   if (filterOption === "All") {
  //     return true; // Show all assignments
  //   } else if (filterOption === "Passed") {
  //     return userStatusMap[item.id] === "Passed";
  //   } else if (filterOption === "NotPassed") {
  //     return userStatusMap[item.id] === "Not-Passed";
  //   } else if (filterOption === "Pending") {
  //     return userStatusMap[item.id] === "Pending";
  //   }
  //   return true;
  // });

  console.log('User Role', userRole);
  const getCourseData = () => {
    fetch("http://127.0.0.1:8000/api/courses", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          // console.log(result);
          if (userRole === "admin") {
            setCourseContent(result);
          } else {
            const obj = result.filter((course) => {
              return course.is_delete === false
            });
            setCourseContent(obj);
          }
        });
      } else {
        // console.log(response);
      }
    });
  };
  const getModuleData = () => {
    fetch("http://127.0.0.1:8000/api/modules/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          // console.log(result);
          setModuleContent(result);
        });
      } else {
        console.log(response);
      }
    });
  };
  const getUnitData = () => {
    fetch("http://127.0.0.1:8000/api/units/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          // console.log(result);
          setUnitContent(result);
        });
      } else {
        console.log(response);
      }
    });
  };
  const getAssignmentData = () => {
    fetch("http://127.0.0.1:8000/api/assignments/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          // console.log(result);
          setAssignmentContent(result);
        });
      } else {
        console.log(response);
      }
    });
  };
  const getAssignmentSubmissionData = () => {
    fetch("http://127.0.0.1:8000/api/assignment_submissions/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          // console.log(result);
          setAssignmentSubmissionContent(result);
          // console.log(
          //   "assignment submission content: submitted link",
          //   result[0].submitted_link
          // );
        });
      } else {
        console.log(response);
      }
    });
  };
  const getAssignmentGradingData =  () => {
     fetch("http://127.0.0.1:8000/api/assignment_gradings/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log('Api result Grading=',result);
          setAssignmentGrading(result);
        });
      } else {
        console.log(response);
      }
    });
  };

  const getAuthorsData =  () => {
    fetch("http://127.0.0.1:8000/api/authors/", {
     method: "GET",
     headers: {
       Authorization: `Token ${sessionStorage.getItem("user_token")}`,
     },
   }).then((response) => {
     if (response.status === 200) {
       response.json().then(function (result) {
         console.log('Api result Authors=',result);
        setAuthorData(result)
       });
     } else {
       console.log(response);
     }
   });
 };


  const putAssignmentGradingData = (userId, gradingId, submissionId) => {
    const updatedObj = {
      marks: grade,
      comments: feedback,
      assignment_submission: submissionId,
      grader: sessionStorage.getItem("user_id"),
      user: sessionStorage.getItem("user_id"),
      status: updatedStatus,
      editor: courseCoauthors,
      updated_by: sessionStorage.getItem("user_id"),
      assignment: 67,
    };

    fetch(`http://127.0.0.1:8000/api/assignment_gradings/${gradingId}/`, {
      method: "PUT",
      body: JSON.stringify(updatedObj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        getAssignmentGradingData();
        response.json().then(function (result) {});
      } else {
        console.log(response);
      }
    });
  };
  const getfilteredData = (filterValue) => {
    if (filterValue == "undefined") {
      filterValue = "none";
    }
    fetch(
      `http://127.0.0.1:8000/api/assignment_status/filter_related_objects/?status=${filterValue}`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }
    ).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          // console.log("filtered data in api:", result.assignment_grading);
          setFilteredData(result);
          setAssignmentGrading(result.assignment_grading);
          setAssignmentSubmissionContent(result.assignment_submission);
          setAssignmentContent(result.assignment);
          setAssignmentFilter(null);
          // setAssignmentGrading(filteredData.assignment_grading)
        });
      } else {
        setAssignmentGrading([]);
        setAssignmentSubmissionContent([]);
        setAssignmentContent([]);
      }
    });
  };
  const getUsers = () => {
    fetch("http://127.0.0.1:8000/list_all_users/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          // console.log(result);
          setUserData(result);
        });
      } else {
        console.log(response);
      }
    });
  };

  useEffect(() => {
    getCourseData();
    getModuleData();
    getUnitData();
    getAssignmentData();
    getAssignmentSubmissionData();
    getAssignmentGradingData();
    getAuthorsData();
    getUsers();

    // getfilteredData();
  }, [0]);


  const instructor =
    sessionStorage.getItem("first_name") + sessionStorage.getItem("last_name");
  // console.log(
  //   "grader is jo user login h uska first name",
  //   sessionStorage.getItem("last_name")
  // );
  // console.log("checking filter api : ", filteredData.assignment);
  // console.log("(assignmentSubmissionContent.submitted_link",assignmentSubmissionContent.submitted_link)

  console.log(
    "filter ka result:",
    assignmentSubmissionContent.filter((obj) => obj.id === submissionId)
      ?.submitted_link
  );
  console.log("Co-Authors in Assignment Grading screen", courseCoauthors);
  return (
    <div className="grading-screen-main-container">
      <div className="filters-main-container">
        {/* <div class="search-menu">
          <h2>Menu</h2>
          <input
            type="text"
            id="mySearch"
            onkeyup="myFunction()"
            placeholder="Search for users ,units or courses"
            title="Type in a category"
          />
        </div> */}
        <div className="filter-container">
          {/* <label>Filter by:</label> */}
          <button
            className={`filter-button all btn-secondary ${
              assignmentFilter === null ? "active-all" : ""
            }`}
            // onClick={() => setAssignmentFilter(null)}
            // onClick={() =>setAssignmentGrading(filteredData.assignment_grading) }
            onClick={() => getfilteredData("none")}
          >
            All
          </button>
          <button
            className={`btn-success${
              assignmentFilter === "pass" ? "active-pass" : ""
            }`}
            // onClick={() => setAssignmentFilter("pass")}
            // onClick={() => setAssignmentFilter("pass")}
            onClick={() => getfilteredData("pass")}
          >
            Passed
          </button>
          <button
            className={`btn-danger ${
              assignmentFilter === "not pass" ? "active-fail" : ""
            }`}
            // onClick={() => setAssignmentFilter("not pass")}
            onClick={() => getfilteredData("fail")}
          >
            Not Passed
          </button>
          <button
            className={`btn-info ${
              assignmentFilter === "pending" ? "active-pending" : ""
            }`}
            // onClick={() => setAssignmentFilter("pending")}
            onClick={() => getfilteredData("pending")}
          >
            Pending
          </button>
        </div>
      </div>
      <div className="courses-container">
        <ul>
          {courseContent?.map((course, index) => (
            <li key={course.id} className="list-item">
              <div
                // className="collapse-btn"
                className="collapse-btn course"
                onClick={() => {
                  toggleCourse(course, index);
                  // handleCourseModule(course.id);
                }}
              >
                <div className="course-line btn-warning"></div>
                <div className="collapse-icon-course">
                  <i class="fa fa-chevron-circle-down"></i>
                </div>
                {course.title}
                {/* <i class="fas fa-angle-double-down collapse-icon"></i> */}

                {/* ​<i class="fas fa-toggle-down"></i>
                <i class="fa fa-hand-o-down"></i> */}
                {/* <div class="toggle-btn-content">
                <input type="checkbox" id="btn" />
                <label for="btn">
                  <span class="track">
                    <span class="txt"></span>
                  </span>
                  <span class="thumb">|||</span>
                </label>
              </div> */}
              </div>
              <Collapse isOpened={isCourseOpen[index]}>
                <ul>
                  {moduleContent
                    .filter((module) => module.course === course.id)
                    .map((module, moduleIndex) => (
                      <li key={module.id} className="list-item">
                        <div
                          className="collapse-btn module"
                          onClick={() => {
                            toggleModule(moduleIndex);
                          }}
                        >
                          <div className="module-line"></div>
                          {/* <i class="fas fa-angle-double-down"></i> */}
                          <i class="fa fa-angle-down"></i>
                          {module.title}
                        </div>
                        <Collapse isOpened={isModuleOpen[moduleIndex]}>
                          <ul>
                            {unitContent
                              .filter((unit) => unit.module === module.id)
                              .map((unit, unitIndex) => (
                                <li key={unit.id} className="list-item">
                                  <div
                                    className="collapse-btn unit"
                                    onClick={() => {
                                      toggleUnit(unitIndex);
                                    }}
                                  >
                                    <div className="unit-line btn-success"></div>
                                    <i class="fa fa-angle-down"></i>
                                    {unit.title}
                                    {/* <i class="fas fa-angle-double-down"></i> */}
                                  </div>
                                  <Collapse isOpened={isUnitOpen[unitIndex]}>
                                    <ul>
                                      {assignmentContent
                                        .filter(
                                          (assignment) =>
                                            assignment.unit === unit.id
                                        )
                                        .map((assignment, assignmentIndex) => (
                                          <li
                                            key={assignment.id}
                                            className="list-item"
                                          >
                                            <div
                                              className="collapse-btn assign"
                                              onClick={() => {
                                                toggleAssignment(
                                                  assignmentIndex
                                                );
                                              }}
                                            >
                                              <div className="ass-line btn-primary"></div>
                                              <i class="fa fa-angle-down"></i>

                                              {assignment.title}
                                              {/* <i class="fas fa-angle-double-down"></i> */}
                                            </div>
                                            <Collapse
                                              isOpened={
                                                isAssignmentOpen[
                                                  assignmentIndex
                                                ]
                                              }
                                            >
                                              <table className="assignment-table">
                                                <thead className="head-row table-info">
                                                  <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">
                                                      Submitted By
                                                    </th>
                                                    <th scope="col">
                                                      Assignment
                                                    </th>
                                                    <th scope="col">
                                                      Submission Date & Time
                                                    </th>
                                                    <th scope="col">
                                                      Due Date
                                                    </th>
                                                    {/* <th scope="col">
                                                      Partners
                                                    </th> */}
                                                    <th scope="col">
                                                      Graders Name
                                                    </th>
                                                    <th scope="col">Grade</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Actions</th>
                                                  </tr>
                                                </thead>
                                                <tbody className="assignment-sub-body">
                                                  {assignmentSubmissionContent.length ===
                                                  0
                                                    ? "No record found"
                                                    : assignmentSubmissionContent
                                                        .filter(
                                                          (submission) =>
                                                            submission.assignment ===
                                                            assignment.id
                                                        )
                                                        .map(
                                                          (
                                                            submission,
                                                            submissionIndex
                                                          ) => {
                                                            const grading =
                                                              assignmentGrading.length >
                                                                0 &&
                                                              assignmentGrading.filter(
                                                                (grading) =>
                                                                  grading.assignment_submission ===
                                                                  submission.id
                                                              )[0];
                                                            // console.log(
                                                            //   "grading data:",
                                                            //   grading
                                                            // );
                                                            return (
                                                              <tr
                                                                className="table-submission-data"
                                                                key={
                                                                  submission.id
                                                                }
                                                              >
                                                                <td>
                                                                  {
                                                                    submission.id
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    userData.length !==
                                                                      0 &&
                                                                      userData.filter(
                                                                        (obj) =>
                                                                          obj.id ===
                                                                          submission.submitted_by
                                                                      )[0]
                                                                        .first_name +
                                                                        " " +
                                                                        userData.filter(
                                                                          (
                                                                            obj
                                                                          ) =>
                                                                            obj.id ===
                                                                            submission.submitted_by
                                                                        )[0]
                                                                          .last_name
                                                                    // handleSubmitterName(),
                                                                    // submission.submitted_by
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    assignment.title
                                                                  }
                                                                </td>
                                                                <td
                                                                  className={`${
                                                                    handleOverDueDate(
                                                                      submission.submission_date,
                                                                      submission.submission_time,
                                                                      assignment.due_date,
                                                                      assignment.due_time
                                                                    )
                                                                      ? "overDue"
                                                                      : "on-time"
                                                                  }`}
                                                                >
                                                                  {
                                                                    submission.submission_date  
                                                                  },
                                                                  {/* {submission.submission_time} */}
                                                                </td>
                                                                <td>
                                                                  {
                                                                    assignment.due_date
                                                                  }
                                                                  {/* {
                                                                    assignment.due_time
                                                                  } */}
                                                                </td>
                                                                <td>
                                                                  {handleGraderName(
                                                                    grading.instructor
                                                                  )}
                                                                  {/* {console.log(
                                                                    "grader ka object with respect to user api",
                                                                    userData.filter(
                                                                      (obj) =>
                                                                        obj.id ===
                                                                        grading.grader
                                                                    ).first_name
                                                                  )} */}
                                                                </td>
                                                                <td>
                                                                  {
                                                                    grading?.marks
                                                                    // grade
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    <div>
                                                                      {
                                                                        grading?.status
                                                                      }
                                                                    </div>
                                                                  }
                                                                </td>
                                                                <td>
                                                                  <button
                                                                    className="opn-btn"
                                                                    onClick={() =>
                                                                      openPopup(
                                                                        submissionIndex,
                                                                        grading.id,
                                                                        submission.id,
                                                                        submission.submitted_by
                                                                        // grading.status
                                                                      )
                                                                    }
                                                                  >
                                                                    View
                                                                  </button>
                                                                </td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                </tbody>
                                              </table>
                                              {selectedAssignment !== null && (
                                                <div className="popup">
                                                  <div className="popup-content">
                                                    <i
                                                      class="fas fa-window-close popup-close-icon"
                                                      onClick={closePopup}
                                                    ></i>
                                                    <h5>Assignment Content</h5>
                                                    <div className="content">
                                                      {/* <p> */}

                                                      {/* submitted link */}
                                                      <div className="submitted_link">
                                                        <a href="assignmentSubmissionContent[0].submitted_link">
                                                          {
                                                            assignmentSubmissionContent.filter(
                                                              (obj) =>
                                                                obj.id ===
                                                                submissionId
                                                            )[0].submitted_link
                                                          }
                                                        </a>
                                                      </div>
                                                      {/* submitted pdf  */}
                                                      <div className="submitted_pdf">
                                                        <a
                                                          href={
                                                            assignmentSubmissionContent.filter(
                                                              (obj) =>
                                                                obj.id ===
                                                                submissionId
                                                            )[0].content
                                                          }
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                        >
                                                          {
                                                            assignmentSubmissionContent.filter(
                                                              (obj) =>
                                                                obj.id ===
                                                                submissionId
                                                            )[0].content
                                                          }
                                                        </a>
                                                      </div>
                                                    </div>

                                                    <div className="feedback-container">
                                                      <label className="feedback">
                                                        Feedback:
                                                      </label>
                                                      <textarea
                                                        id="feedback"
                                                        name="feedback"
                                                        value={feedback}
                                                        onChange={
                                                          handleFeedbackChange
                                                        }
                                                        className="feedback-input"
                                                      />
                                                    </div>
                                                    <div className="grade-status-container">
                                                      <div>
                                                        <label className="grade">
                                                          Grade:
                                                        </label>
                                                        <input
                                                          type="number"
                                                          id="grade"
                                                          name="grade"
                                                          value={grade}
                                                          onChange={
                                                            handleGradeChange
                                                          }
                                                          className="grade-input"
                                                          max={
                                                            assignmentContent.find(
                                                              (item) =>
                                                                item.id ===
                                                                selectedAssignment
                                                            )?.Grade || 100
                                                          }
                                                        />
                                                        <span className="grade-text">
                                                          out of{" "}
                                                          {assignmentContent.find(
                                                            (item) =>
                                                              item.id ===
                                                              selectedAssignment
                                                          )?.Grade || 100}
                                                        </span>
                                                      </div>
                                                      <div className="status-dropdown">
                                                        <select
                                                          onChange={(e) =>
                                                            handleStatus(e)
                                                          }
                                                          value={updatedStatus}
                                                        >
                                                          <option
                                                            disabled
                                                            selected
                                                          >
                                                            select status
                                                          </option>
                                                          <option value="Pass">
                                                            pass
                                                          </option>
                                                          <option value="Not Passed">
                                                            fail
                                                          </option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div className="popup-submit-button">
                                                      <button
                                                        onClick={() =>
                                                          handleSubmit(
                                                            submittedBy,
                                                            gradingId,
                                                            submissionId
                                                          )
                                                        }
                                                        // className="popup-submit-button "
                                                        type="button"
                                                        class="btn btn-primary popup-submit-button"
                                                      >
                                                        Submit
                                                      </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            </Collapse>
                                          </li>
                                        ))}
                                    </ul>
                                  </Collapse>
                                </li>
                              ))}
                          </ul>
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

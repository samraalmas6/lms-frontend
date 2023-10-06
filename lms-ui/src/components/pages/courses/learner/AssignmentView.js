
import React, { useState, useEffect } from "react";
import "../../../styles/AssignmentView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import fil from "../../../content/Images/fil.png";

function calculateSubmissionStatus(
  dueDate,
  isDone,
  isResubmit,
  isSubmitClicked
) {
  const currentDate = new Date();
  const formattedDueDate = new Date(dueDate);

  if (isSubmitClicked) {
    return <span className="submitted-status">Submitted</span>;
  } else if (isDone) {
    return <span className="done-status">Done</span>;
  } else if (isResubmit) {
    return <span className="resubmitted-status">Resubmitted</span>;
  } else if (currentDate > formattedDueDate) {
    return <span className="late-submission-status">Late Submission</span>;
  } else {
    return <span className="not-submitted-status">Not Submitted</span>;
  }
}

function AssignmentView({ selectedAssignments }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [files, setFiles] = useState([]);
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [submissionOption, setSubmissionOption] = useState(null);
  const [showSubmissionOptions, setShowSubmissionOptions] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isResubmit, setIsResubmit] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(true);
  const [instructorFeedback, setInstructorFeedback] = useState(null);
  const [apiData, setApiData] = useState([]);
  const[number, setNumber] = useState(0);
  const [assignmentid, setAssignmentid] = useState("");
  const [feedbackData, setFeedbackData] = useState("feedback"); // State variable for feedback
  const [gradeData, setGradeData] = useState(0);
  const [marks, setMarks] = useState(87)
  const [submissionId, setSubmissionId] =useState(null)
  const [isChecked, setIsChecked]=useState("false")
  const assignments = [
    {
      id: 1,
      title: "Assignment 1",
      description: "Complete the first assignment.",
      dueDate: "2023-09-30 14:00",
      points: 90,
      resourceFiles: ["https://example.com/your-pdf-file.pdf", "file2.doc"],
      submissionLinks: [
        "https://example.com/your-file-url",
        "https://anotherlink.com",
      ],
      feedback: "", // Add feedback property
      grade: null, // Add grade property
    },
    // Add more assignments here.
  ];

  useEffect(() => {
    const getAssignmentData = () => {
      fetch("http://127.0.0.1:8000/api/assignments", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setApiData(result);
          setNumber(result[0].marks);
        });
      });
    };
    getAssignmentData();
  }, []);

  // useEffect(() => {
  //   const getGradingData = () => {
  //     console.log("Fetching grading data...");

  //     fetch("http://127.0.0.1:8000/api/assignment_gradings", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Token ${sessionStorage.getItem("user_token")}`,
  //       },
  //     })
  //       .then((response) => {
  //         response.json().then(function (result) {
  //           console.log(result);
  //           setFeedbackData(result);
  //           setGradeData(result);
  //         });
  //       });
  //   };
  //   getGradingData();
  // }, []);

  useEffect(() => {
    // const getGradingData = async () => {
    //   try {
    //     const response = await fetch("http://127.0.0.1:8000/api/assignment_gradings", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Token ${sessionStorage.getItem("user_token")}`,
    //       },
    //     });
        
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
  
    //     const data = await response.json();
    //     console.log('grading data:',data.filter(grading => {
    //       return grading.assignment_submission == assignmentid
    //       // grading.assignment_submission)
    //     }) )
    //     // console.log("API Data:", data, data[0].marks);
    //     setGradeData(data[0].marks);
    //     setFeedbackData(data[0].comments);
    //     console.log("feddback data from variab", gradeData)
        
    //   } catch (error) {
    //     console.error("Error fetching grading data:", error);
    //   }
    // };
    
    // getGradingData();
  }, []);
  

  // console.log("I m feedback data : ", feedbackData);
  // const marks = feedbackData ? feedbackData.marks : null;

  const simulateSubmission = () => {
    setTimeout(() => {
      // Simulate pass or fail randomly
      const isPassed = Math.random() < 0.5;

      const feedback = isPassed
        ? "Congratulations! You have passed the assignment."
        : "Sorry, you have not passed the assignment. Please review and resubmit.";

      const grade = isPassed ? selectedAssignment.points : 0;

      setInstructorFeedback(feedback);
      setSelectedAssignment((prevSelectedAssignment) => ({
        ...prevSelectedAssignment,
        feedback,
        grade,
      }));
      setIsSubmitClicked(true);
    }, 2000); // Simulate a 2-second delay for submission
  };

  const getGradingData = (id) => {
    console.log('sub sub sub',id,submissionId);

      fetch("http://127.0.0.1:8000/api/assignment_gradings/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if(response.status === 200){
        response.json().then(function (result) {
          
          const data = result.filter(grading => {
            return grading.assignment_submission === id
            // grading.assignment_submission)
          });
          console.log("API Data:", data);
          setGradeData(data[0].marks);
          setFeedbackData(data[0].comments);
          console.log("feddback data from variab", gradeData)
          
        });
      }
      });
  };

  function handleAssignment(assignment) {
    console.log('assignment id', assignment.id);
    setSelectedAssignment(assignment);
    setFiles([]);
    setLinks([]);
    setIsDone(false);
    setSubmissionOption(null);
    setIsResubmit(false);
    setIsConfirmButtonVisible(true);
    setInstructorFeedback(null); // Reset feedback when changing assignments
    setAssignmentid(assignment.id);

    fetch("http://127.0.0.1:8000/api/assignment_submissions/", {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            const res = result.filter(assignmentSub => {
              return assignmentSub.assignment === assignment.id
            })
            if(res.length !== 0){
            setSubmissionId(res[0].id)
            getGradingData(res[0].id);
            console.log('Assignment_subm',res);
            }
          });
        } else {
          console.log(response);
         
        }
      })
      .catch((error) => {
        console.error("Error submitting submission data:", error);
        // Handle error for the first request
      });
    
    
  }

  function handleToggleResubmit() {
    setIsResubmit(!isResubmit);

    if (!isResubmit) {
      setFiles([]);
      setLinks([]);
      setIsDone(false);
      setSubmissionOption(null);
      setShowSubmissionOptions(false);
      setIsSubmitClicked(false);
      setIsConfirmButtonVisible(true);
      setInstructorFeedback(null); // Reset feedback when toggling resubmit
    }
  }

  function handleLinkChange() {
    if (link.trim() !== "") {
      setLinks([...links, link]);
    }
  }

  function toggleFileInput() {
    setIsFileInputVisible(!isFileInputVisible);
  }

  function handleFileChange(event) {
    const selectedFiles = event.target.files;
    setFiles([...files, ...selectedFiles]);
    setIsFileInputVisible(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    // First POST request data
    const submissionData = {
      submitted_by: 1,
      assignment: assignmentid,
      submission_date: "2024-10-03T10:00:00Z",
      content: link,
      // Add other data properties as needed for the first request
    };
  
    // Second POST request data
  
  
    // Send the first POST request
    fetch("http://127.0.0.1:8000/api/assignment_submissions/", {
      method: "POST",
      body: JSON.stringify(submissionData),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log('result = ',result);
            setLink("");
            // Handle success for the first request
            // Now, send the second POST request
            console.log("kch bhi nbi")
            setSubmissionId(result.id)
            console.log(submissionId)
            // getGradingData(result.id);
            gradingPostRequest(result.id);
            // getGradingData(result.id);
          });
        } else {
          console.log(response);
          // Handle error for the first request
        }
      })
      .catch((error) => {
        console.error("Error submitting submission data:", error);
        // Handle error for the first request
      });
  
    // This flag shows the confirmation dialog, but it's up to you if you want to show it for both requests
    setShowConfirmationDialog(true);


  }
  
  // Function to send the second POST request
  function gradingPostRequest(id) {

    const gradingData = {
      
      marks: marks, // Replace gradeData with the actual grade you want to send
      grading_datetime: new Date().toISOString(), // Replace with the actual grading datetime
      comments: null, // Replace feedbackData with the actual comments
      status: "pending", // You can change the status as needed
      user: 1, // Replace with the user ID of the grader
      assignment_submission: id,
      grader: 1, // Replace with the user ID of the grader
    };
    fetch("http://127.0.0.1:8000/api/assignment_gradings/", {
      method: "POST",
      body: JSON.stringify(gradingData),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log("this is post grading " + result);
            getGradingData(id);
            // Handle success for the second request
          });
        } else {
          console.log("this is post grading response" + response);
          // Handle error for the second request
        }
      })
      .catch((error) => {
        console.error("Error submitting grading data:", error);
        // Handle error for the second request
      });
  }
  

  function handleConfirmSubmit() {
    setIsSubmitClicked(true);
    setShowConfirmationDialog(false);
    simulateSubmission(); // Simulate submission and get feedback
  }

  function handleCloseConfirmationDialog() {
    setShowConfirmationDialog(false);
  }

  return (
    <>
    
      <div className="app">
        <div className="assignment-view">
          <div className="assignment-list">
            {apiData.map((assignment) => (
              <div
                key={assignment.id}
                className={`assignment-item ${
                  selectedAssignment === assignment ? "selected" : ""
                }`}
                onClick={() => handleAssignment(assignment)}
              >
                {assignment.title}
              </div>
            ))}
          </div>
          {selectedAssignment ? (
            <div className="detail">
              <div className="title-date">
                <div className="detail-title">
                  <i className="fas fa-file-pen"></i>
                  <img src={fil} alt="" className="head" />{" "}
                  {selectedAssignment.title}
                </div>
                <div className="detail-points-and-date">
                  <div className="detail-points">
                    <strong>Marks:</strong>
                  {number}
                  </div>
                  <div className="detail-create">
                    <strong>Created At:</strong>
                    {selectedAssignment.created_at.substr(0, 10)}
                  </div>
                  <div className="detail-date">
                    <strong>Due date:</strong>
                    {selectedAssignment.due_date.substr(0, 10)}
                  </div>
                </div>
              </div>
              <div className="detail-description">
                {selectedAssignment.description}
              </div>
              <div className="resource-files">
                {selectedAssignment.resourceFiles &&
                  selectedAssignment.resourceFiles.length > 0 && (
                    <>
                      <p>Attached Resource Files:</p>
                      <ul className="resources">
                        {selectedAssignment.resourceFiles.map((file, index) => (
                          <li key={index}>
                            <a className="res" href={file} download>
                              <i
                                className="fas fa-file"
                                style={{ marginRight: "5px" }}
                              ></i>
                              {file}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
              </div>
            </div>
          ) : (
            <p>Select an assignment to view details:</p>
          )}
          {selectedAssignment && (
            <div className="submit">
              <div className="submit-section">
                <div className="uploaded-files">
                  <div className="submission-status">
                    {calculateSubmissionStatus(
                      selectedAssignment.dueDate,
                      isDone,
                      isResubmit,
                      isSubmitClicked
                    )}
                  </div>
                  {files.length > 0 && (
                    <>
                      <ul className="uploa">
                        {files.map((file, index) => (
                          <li className="upload" key={index}>
                            <img src={fil} alt="" className="font" />
                            <div className="fil-text">{file.name}</div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div className="submitted-links">
                  {links.length > 0 && (
                    <>
                      <ul>
                        {links.map((link, index) => (
                          <li key={index} className="lnk-upld">
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div className="feedback-section">
                  <div className="toggle-submission-button">
                    {isSubmitClicked ? (
                      <button
                        type="button"
                        onClick={handleToggleResubmit}
                        className="resubmit-btn"
                      >
                        Resubmit
                      </button>
                    ) : (
                      <>
                        <div className="add-create-dropdown">
                          <button
                            type="button"
                            onClick={() =>
                              setShowSubmissionOptions(!showSubmissionOptions)
                            }
                            className="add-create"
                          >
                            <FontAwesomeIcon icon={faPlus} /> Add or create
                          </button>
                          {showSubmissionOptions && (
                            <div className="submission-options-dropdown">
                              <button
                                type="button"
                                onClick={() => setSubmissionOption("link")}
                                className="lnk-optn"
                              >
                                <i
                                  className=" lnk  fas fa-link"
                                  style={{
                                    position: "relative",
                                    top: "-2px",
                                    left: "-108px",
                                  }}
                                ></i>
                                <div className="texeria"> Link</div>
                              </button>
                              <button
                                type="button"
                                onClick={() => setSubmissionOption("file")}
                                className="lnk-optn"
                              >
                                <i className=" fil fas fa-paperclip"></i>{" "}
                                <div className="texeria">File</div>
                              </button>
                            </div>
                          )}
                        </div>
                        {submissionOption === "link" && (
                          <div className="link-place">
                            <div
                              className="close-icon"
                              onClick={() => setSubmissionOption(null)}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </div>
                            <input
                              type="text"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              placeholder="Enter link URL"
                              className="lnk-text"
                            />
                            <button
                              type="button"
                              onClick={handleLinkChange}
                              className="link-btn"
                            >
                              Submit Link
                            </button>
                          </div>
                        )}
                        {submissionOption === "file" && (
                          <>
                            {!isSubmitClicked && (
                              <div className="load-img">
                                <label
                                  htmlFor="fileInput"
                                  className={`custom-button ${
                                    isFileInputVisible ? "hidden" : ""
                                  }`}
                                  onClick={toggleFileInput}
                                >
                                  <i className="fas fa-upload"></i> Upload File
                                </label>
                                {isFileInputVisible && (
                                  <>
                                    <input
                                      type="file"
                                      accept=".pdf,.doc,.docx"
                                      onChange={handleFileChange}
                                      id="fileInput"
                                      multiple
                                      className="upload-file"
                                    />
                                  </>
                                )}
                              </div>
                            )}
                            {!isFileInputVisible && (
                              <>
                                {isConfirmButtonVisible && (
                                  <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="save-btn"
                                    disabled={!selectedAssignment}
                                  >
                                    Submit
                                  </button>
                                )}
                                
                                {showConfirmationDialog && (
                                  <div className="confirmation-dialog">
                                    <p>
                                      Are you sure you want to submit this
                                      assignment?
                                    </p>
                                    <button
                                      type="button"
                                      onClick={handleConfirmSubmit}
                                      className="confirm-btn"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleCloseConfirmationDialog}
                                      className="cancel-btn"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* Display Feedback and Grade */}
                <>
                  {/* {isSubmitClicked && feedbackData !== null && ( */}
                    <div className="feedback-and-grade">
                      <div className="feedback-and-grad">
                        <div className="feedback">
                          <strong>Comments:</strong>{" "}
                          {feedbackData ? feedbackData : "No feedback yet"}
                        </div>
                        <div className="grade">
                          <strong>Grade:</strong>{" "}
                          {gradeData 
                            ? `${gradeData} / ${number}`
                            : "Not graded yet"}
                        </div>
                      </div>
                    </div>
                  {/* )} */}
                </>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AssignmentView;


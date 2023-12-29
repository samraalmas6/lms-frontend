import React, { useState, useEffect } from "react";
import "../../../styles/AssignmentView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import fil from "../../../content/Images/fil.png";
import { useLocation } from "react-router-dom";

// function calculateSubmissionStatus(dueDate, isResubmit, isSubmitClicked) {
//   const formattedSubmissionDate = new Date();
//   const formattedDueDate = new Date(dueDate);

//   if (isSubmitClicked) {
//     return 'Submitted';
//   } else if (isResubmit) {
//     return 'Resubmitted';
//   } else if (formattedSubmissionDate > formattedDueDate) {
//     return 'Late Submission';
//   } else {
//     return 'Not Submitted';
//   }
// }

function calculateSubmissionStatus(due_date, isResubmit, isSubmitClicked) {
  const currentDateTime = new Date();
  const formattedDueDate = new Date(due_date);

  if (isSubmitClicked && currentDateTime > formattedDueDate) {
    return <span style={{ color: "red" }}>Late Submission</span>;
  } else if (isSubmitClicked) {
    return "Submitted";
  } else if (isResubmit) {
    return "Resubmitted";
  } else {
    return "Not Submitted";
  }
}

function AssignmentView({ selectedAssignments }) {
  const userId = +sessionStorage.getItem("user_id");
  const {state} = useLocation();
  const [selectedAssignment, setSelectedAssignment] =
    useState(state.assignment);
  const [files, setFiles] = useState(null);
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [links, setLinks] = useState([]);
  const [submissionOption, setSubmissionOption] = useState(null);
  const [showSubmissionOptions, setShowSubmissionOptions] = useState(false);
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [isResubmit, setIsResubmit] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);
  const [isConfirmButtonVisible, setIsConfirmButtonVisible] = useState(true);
  const [instructorFeedback, setInstructorFeedback] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [marks, setMarks] = useState(0);
  const [assignmentid, setAssignmentid] = useState("");
  const [feedbackData, setFeedbackData] = useState("feedback");
  const [gradeData, setGradeData] = useState(0);
  const [statusData, setStatusData] = useState([]);
  const [previousFiles, setPreviousFiles] = useState([]);
  const [previousLink, setPreviousLink] = useState("");
  const [previousSubmission, setPreviousSubmission] = useState({
    files: [],
    links: [],
  });
  const [showAddNewSubmission, setShowAddNewSubmission] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState([]);
  const [submissionId, setSubmissionId] = useState(null);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [requestMethod, setRequestMethod] = useState("POST");

  useEffect(() => {
    const getAssignmentData = () => {
      fetch("http://127.0.0.1:8000/api/assignments", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (Array.isArray(result) && result.length > 0) {
            console.log(result);
            setApiData(result);
            setMarks(result[0].marks);
          } else {
            console.error("Invalid API response:", result);
          }
        })
        .catch((error) => {
          console.error("Error fetching assignment data:", error);
        });
    };

    getAssignmentData();
    handleAssignment(selectedAssignment);
  }, [selectedAssignment,0]);

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

  // useEffect(() => {
  //   const getGradingData = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/api/assignment_gradings", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Token ${sessionStorage.getItem("user_token")}`,
  //         },
  //       });

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       // console.log("API Data:", data, data[0].marks);
  //       setGradeData(data[0].marks);
  //       setFeedbackData(data[0].comments);
  //       console.log("feddback data from variab", gradeData)

  //     } catch (error) {
  //       console.error("Error fetching grading data:", error);
  //     }
  //   };

  //   getGradingData();
  // }, []);

  // console.log("I m feedback data : ", feedbackData);
  // const marks = feedbackData ? feedbackData.marks : null;

  // const simulateSubmission = () => {
  //   setTimeout(() => {
  //     // Simulate pass or fail randomly
  //     const isPassed = Math.random() < 0.5;

  //     const feedback = isPassed
  //       ? "Congratulations! You have passed the assignment."
  //       : "Sorry, you have not passed the assignment. Please review and resubmit.";

  //     const grade = isPassed ? selectedAssignment.points : 0;

  //     setInstructorFeedback(feedback);
  //     setSelectedAssignment((prevSelectedAssignment) => ({
  //       ...prevSelectedAssignment,
  //       feedback,
  //       grade,
  //     }));
  //     setIsSubmitClicked(true);
  //   }, 2000);
  // };

  function handleAssignment(assignment) {
    console.log("this is selected assignment:", assignment);
    setSelectedAssignment(assignment);
    setFiles([]);
    setLinks([]);
    setSubmissionOption(null);
    setIsResubmit(false);
    setShowLink(false);
    // setShowAddNewSubmission(false)
    setIsConfirmButtonVisible(true);
    setInstructorFeedback(null);
    setAssignmentid(assignment.id);

    const getGradingData = () => {
      fetch(
        `http://127.0.0.1:8000/api/assignments/${assignment.id}/assignment_submissions/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Api result submissions: ", result);
            result.forEach(assignmentSub => {
              if(assignmentSub.submitted_by === +sessionStorage.getItem("user_id")){
                getGradingAPI(assignmentSub.id);
              }
            })
            
            if (result.length > 0) {
              const check = result.some(assignmentSub => {
                return assignmentSub.submitted_by === +sessionStorage.getItem("user_id") && assignmentSub.assignment === assignment.id;
              })
              setShowAddNewSubmission(!check);
              setIsSubmitClicked(check);

            } else {
              setShowAddNewSubmission(true);
              setIsSubmitClicked(false);
            }
            // setShowAddNewSubmission(true);
          });
        } else {
          console.log(response);
          setGradeData(0);
          setShowAddNewSubmission(true);
          setIsSubmitClicked(false);
        }
      });
    };

    const getGradingAPI = (id) => {
      fetch(
        `http://127.0.0.1:8000/api/assignment_submissions/${id}/assignment_gradings`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Api result Gradings: ", result);
            setGradeData(result[result.length - 1].marks);
            setFeedbackData(result[result.length - 1].comments);
            setStatusData(result[result.length - 1].status);

            if (result[result.length - 1].marks === null) {
              setShowAddNewSubmission(false);
            } else {
              setShowEditButton(false);
              setShowAddNewSubmission(false);
            }

            // Check if the status is "pending" and update isResubmit accordingly
            if (result[result.length - 1].marks === null) {
              setIsResubmit(true);
            } else {
              setIsResubmit(false);
            }
          });
        } else {
          console.log(response);
          setGradeData(0);
          setShowAddNewSubmission(false);
        }
      });
    };

    getGradingData();
  }

  // function handleToggleResubmit() {
  //   setIsResubmit(!isResubmit);

  //   if (!isResubmit) {
  //     setFiles([]);
  //     setLinks([]);
  //     setIsDone(false);
  //     setSubmissionOption(null);
  //     setShowSubmissionOptions(false);
  //     setIsSubmitClicked(false);
  //     setIsConfirmButtonVisible(true);
  //     setInstructorFeedback(null); // Reset feedback when toggling resubmit
  //   }
  // }

  function fetchSubmissionByAssignment(assignmentId) {
    fetch(
      `http://127.0.0.1:8000/api/assignments/${assignmentId}/assignment_submissions`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            if (result.length > 0) {
              const check = result.some(assignmentSub => {
                return assignmentSub.submitted_by === +sessionStorage.getItem("user_id") && assignmentSub.assignment === assignmentId;
              })
              setShowAddNewSubmission(!check);
              setIsSubmitClicked(check);
              // const submission= submissionData;
              const submission = result[result.length - 1];
              console.log("Submission Data:", submission);
              // setIsSubmitClicked(true);
              setSubmissionId(submission.id);
              setLink(submission.submitted_link);
              setFile(submission.content);
              setFiles(submission.content);
              // setShowAddNewSubmission(false);
            } else {
              console.log("No submissions found for this assignment");
              setShowAddNewSubmission(true);
              setIsSubmitClicked(false);
            }
          });
        } else {
          console.error("Error fetching submission data:", response);
          setShowAddNewSubmission(true);
          setIsSubmitClicked(false);
        }
      })
  }

  function handleToggleResubmit(submission) {
    setShowLink(true);

    console.log("getting status :", statusData);
    console.log("getting  :", isResubmit);
    if (statusData === "Pending") {
      console.log("submission ID", submission);
      setIsResubmit(true);
      setFiles([]);
      setLinks([]);
      // if (!isResubmit) {
      fetchSubmissionByAssignment(submission);
      // setSubmittedLink(submission.submitted_link);
      setIsEditClicked(true);
      setShowLink(true);

      setSubmissionOption(null);
      setShowSubmissionOptions(false);
      setIsSubmitClicked(false);
      setIsConfirmButtonVisible(true);
      setInstructorFeedback(null);
      // }
    }
  }

  function handleLinkChange() {
    if (link.trim() !== "") {
      setLinks([...links, link]);
      setSubmissionOption(null);
    }
  }

  function toggleFileInput() {
    setIsFileInputVisible(!isFileInputVisible);
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    // setFiles((pre) =>[...pre, selectedFiles]);
    console.log("selected file", selectedFile);
    setFile(selectedFile);
    setIsFileInputVisible(true);
  }
  console.log("file ", files);
  function handleRemoveFile(index) {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  }
  function handleRemoveLink(index) {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  }

  function handleRequestPost(method) {
    if (isSubmissionValid()) {
      setRequestMethod(method);
      setShowConfirmationDialog(true);
    } else {
      // Show a pop-up or set an error message to inform the user that they need to insert a file or link.
      alert("Please insert a file or link before submitting.");
    }
  }

  function handleSubmit(request) {
    const handleAssignmentProgress = (id) => {
      const obj = {
        title: selectedAssignment.title,
        description: selectedAssignment.description,
        due_date: selectedAssignment.due_date,
        due_time: selectedAssignment.due_time,
        marks: selectedAssignment.marks,
        instructor: selectedAssignment.instructor,
        unit: selectedAssignment.unit,
        updated_by: userId,
        completion: true,
        learner: userId
      };

      fetch(`http://127.0.0.1:8000/api/assignments/${id}/`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("updated Assignment: ", result);
          });
        } else {
          console.log(response);
        }
      });
    };

    let url = "";
    const formData = new FormData();
    formData.append("submitted_by", sessionStorage.getItem("user_id"));
    formData.append("assignment", assignmentid);
    const currentDateTime = new Date().toISOString();
    formData.append("submission_date", currentDateTime);
    formData.append("submitted_link", link);
    if (typeof file === "object" && file != null) {
      formData.append("content", file);
    }
    // const obj = {
    //   submitted_by: sessionStorage.getItem("user_id"),
    //   assignment: assignmentid,
    //   submission_date: "2022-10-03T10:00:00Z",
    //   submitted_link: link,
    //   // content: file,
    // };
    if (request === "POST") {
      url = `http://127.0.0.1:8000/api/assignment_submissions/`;
    } else {
      url = `http://127.0.0.1:8000/api/assignment_submissions/${submissionId}/`;
    }
    async function postData(formData) {
      try {
        const response = await fetch(`${url}`, {
          method: request,
          // body: JSON.stringify(obj),
          body: formData,
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            // "Content-type": "application/json; charset=UTF-8",
          },
        });

        const dueDate = selectedAssignment.dueDate; 
        const currentDate = new Date();

        // Compare the due date with the current date
        const isDueDatePassed = currentDate > new Date(dueDate);
        
        // Update the logic after handling the assignment submission response
        if (response.status === 201 || response.status === 200) {
          handleAssignmentProgress(selectedAssignment.id);
          setFile("");
          setFiles("");
          setLink("");
          setLinks("");
          setStatusData("Pending");
        
          // Set showEditButton based on whether the due date has passed
          setShowEditButton(!isDueDatePassed);
          setShowLink(false);
          const result = await response.json();
          console.log(result.id);
          setShowAddNewSubmission(false);
          const submissionId = result.id;
          setSubmissionId(result.id);
          // const newSubmissionId = result.id;
          // fetchSubmissionByAssignment(newSubmissionId);

          const formattedSubmissionDate = new Date(formData.submission_date);
          const formattedDueDate = new Date(selectedAssignment.due_date);

          if (formattedSubmissionDate > formattedDueDate) {
            setSubmissionStatus("Late Submission");
          } else {
            setSubmissionStatus("");
          }

          // const updatedData = {
          //   submitted_link: link, // Update with the new link
          //   // Other fields that need to be updated
          // };
          // console.log("Submitting data:", formData);
          // fetch(
          //   `http://127.0.0.1:8000/api/assignment_submissions/${submissionId}/`,
          //   {
          //     method: "PUT",
          //     headers: {
          //       Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(updatedData),
          //   }
          // )
          //   .then((putResponse) => {
          //     if (putResponse.status === 200) {
          //       // Submission updated successfully, you can update your local state if needed
          //       console.log("Submission updated successfully");
          //     } else {
          //       console.error("Error updating submission:", putResponse);
          //     }
          //   })
          //   .catch((error) => {
          //     console.error("Error updating submission:", error);
          //   });

          // Rest of your code
          setLink("");

          const gradingURL = `http://127.0.0.1:8000/api/assignment_submissions/${submissionId}/assignment_gradings`;

          const gradingResponse = await fetch(gradingURL, {
            method: "GET",
            headers: {
              Authorization: `Token ${sessionStorage.getItem("user_token")}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          });

          if (gradingResponse.status === 200) {
            const gradingResult = await gradingResponse.json();
            console.log(gradingResult[0].marks);
            console.log(gradingResult[0].status);
            console.log(gradingResult[0].comments);
            setGradeData(gradingResult[0].marks);
          } else {
            console.log(gradingResponse);
          }

          setLink("");

          // setFile([])
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Call the postData function when needed:
    postData(formData);
  }

  console.log("selected Assignement", selectedAssignment);

  function handleConfirmSubmit() {
    setIsSubmitClicked(true);
    setShowConfirmationDialog(false);
    handleSubmit(requestMethod);
    // simulateSubmission(); // Simulate submission and get feedback
  }

  function handleCloseConfirmationDialog() {
    setShowConfirmationDialog(false);
  }

  function isSubmissionValid() {
    return (file && file.length !== "") || link.trim() !== "";
  }

  return (
    <>
      <div className="app">
        <div className="assignment-view">
          {/* <div className="assignment-list">
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
          </div> */}
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
                    {selectedAssignment.marks}
                  </div>
                  {/* <div className="detail-create">
                    <strong>Created At:</strong>
                    {selectedAssignment.created_at}
                  </div> */}
                  <div className="detail-date">
                    <strong>Due date:</strong>
                    {selectedAssignment.due_date}
                  </div>
                  <div className="detail-time">
                    <strong>:</strong>
                    {selectedAssignment.due_time}
                  </div>
              </div>

                </div>
                
              <div className="detail-description">
                {selectedAssignment.description}
              </div>
              {/* <div className="resource-files">
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
              </div> */}
              <div className="resource-files">
                {selectedAssignment.assignment_file ? (
                  <>
                    <p>Attached Resource File:</p>
                    <a
                      className="res"
                      href={selectedAssignment.assignment_file}
                      download
                    >
                      <i
                        className="fas fa-file me-2"
                        style={{ marginRight: "5px" }}
                      ></i>
                      <strong>{selectedAssignment.assignment_file.slice(44,)}</strong>
                    </a>
                  </>
                ) : (
                  <p>No attached resource file.</p>
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
                  {/* <div className="submission-status">
                    {calculateSubmissionStatus(
                      selectedAssignment.dueDate,
                      isResubmit,
                      isSubmitClicked
                    )}
                    <span className={`${submissionStatus}-status`}>
                      {submissionStatus}
                    </span>
                  </div> */}
                  <div className="submission-status">
                    <span
                      className={`${calculateSubmissionStatus(
                        selectedAssignment.dueDate,
                        isResubmit,
                        isSubmitClicked
                      ).toLowerCase()}-status`}
                    >
                      {calculateSubmissionStatus(
                        selectedAssignment.due_date,
                        isResubmit,
                        isSubmitClicked
                      )}
                    </span>
                  </div>
                  {/* {file.length > 0 && ( */}
                  <>
                    <ul className="uploa">
                      {file && (
                        <li className="upload">
                          <a href={file} download>
                            <img src={fil} alt="" className="pht" />
                            <div className="fil-text">
                              {typeof file === "string"
                                ? file.slice(36)
                                : file.name}
                            </div>
                          </a>
                        </li>
                      )}
                    </ul>
                  </>

                  {/* )} */}
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
                            <span
                              className="rem-link"
                              // onClick={() => handleRemoveLink(index)
                              // }
                              onClick={() => {
                                // Set the current link as the previous link
                                handleRemoveLink(index)
                                // Clear the link input field
                                setLink('');
                                // Close the popup
                                setSubmissionOption(null);
                              }}
                            >
                              &#x2716;
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                <div className="feedback-section">
                  <div className="toggle-submission-button">
                    {isSubmitClicked && (
                      <div>
                        {showEditButton && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditClicked(true);
                              setShowEditButton(false);
                              handleToggleResubmit(assignmentid);
                            }}
                            disabled={isEditButtonDisabled}
                            className="resubmit-btn"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    )}
                    {showLink && (
                      <>
                        {isEditClicked && (
                          <>
                            <input
                              type="text"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              placeholder="Enter link URL"
                              className="lnk-text"
                            />

                            <div className="load-img">
                              <label
                                htmlFor="fileInput"
                                className={`edit-fil ${
                                  isFileInputVisible ? "hidden" : ""
                                }`}
                                onClick={toggleFileInput}
                              >
                                <i className="fas fa-upload"></i> Upload File
                              </label>

                              <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e)}
                                id="fileInput"
                                // className="edit-fil"
                                // value={file}
                                style={{ display: "none" }}
                              />
                            </div>
                          </>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            setIsEditButtonDisabled(false);
                            // handleSubmit(e, "PUT");
                            e.preventDefault();
                            handleRequestPost("PUT");
                          }}
                          className="resubmit-btn"
                          disabled={!selectedAssignment}
                        >
                          Resubmit
                        </button>
                      </>
                    )}
                    {showAddNewSubmission && (
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
                            <div>
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
                            </div>
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
                                      onChange={(e) => handleFileChange(e)}
                                      id="fileInput"
                                      multiple
                                      // className="upload-fil"
                                      style={{ display: "none" }}
                                      // value={""}
                                    />
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        {isConfirmButtonVisible && (
                          <button
                            type="button"
                            // onClick={(e) => handleSubmit(e, "POST")}
                            onClick={(e) => {
                              e.preventDefault();
                              handleRequestPost("POST");
                            }}
                            className="save-btn"
                            disabled={!selectedAssignment}
                          >
                            Submit
                          </button>
                        )}
                      </div>
                    )}

                    {submissionOption === "link" && (
                      <div className="link-place">
                        <div
                          className="close-icon"
                          
                          onClick={() => {
                           
                            // setPreviousLink(link);
                           
                            // setLink('');
                         
                            setSubmissionOption(null);
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </div>
                        <input
                          type="text"
                          value={link}
                          // value={submissionOption === "link" ? link : previousLink}
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
                            {/* <label
                                  htmlFor="fileInput"
                                  className={`custom-button ${
                                    isFileInputVisible ? "hidden" : ""
                                  }`}
                                  onClick={toggleFileInput}
                                >
                                  <i className="fas fa-upload"></i> Upload File
                                </label> */}
                            {isFileInputVisible && (
                              <>
                                <input
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                  onChange={(e) => handleFileChange(e)}
                                  id="fileInput"
                                  multiple
                                  // className="upload-fil"
                                  // value={""}
                                />
                              </>
                            )}
                          </div>
                        )}
                        {!isFileInputVisible && <></>}
                      </>
                    )}

                    {showConfirmationDialog && (
                      <div className="confirmation-dialog">
                        <p>Are you sure you want to submit this assignment?</p>
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
                  </div>
                </div>
                {/* Display Feedback and Grade */}
                <>
                  {/* {isSubmitClicked && feedbackData !== null && ( */}
                  <div className="feedback-and-grade">
                    <div className="feedback-and-grad">
                      <div className="feedback-fb">
                        <strong>Comments:</strong>{" "}
                        {gradeData ? feedbackData : "No feedback yet"}
                      </div>
                      <div className="grade-gd">
                        <strong>Grade:</strong>{" "}
                        {gradeData
                          ? `${gradeData} / ${marks}`
                          : "Not graded yet"}
                      </div>
                      {/* <div className="status">
                        <strong>Status:</strong>{" "}
                        {gradeData ? statusData : "pending"}
                      </div> */}

                      <div className="status">
                        {/* <strong>Status:</strong>{" "} */}
                        {gradeData ? (
                          statusData === "Pass" ? (
                            <div className="status-pass">
                              <div className="status-bulb green"></div>
                              <strong className="status-list">Pass</strong>
                            </div>
                          ) : (
                            <div className="status-fail">
                              <div className="status-bulb red"></div>
                              <strong className="status-list">
                                Not Passed
                              </strong>
                            </div>
                          )
                        ) : (
                          <div className="status-pending">
                            <div className="status-bulb yellow"></div>
                            <strong className="status-list">Pending</strong>
                          </div>
                        )}
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

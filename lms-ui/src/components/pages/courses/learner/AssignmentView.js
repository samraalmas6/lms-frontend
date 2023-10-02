import React, { useState } from "react";
import "../../../styles/AssignmentView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import fil from "../content/Images/fil.png";

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
  const [selectedAssignment, setSelectedAssignment] = useState();
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

  const assignments = [
    {
      id: 1,
      title: "Assignment 1",
      description: "Complete the first assignment.",
      dueDate: "2023-09-30 14:00",
      points: 90,
      resourceFiles: ["https://example.com/your-pdf-file.pdf" , "file2.doc"],
      submissionLinks: ["https://example.com/your-file-url", "https://anotherlink.com"],
      feedback: "", // Add feedback property
      grade: null, // Add grade property
    },
    // Add more assignments here.
  ];

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

  function handleAssignment(assignment) {
    setSelectedAssignment(assignment);
    setFiles([]);
    setLinks([]);
    setIsDone(false);
    setSubmissionOption(null);
    setIsResubmit(false);
    setIsConfirmButtonVisible(true);
    setInstructorFeedback(null); // Reset feedback when changing assignments
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
      setLink("");
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
    setShowConfirmationDialog(true);
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
            {assignments.map((assignment) => (
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
                    {selectedAssignment.points}
                  </div>
                  <div className="detail-date">
                    <strong>Due date:</strong>
                    {selectedAssignment.dueDate}
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
                          <li key={index}>
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
                                    className="submit-button"
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
                {/* Instructor's feedback
              {instructorFeedback !== null && (
                <div className="instructor-feedback">
                  <div
                    className={`feedback ${
                      instructorFeedback.includes("Congratulations")
                        ? "pass"
                        : "fail"
                    }`}
                  >
                    {instructorFeedback}
                  </div>
                </div>
              )} */}
                {/* Display Feedback and Grade */}
                <>
                {isSubmitClicked && (
                  <div className="feedback-and-grade">
                    <div className="feedback-and-grad">
                      <div className="feedback">
                        <strong>Feedback:</strong>{" "}
                        {selectedAssignment.feedback || "No feedback yet"}
                      </div>
                      <div className="grade">
                        <strong>Grade:</strong>{" "}
                        {selectedAssignment.grade !== null
                          ? `${selectedAssignment.grade} / ${selectedAssignment.points}`
                          : "Not graded yet"}
                      </div>
                    </div>
                  </div>
                )}
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

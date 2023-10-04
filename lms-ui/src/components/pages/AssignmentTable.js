import React, { useState, useEffect } from "react";
import assignmentData from "../content/Data/assignmentData";
import "../styles/AssignmentTable.css"; // Import the CSS file

function AssignmentTable() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const [userFeedbackMap, setUserFeedbackMap] = useState({});
  const [userStatusMap, setUserStatusMap] = useState({});
  const [filterOption, setFilterOption] = useState("All"); 

  useEffect(() => {
    // Initialize userStatusMap with "Pending" for each assignment
    const initialStatusMap = {};
    assignmentData.forEach((item) => {
      initialStatusMap[item.id] = "Pending";
    });
    setUserStatusMap(initialStatusMap);
  }, []);

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
    const selectedAssignmentData = assignmentData.find(
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
  const filteredAssignments = assignmentData.filter((item) => {
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

  return (
    <div>
    
      <div className="filter-container">
        <label>Filter by:</label>
        <button
          className={`filter-button ${filterOption === "All" ? "active" : ""}`}
          onClick={() => setFilterOption("All")}
        >
          All
        </button>
        <button
          className={`filter-button ${
            filterOption === "Passed" ? "active" : ""
          }`}
          onClick={() => setFilterOption("Passed")}
        >
          Passed
        </button>
        <button
          className={`filter-button ${
            filterOption === "NotPassed" ? "active" : ""
          }`}
          onClick={() => setFilterOption("NotPassed")}
        >
          Not Passed
        </button>
        <button
          className={`filter-button ${
            filterOption === "Pending" ? "active" : ""
          }`}
          onClick={() => setFilterOption("Pending")}
        >
          Pending
        </button>
      </div>

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
                {userFeedbackMap[item.id]?.grade || "-"}/{item.Grade}
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
            <button className="close-button" onClick={closePopup}>
              X
            </button>
            <p>Assignment Content</p>
            <p className="content">
              <a
                href={
                  assignmentData.find((item) => item.id === selectedAssignment)
                    ?.content
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {
                  assignmentData.find((item) => item.id === selectedAssignment)
                    ?.content
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
                  assignmentData.find((item) => item.id === selectedAssignment)
                    ?.Grade || 100
                }
              />
              <span className="grade-text">
                out of{" "}
                {assignmentData.find((item) => item.id === selectedAssignment)
                  ?.Grade || 100}
              </span>
            </div>

            <button onClick={handleSubmit} className="send-btn">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentTable;

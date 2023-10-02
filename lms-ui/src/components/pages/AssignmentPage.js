import React from "react";

function AssignmentPage({ assignment }) {
 


    return (
      <div className="assignment-details">
        <h2>{assignment.title}</h2>
        <p>{assignment.description}</p>
        <div className="assignment-info">
          <div className="assignment-feedback">
            <h3>Feedback</h3>
            <p>{assignment.feedback}</p>
          </div>
          <div className="assignment-grading">
            <h3>Grading</h3>
            <p>Grade: {assignment.grade}</p>
          </div>
        </div>
      </div>
    );
  }
  

  

export default AssignmentPage;

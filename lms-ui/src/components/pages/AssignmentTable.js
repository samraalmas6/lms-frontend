import React, { useState } from 'react';
import assignmentData from "../content/Data/assignmentData"



function AssignmentTable() {
  const [selectedUser, setSelectedUser] = useState(null);

  const openPopup = (userId) => {
    setSelectedUser(userId);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <h1>Assignment Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Submitted By</th>
            <th>Assignment</th>
            <th>Submission Date</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {assignmentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <button onClick={() => openPopup(item.id)}>
                  {item.submitted_by}
                </button>
              </td>
              <td>{item.assignment}</td>
              <td>{item.submission_date}</td>
              <td>{item.Due_Date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser !== null && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
            <h2>Assignment Content</h2>
            <p>{assignmentData.find((item) => item.id === selectedUser)?.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignmentTable;


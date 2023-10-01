import React from 'react'

const SubmittedAssignTable = ({ data }) => {
  return (
    <div>
      <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Submission Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.userName}</td>
            <td>{item.submissionDate}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default SubmittedAssignTable

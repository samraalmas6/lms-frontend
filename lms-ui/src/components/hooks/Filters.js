import React from 'react'

const Filters = ({ activeFilter, onChangeFilter }) => {
  return (
    <div>
      <div className="nav-bar">
      <button
        onClick={() => onChangeFilter("All")}
        className={activeFilter === "All" ? "active" : ""}
      >
        All
      </button>
      <button
        onClick={() => onChangeFilter("Pending")}
        className={activeFilter === "Pending" ? "active" : ""}
      >
        Pending
      </button>
      <button
        onClick={() => onChangeFilter("Passed")}
        className={activeFilter === "Passed" ? "active" : ""}
      >
        Passed
      </button>
      <button
        onClick={() => onChangeFilter("NotPassed")}
        className={activeFilter === "NotPassed" ? "active" : ""}
      >
        Not Passed
      </button>
    </div>
    </div>
  )
}

export default Filters

import React, { useState } from "react";
import CourseModule from './CourseModule'

const LeasonForm = ({setUnitData, handleAddModule}) => {

    const [unitTitle, setUnitTitle] = useState('')

    const handleUnitTitle = (e) => {
        setUnitTitle(e.target.value)
    }

    const handleAddUnit = (e) => {
        e.preventDefault()
        setUnitData(pre => [...pre,{unitTitle}] )
        setUnitTitle('')
        handleAddModule()
    }
  return (
    <div>
      <form className="course-unit-form">
        <label>
          Unit Name
          <input type="text" placeholder="Unit Title" value={unitTitle} onChange={handleUnitTitle} />
        </label>
        <select>
            <option value="">---Add content---</option>
            <option value="Video">Add Video</option>
            <option value="Audio">Add Audio</option>
            <option value="PPT">Add PPT</option>
            <option value="PDF">Add PDF</option>
            <option value="Quiz">Add Quiz</option>
            <option value="Assignment">Add Assignment</option>
        </select>
       <button type="button" onClick={handleAddUnit}>Add</button>
      </form>
      {/* <button type="button" onClick={() => setShowModule(true)}>Add Module</button> */}
      {/* {showModule && <CourseModule />} */}
    </div>
  );
};

export default LeasonForm;

import React, { useState } from "react";
import LeasonForm from "./LeasonForm";

const Module = ({setModuleData, setShowModule}) => {

  const [moduleTitle, setModuleTitle] = useState('')
  const [moduleStart, setModuleStart] = useState('')
  const [moduleEnd, setModuleEnd] = useState('')

  const [unitData, setUnitData] = useState([])

  const [showUnit, setShowUnit] = useState(false)

  const handleModuleTitle = (e) =>{
    setModuleTitle(e.target.value)
  }
  const handleModuleStart = (e) =>{
    setModuleStart(e.target.value)
  }
  const handleModuleEnd = (e) =>{
    setModuleEnd(e.target.value)
  }

  const handleAddModule = (e) => {
    setModuleData((pre) => [...pre,{moduleTitle, moduleStart, moduleEnd,unitData}])
    setModuleTitle('')
    setModuleStart('')
    setModuleEnd('')
    setShowModule(pre => !pre)
  }
  return (
    <div>
      <h3>Module Details</h3>
      <form className="course-module-form">
        <label>
          Module Name
          <input type="text" placeholder="Module Title" value={moduleTitle} onChange={handleModuleTitle} />
        </label>
        <label>
          Module Start Date
          <input type="date" placeholder="Start Date" value={moduleStart} onChange={handleModuleStart} />
        </label>
        <label>
          Module End Date
          <input type="date" placeholder="End Date" value={moduleEnd} onChange={handleModuleEnd} />
        </label>
      </form>
      <button type="button" onClick={() => setShowUnit(!showUnit)}>Add Unit</button>
     {showUnit && <LeasonForm setUnitData={setUnitData} handleAddModule={handleAddModule}/> }
    </div>
  );
};

export default Module;

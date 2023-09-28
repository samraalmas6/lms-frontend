import React, { useEffect, useState } from 'react'
import assignmentData from '../content/Data/assignmentData'
import courseData from '../content/Data/courseData'
import courseModuleData from '../content/Data/courseModulesData'
import courseUnitData from '../content/Data/courseUnitData'
import userData from '../content/Data//userData'

const AssignmentGrading = () => {
    const[courseData,setCourseData] = useState([])
    const[module,setModule] = useState([])
    const[unit, setUnit] = useState([])

    useEffect(() => {
        setCourseData[courseData]
    })
    console.log(courseData)
  return (
    <div>
        <h1>Course Data</h1>
      {courseData}
    </div>
  )
}

export default AssignmentGrading


<div className="row">
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
      assignmentContent.find((item) => item.id === selectedAssignment)?.Grade ||
      100
    }
  />
  <span className="grade-text">
    out of{" "}
    {assignmentContent.find((item) => item.id === selectedAssignment)?.Grade ||
      100}
  </span>
</div>;
 <div className="status-dropdown">
 <select
   onChange={(e) =>
     handleStatus(e)
   }
   value={updatedStatus}
 >
   <option
     disabled
     selected
   >
     select status
   </option>
   <option value="pass">
     pass
   </option>
   <option value="fail">
     fail
   </option>
 </select>
</div>
</div>

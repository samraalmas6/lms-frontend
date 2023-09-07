import React, { useEffect, useRef, useState } from "react";
import '../../styles/Teams.css'
import AllTeams from "./AllTeams";

const AddTeam = () => {

    const savebtnRef = useRef('')
    // const [teamName, setTeamName] = useState('')
 
    // const handleTeamName = (e) =>{
    //     setTeamName(e.target.value)
    // }
    
    
    // const handleSaveTeam = (e) => {
    //     e.preventDefault()
    //     const TeamData = {
    //         teamName
    //     }
        
    //     setTeamName('')
    //     // savebtnRef.current.setAttribute('data-bs-dismiss', 'offcanvas')
        
    // }
    


  return (
    <div>
        {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTeam" aria-controls="offcanvasTeam">Toggle right offcanvas</button> */}
        <AllTeams show={'show'} />
      {/* <div
        className="offcanvas offcanvas-end show"
        tabIndex="-1"
        style={{ width: "30%" }}
        id="offcanvasTeam"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-body ">
          <div className="add-course-content w-100">
            <div className="course-form-section w-100">
              <div className="offcanvas-head">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                  Add Team
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <form>
                <label className="mb-0">
                  Team Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={handleTeamName}
                  required
                  placeholder="Team Name"
                  className="team-name"
                />
                <div className="team-save-btn">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSave}
                    ref={savebtnRef}
                    data-bs-dismiss="offcanvas"
                  >
                    Save Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default AddTeam;

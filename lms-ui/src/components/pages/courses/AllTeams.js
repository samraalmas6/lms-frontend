import React, { useEffect, useRef, useState } from "react";
import teamsData from "../../hooks/teamData";
import AddTeam from "../AddTeam";

const AllTeams = ({show}) => {
  const [showBlock, setShowBlock] = useState(false);

  const [teamName, setTeamName] = useState('')
  const [teamData, setTeamData] = useState(teamsData)
 
  const handleTeamName = (e) =>{
      setTeamName(e.target.value)
  }
  
  
  const handleSaveTeam = (e) => {
      e.preventDefault()
      setTeamData([...teamData,{TeamName: teamName, id: 3}])
      setTeamName('')
      // savebtnRef.current.setAttribute('data-bs-dismiss', 'offcanvas')
      
  }


  const handleSave = (e) => {
    // e.preventDefault();

    // if (categoryTitle) {
    //   const obj = {
    //     id: courseData[courseData.length - 1].id + 1,
    //     course_title: categoryTitle,
    //     author: "",
    //     duration: 25,
    //     users_enrolled: 0,
    //     last_updated: "3 hours ago",
    //   };
    //   courseData.push(obj);
    // }
    // setCategory("");
    // setCategoryTitle("");
  };

  // console.log(process.env.REACT_APP_API_KEY);

  return (
    <div>
      <div className="all-course-content">
        <div className="creat-course-btn">
          <button
            type="button"
            className="btn btn-primary ms-3 mb-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTeam"
            aria-controls="offcanvasRight"
          >
            <i className="fas fa-solid fa-plus"></i> Add Team
          </button>
          {/* This is for Team Add panel */}
        </div>
        <div
        className= {`offcanvas offcanvas-end ${show}`}
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
                    onClick={handleSaveTeam}
                    data-bs-dismiss="offcanvas"
                  >
                    Save Team
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        {/* This is for Course Content */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          style={{ width: "87%" }}
          id="offcanvasCourse"
          aria-labelledby="offcanvasRightLabel"
        >
          {/* <AddTeam  courseData={ courseData } /> */}

        </div>
        {!showBlock ? (
          <table className="table">
            <thead>
              <tr>
              <th scope="col">Names</th>
                <th scope="col">Users</th>
                <th scope="col">Courses</th>

              </tr>
            </thead>
            <tbody>
              {teamData.map((team) => {
                return (
                  <tr
                    key={team.id}
                    role="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                  >
                    <td >{team.TeamName}</td>
                    <td>{team.Users && team.Users.join(', ')}</td>
                    <td>{team.Courses && team.Courses.join(', ')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        
        )}
      </div>
    </div>
  );
};

export default AllTeams;

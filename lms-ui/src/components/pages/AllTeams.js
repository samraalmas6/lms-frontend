import React, { useEffect, useRef, useState } from "react";
import teamsData from "../hooks/teamData";
import AddTeam from "./AddTeam";

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
          
          <div className="offcanvas-body">
      <div className="add-course-content">
        <div className="course-name-section">
          <ul>
            {teamData &&
              teamData.map((team) => {
                return (
                  <div key={team.id}>
                    <li>
                      <a role="button">{team.TeamName}</a>
                    </li>
                  </div>
                );
              })}
          </ul>
        </div>
        <div className="course-form-section">
          <div className="offcanvas-head">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Add Team Details
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
              
              className="course-title"
            />
            <label className="mb-0 mt-1">Description</label>

            <div className="category-save-btn">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={"handleSave"}
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <button
        type="button"
        className="btn btn-primary w-100"
        data-bs-toggle="collapse"
        data-bs-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
      >
        Create Course +
      </button>
      <div
        id="collapseOne"
        className="collapse "
        data-bs-parent="#accordionExample"
      >
        <div className="course-main">
          <form className="course-create-form">
            <div className="course-title">
              <label>Course Name:</label>
              <input
                type="text"
                placeholder="Course Title"
                value={courseTitle}
                onChange={handleCourseTitle}
              />
            </div>
            <div className="course-start">
              <label>Course Start Date:</label>
              <input
                type="date"
                placeholder="Start Date"
                min={minDate}
                value={courseStart}
                onChange={handleCourseStart}
              />
            </div>
            <div className="course-end">
              <label>Course End Date:</label>
              <input
                type="date"
                max="2030-12-30"
                min={minDate}
                placeholder="End Date"
                value={courseEnd}
                onChange={handleCourseEnd}
              />
            </div>
          </form>
          <ul>
            {moduleData
              ? moduleData.map((data) => {
                  return (
                    <div key={data.moduleTitle}>
                      <li>{data.moduleTitle}</li>
                    </div>
                  );
                })
              : ""}
          </ul> 
           <div className="course-module-section">
            <div>
            <button
              type="button"
              className="btn btn-secondary w-50"
              onClick={() => setShowModule((pre) => !pre)}
            >
              Add Module
            </button>
            {showModule && (
              <CourseModule
                setModuleData={setModuleData}
                setShowModule={setShowModule}
                minDate={minDate}
              />
            )}
            </div>
          </div>

          <div className="add-course-btn">
            <button type="button" className="btn btn-outline-primary">
              Create Course
            </button>
          </div>
        </div>
      </div> */}
    </div>
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
                    onClick={() => setTeamName(team.TeamName)}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                  >
                    <td >{team.TeamName}</td>
                    <td>{team.Users && team.Users.map(user => {
                      return user.name
                    }).join(', ')
                    
                    }</td>
                    <td>{team.Courses && team.Courses.map(course => {
                      return course.course_title
                    }).join(', ')
                    }</td>
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

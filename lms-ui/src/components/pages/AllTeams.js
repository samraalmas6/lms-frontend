import React, { useEffect, useRef, useState } from "react";
import teamsData from "../hooks/teamData";
import styles from "../../components/styles/AllTeam.module.css";
import userImg from "../content/Images/user.png";
import AddTeam from "./AddTeam";

const AllTeams = ({ show }) => {
  const [showBlock, setShowBlock] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [teamData, setTeamData] = useState(teamsData);
  const [teamUsers, setTeamUser] = useState([]);
  const [teamCourses, setTeamCourses] = useState([]);
  const [teamDetail, setTeamDetail] = useState([])

  const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

  const handleSaveTeam = (e) => {
    e.preventDefault();
    setTeamData([...teamData, { TeamName: teamName, id: 3 }]);
    setTeamName("");
    // savebtnRef.current.setAttribute('data-bs-dismiss', 'offcanvas')
  };

  const handleSave = (e) => {};

  // console.log(process.env.REACT_APP_API_KEY);

  // console.log(teamDetail);
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
          className={`offcanvas offcanvas-end ${show}`}
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
                            <a
                              role="button"
                              onClick={() => {
                                setTeamName(team.TeamName)
                                setTeamUser(team.Users)
                                setTeamCourses(team.Courses)
                              }
                              }
                            >
                              {team.TeamName}
                            </a>
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
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Course Title</th>
                          <th scope="col">Author</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Users Enrolled</th>
                          <th scope="col">Last Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamDetail &&
                          teamDetail.map((team) => {
                            console.log(team[0].name);
                              return team.map((element) => {
                              return (
                                <tr
                                  key={team[0].id}
                                >           
                                {/* {element.course_title ? <td>{element.course_title}</td>  : null}
                                {element.name ? <td>{element.name}</td>  : null} */}
                                <td>{element.name}</td>
                                <td>{element.course_title}</td>
                                {/* {console.log(element.name)}                        */}
                                {/* <td>{element.course_title ? element.course_title : element.name}</td> */}
                                </tr>
                              );
                            })
                          })}
                      </tbody>
                    </table>

                  <div className="teamCourse-section">
                  <button className="btn btn-primary" type="button">Add Course</button>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Course Title</th>
                          <th scope="col">Author</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Users Enrolled</th>
                          <th scope="col">Last Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamCourses &&
                          teamCourses.map((course) => {
                            return (
                              <tr
                                key={course.id}
                                // role="button"
                                // data-bs-toggle="offcanvas"
                                // data-bs-target="#offcanvasCourse"
                                // aria-controls="offcanvasRight"
                              >
                                <td>{course.course_title}</td>
                                <td>{course.author}</td>
                                <td>{course.duration}</td>
                                <td>{course.users_enrolled}</td>
                                <td>{course.last_updated}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="teamUser-section">
                    <button className="btn btn-primary" type="button">Add User</button>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Role</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone Number</th>
                          <th scope="col">Active</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamUsers &&
                          teamUsers.map((user) => {
                            return (
                              <tr key={user.email}>
                                <td
                                  scope="row"
                                  className="allusers-name-container"
                                >
                                  <div>
                                    <img
                                      src={userImg}
                                      alt=""
                                      className="allusers-image"
                                    />
                                  </div>
                                  <div className="allusers-name-section">
                                    <span>
                                      {/* {user.first_name} {user.last_name} */}
                                      { user.name}
                                    </span>
                                    <span className="designation">
                                      {user.country}
                                    </span>
                                  </div>
                                </td>
                                <td>{user.Role}</td>
                                <td>{user.email}</td>
                                <td>{user.phone_number}</td>
                                <td>
                                  <div className="form-check form-switch">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      role="switch"
                                      readOnly
                                      checked={user.is_active}
                                      id="flexSwitchCheckDefault"
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>

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
                    onClick={() => {
                      setTeamName(team.TeamName);
                      setTeamUser(team.Users);
                      setTeamCourses(team.Courses);
                      setTeamDetail([team.Users, team.Courses])
                    }}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                    
                  >
                    <td >{team.TeamName}</td>
                    <td>
              {team.Users && team.Users.map(user => {
             return <span className={styles.text_with_background}>{user.name}</span>;
             })}
    </td>
                    <td>{team.Courses && team.Courses.map(course => {
                      return <span className={styles.txt_with_background}>{course.course_title}</span> 
                    })
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

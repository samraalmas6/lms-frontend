import React, { useEffect, useRef, useState } from "react";
import teamsData from "../../hooks/teamData";
import styles from "../../styles/AllTeam.module.css";
import userImg from "../../content/Images/user.png";
import AddTeam from "./AddTeam";
import courseData from "../../hooks/courseData";

const AllTeams = ({ show }) => {
  const [showBlock, setShowBlock] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);
  const [showCourseDelete, setShowCourseDelete] = useState(false);
  const [checkedAll, setCheckAll] = useState(false);
  const [userCheckedAll, setUserCheckAll] = useState(false);

  const checkbox = useRef("");

  const [teamName, setTeamName] = useState("");
  const [teamData, setTeamData] = useState(teamsData);
  const [teamUsers, setTeamUser] = useState([]);
  const [teamCourses, setTeamCourses] = useState([]);
  const [teamDetail, setTeamDetail] = useState([]);
  const [addTeam, setAddTeam] = useState([]);

  const [userData, setUserData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const getUsers = () => {
      fetch("http://127.0.0.1:8000/list_all_users/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setUserData(result);
        });
      });
    };
    const getCourse = () => {
      setCoursesData(courseData);
    };
    getUsers();
    getCourse();
  }, []);

  const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

  const handleSaveTeam = (e) => {
    e.preventDefault();
    setTeamData([...teamData, { TeamName: teamName, id: 3 }]);
    setTeamName("");
  };

  const handleCheckChange = (e) => {
    const title = e.target.value;
    if (e.target.checked && title != "undefined") {
      const newObj = courseData.filter((course) => {
        return course.course_title === title;
      });
      setAddTeam([newObj[0]]);
    }
  };
  const handleUserCheckChange = (e) => {
    const title = e.target.value;
    if (e.target.checked && title != "undefined") {
      const newObj = courseData.filter((course) => {
        return course.course_title === title;
      });
      setAddTeam([newObj[0]]);
    }
  };

  const handlAllSelect = () => {
    const selectItems = document.getElementsByClassName("course-check");
    if (checkedAll) {
      for (let item of selectItems) {
        item.checked = false;
      }
    } else {
      for (let item of selectItems) {
        item.checked = true;
      }
    }
  };
  const handlUserAllSelect = () => {
    const selectItems = document.getElementsByClassName("user-check");
    if (checkedAll) {
      for (let item of selectItems) {
        item.checked = false;
      }
    } else {
      for (let item of selectItems) {
        item.checked = true;
      }
    }
  };
  const handleDeleteCourse = (id) => {
    const obj = teamCourses.filter(course => {
      return course.id !== id
    })
    setTeamCourses(obj)
  }

  const handleDeleteUser = (id) => {
    const obj = teamUsers.filter(user => {
      return user.id !== id
    })
    setTeamUser(obj)
  }

  const handleAddCourse = (e) => {
    e.preventDefault();
    const selectItems = document.getElementsByClassName("course-check");
    for (let item of selectItems) {
      if (item.checked) {
        const newObj = courseData.filter((course) => {
          return course.course_title === item.value;
        });
        console.log(" obj  =", newObj);
        if (typeof teamCourses !== "undefined") {
          setTeamCourses(() => [...teamCourses, newObj[0]]);
        } else {
          setTeamCourses([newObj[0]]);
        }
      }

      item.checked = false;
    }

    console.log(teamCourses);
  };
  const handleAddUser = (e) => {
    e.preventDefault();
    const selectItems = document.getElementsByClassName("user-check");
    for (let item of selectItems) {
      if (item.checked) {
        const newObj = userData.filter((user) => {
          return user.email === item.value;
        });
        console.log(" obj  =", newObj);
        if (typeof teamUsers !== "undefined") {
          setTeamUser(() => [...teamUsers, newObj[0]]);
        } else {
          setTeamUser([newObj[0]]);
        }
      }

      item.checked = false;
    }

    console.log(teamUsers);
  };
  const handleSave = (e) => {};

  // console.log(process.env.REACT_APP_API_KEY);

  // console.log(teamDetail);
  // console.log(teamCourses);
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
              <ul style={{ paddingLeft: '10px'}}>
                  {teamData &&
                    teamData.map((team) => {
                      return (
                        <div key={team.id}>
                          <li>
                            <a
                              role="button"
                              onClick={() => {
                                setTeamName(team.TeamName);
                                setTeamUser(team.Users);
                                setTeamCourses(team.Courses);
                              }}
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

                  <div className={styles.teamListSection}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ borderTop: "none" }}>#</th>
                          <th style={{ borderTop: "none" }}>Users</th>
                          <th style={{ borderTop: "none" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamUsers &&
                          teamUsers.map((user, index) => {
                            return (
                              <tr
                                key={user.id}
                                onMouseEnter={() => setShowUserDelete(true)}
                                onMouseLeave={() => setShowUserDelete(false)}
                              >
                                <td className={styles.borderLess}>
                                  {index + 1}
                                </td>
                                <td
                                  className={styles.borderLess}
                                  //   className="allusers-name-container"
                                >
                                  <span>
                                    {user.first_name} {user.last_name}
                                    {/* {user.firstName} */}
                                  </span>
                                </td>
                                <td className={styles.borderLess}>
                                  {showUserDelete ? (
                                    <button
                                      type="button"
                                      className={styles.deleteBtn}
                                      onClick={() => handleDeleteUser(user.id)}

                                    >
                                      X
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      style={{ color: "white" }}
                                      onClick={() => handleDeleteUser(user.id)}
                                      className={styles.deleteBtn}
                                    >
                                      X
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ borderTop: "none" }}>Courses</th>
                          <th style={{ borderTop: "none" }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamCourses &&
                          teamCourses.map((course) => {
                            return (
                              <tr
                                key={course.id}
                                onMouseEnter={() => setShowCourseDelete(true)}
                                onMouseLeave={() => setShowCourseDelete(false)}
                              >
                                <td className={styles.borderLess}>
                                  {course.course_title}
                                </td>
                                <td className={styles.borderLess}>
                                  {showCourseDelete ? (
                                    <button
                                      type="button"
                                      className={styles.deleteBtn}
                                      onClick={() => handleDeleteCourse(course.id)}
                                    >
                                     
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      style={{ color: "white" }}
                                      onClick={() => handleDeleteCourse(course.id)}
                                      className={styles.deleteBtn}
                                    >
                                      X
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="courseAddBtn">
                    <button
                      className="btn btn-primary me-3"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#show-course-list"
                      aria-expanded="false"
                      aria-controls="show-course-list"
                    >
                      Add Course
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#show-user-list"
                      aria-expanded="false"
                      aria-controls="show-user-list"
                    >
                      Add User
                    </button>
                  </div>

                  <div className="category-save-btn"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styles.teamCourseSection} offcanvas offcanvas-bottom`}
          id="show-course-list"
          tabindex="-1"
        >
          <h3>Team Courses</h3>
          <div className={styles.addBtnSection}>
            <input
              type="search"
              className="all-users-input"
              placeholder="Search Course.."
            />
            <button
              type="button"
              className="text-bg-primary add-new-user"
              onClick={handleAddCourse}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasCourse"
            >
              Add
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    setCheckAll((pre) => !pre);
                    handlAllSelect();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Select All
                </th>
                <th scope="col">Course Title</th>
                <th scope="col">Author</th>
                <th scope="col">Duration</th>
                <th scope="col">Users Enrolled</th>
                <th scope="col">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {coursesData &&
                coursesData.map((course) => {
                  return (
                    <tr
                      key={course.id}
                      // role="button"
                      // data-bs-toggle="offcanvas"
                      // data-bs-target="#offcanvasCourse"
                      // aria-controls="offcanvasRight"
                    >
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input course-check"
                            type="checkbox"
                            ref={checkbox}
                            name="check"
                            value={course.course_title}
                            onChange={(e) => {
                              handleCheckChange(e);
                            }}
                            // checked={check}
                            id="flexCheckDefult"
                          />
                        </div>
                      </td>
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
        <div
          className={`${styles.teamUserSection} offcanvas offcanvas-bottom`}
          id="show-user-list"
          tabindex="-1"
        >
          <h3>Team Users</h3>
          <div className={styles.addBtnSection}>
            <input
              type="search"
              className="all-users-input"
              placeholder="Search User.."
            />
            <button
              type="button"
              className="text-bg-primary add-new-user"
              onClick={handleAddUser}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasCourse"
            >
              Add
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    setUserCheckAll((pre) => !pre);
                    handlUserAllSelect();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Select All
                </th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((user) => {
                  return (
                    <tr key={user.email}>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input user-check"
                            type="checkbox"
                            ref={checkbox}
                            name="check"
                            value={user.email}
                            onChange={(e) => {
                              handleUserCheckChange(e);
                            }}
                            id="flexCheckDefult"
                          />
                        </div>
                      </td>
                      <td scope="row" className="allusers-name-container">
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
                            {user.name}
                          </span>
                          <span className="designation">{user.country}</span>
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
                      // setTeamDetail([team.Users, team.Courses]);
                    }}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                  >
                    <td>{team.TeamName}</td>
                    <td>
                      {
                        team.Users && (
                          <span className={styles.text_with_background}>
                            {team.Users.length}
                          </span>
                        )
                        // team.Users.map((user) => {
                        //   return (
                        //     <span   className={styles.text_with_background}>
                        //      >{team.Users.length}
                        //     </span>
                        //   );
                        // })
                      }
                    </td>
                    <td>
                      {
                        team.Courses && (
                          <span className={styles.txt_with_background}>
                            {team.Courses.length}
                          </span>
                        )
                        // team.Courses.map((course) => {
                        //   return (
                        //     <span   className={styles.txt_with_background}>
                        //       {course.course_title}
                        //     </span>
                        //   );
                        // })
                      }
                    </td>
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

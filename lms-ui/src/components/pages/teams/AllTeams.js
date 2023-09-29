import React, { useEffect, useRef, useState } from "react";
import teamsData from "../../hooks/teamData";
import styles from "../../styles/AllTeam.module.css";
import userImg from "../../content/Images/user.png";
// import courseData from "../../hooks/courseData";

const AllTeams = ({ show }) => {
  const [showBlock, setShowBlock] = useState(false);
  const [showUserDelete, setShowUserDelete] = useState(false);
  const [showCourseDelete, setShowCourseDelete] = useState(false);
  const [checkedAllCourse, setCheckAllCourse] = useState(false);
  const [checkedAllUser, setCheckAllUser] = useState(false);

  const checkbox = useRef("");
  const [teamId, setTeamId] = useState(null)
  const [teamName, setTeamName] = useState("");
  const [teamDes, setTeamDes] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [teamUsers, setTeamUser] = useState([]);
  const [teamCourses, setTeamCourses] = useState([]);
  const [teamDetail, setTeamDetail] = useState([]);
  const [addTeamUsersId, setAddTeamUsersId] = useState([]);
  const [addTeamCoursesId, setAddTeamCoursesId] = useState([]);
  const [userData, setUserData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    const getAllTeams = () => {
      fetch("http://127.0.0.1:8000/teams_list_data/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setTeamData(result);
        });
      });
    };

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
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setCoursesData(result);
        });
      });
      // setCoursesData(courseData);
    };

    getAllTeams();
    getUsers();
    getCourse();
  }, []);

  const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };

  const handleTeamDes = (e) => {
    setTeamDes(e.target.value);
  };
  const handleSaveTeam = (e) => {
    e.preventDefault();
    const obj = {
      name: teamName,
      description: teamDes,
      created_by: sessionStorage.getItem("user_id"),
    };

    fetch("http://127.0.0.1:8000/create_team/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      response.json().then(function (result) {
        console.log(result);
        window.location.reload();
        // setTeamData(result);
      });
    });

    // setTeamData([...teamData, { TeamName: teamName, id: 3 }]);
    setTeamName("");
    setTeamDes("");
  };

  const handleCourseCheckChange = (e) => {
    const title = e.target.value;
    console.log('user title', title);
    const newObj = coursesData.filter((course) => {
      return course.title === title;
    });

    if (e.target.checked && title !== "undefined") {
      setAddTeamCoursesId((pre) => [...pre, newObj[0].id]);
    }
    else if (!e.target.checked) {
      const coursesId = addTeamCoursesId.filter((course) => {
        return newObj[0].id !== course
      })
      setAddTeamCoursesId(coursesId)
    }
  };

  console.log('team courses Id' , addTeamUsersId);

  const handleUserCheckChange = (e) => {
    const email = e.target.value;
    console.log('user title', email);
    const newObj = userData.filter((user) => {
      return user.email === email;
    });

    if (e.target.checked && email !== "undefined") {
      setAddTeamUsersId((pre) => [...pre, newObj[0].id]);
    }
    else if (!e.target.checked) {
      const usersId = addTeamUsersId.filter((user) => {
        console.log(user);
        return newObj[0].id !== user
      })
      console.log('This is user id after filter ', usersId);
      setAddTeamUsersId(usersId)
    }
    
  };


  const handlCourseAllSelect = () => {
    const selectItems = document.getElementsByClassName("course-check");
    if (checkedAllCourse) {
      setAddTeamCoursesId([])
      for (let item of selectItems) {
        item.checked = false;
      }
    } else {
       coursesData.forEach(course =>{
          setAddTeamCoursesId((pre) => [...pre, course.id])
        })
      for (let item of selectItems) {
        item.checked = true;
       
      }
    }
  };
  const handlUserAllSelect = () => {
    const selectItems = document.getElementsByClassName("user-check");
    if (checkedAllUser) {
      setAddTeamUsersId([])
      for (let item of selectItems) {
        item.checked = false;
      }
    } else {
      userData.forEach(user =>{
        setAddTeamUsersId((pre) => [...pre, user.id])
      })
      for (let item of selectItems) {
        item.checked = true;

      }
    }
  };

  const handleDeleteCourse = (id) => {
    const obj = teamCourses.filter((course) => {
      return course.id !== id;
    });
    setTeamCourses(obj);
  };

  const handleDeleteUser = (id) => {
    const obj = teamUsers.filter((user) => {
      return user.id !== id;
    });
    setTeamUser(obj);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const selectItems = document.getElementsByClassName("course-check");
    for (let item of selectItems) {
      if (item.checked) {
        const newObj = coursesData.filter((course) => {
          return course.title === item.value;
        });
        console.log(" obj  =", newObj);

        if (typeof teamCourses !== "undefined") {

          const obj = {
            team_id: teamId,
            course_ids: addTeamCoursesId,
          };

          fetch("http://127.0.0.1:8000/add_courses_to_team/", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              Authorization: `Token ${sessionStorage.getItem("user_token")}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then((response) => {
            response.json().then(function (result) {
              console.log(result);

              // window.location.reload();
              // setTeamData(result);
            });
          });

          // setTeamCourses(() => [...teamCourses, newObj[0]]);
        } else {
          // setTeamCourses([newObj[0]]);
        }
      }

      item.checked = false;
    }

    console.log(teamCourses);
  };

  const getUSerFullName = (user) => {
    const name = userData.filter((users) => users.id === user)
    return `${name[0].first_name} ${name[0].last_name}`
  } 

  const getTeamCourseName = (course) => {
    const title = coursesData.filter((courses) => courses.id === course)
    return `${title[0].title}`
  }

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

          const obj = {
            team_name: teamName,
            // user_emails: ["hammad@example.com"],
            user_ids: addTeamUsersId
          };

          fetch("http://127.0.0.1:8000/add_users_to_team/", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
              Authorization: `Token ${sessionStorage.getItem("user_token")}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then((response) => {
            response.json().then(function (result) {
              console.log(result);

              // window.location.reload();
              // setTeamData(result);
            });
          });


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
                    onChange={(e) => handleTeamName(e)}
                    required
                    placeholder="Team Name"
                    className="team-name"
                  />
                  <label className="mb-0">
                    Team Description<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={teamDes}
                    onChange={(e) => handleTeamDes(e)}
                    required
                    placeholder="Team Description"
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
                <ul style={{ paddingLeft: "10px" }}>
                  {teamData &&
                    teamData.map((team) => {
                      return (
                        <div key={team.id}>
                          <li>
                            <a
                              role="button"
                              onClick={() => {
                                setTeamName(team.name);
                                setTeamUser(team.users);
                                setTeamCourses(team.courses);
                              }}
                            >
                              {team.name}
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
                                    { getUSerFullName(user) }
                                  {/* { userData.filter((users) => {
                                    if( users.id === user){
                                      return users.first_name
                                    }
                                  } )} */}
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
                                  { getTeamCourseName(course)}
                                  {course.title}
                                </td>
                                <td className={styles.borderLess}>
                                  {showCourseDelete ? (
                                    <button
                                      type="button"
                                      className={styles.deleteBtn}
                                      onClick={() =>
                                        handleDeleteCourse(course.id)
                                      }
                                    ></button>
                                  ) : (
                                    <button
                                      type="button"
                                      style={{ color: "white" }}
                                      onClick={() =>
                                        handleDeleteCourse(course.id)
                                      }
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
                    setCheckAllCourse((pre) => !pre);
                    handlCourseAllSelect();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Select All
                </th>
                <th scope="col">Course Title</th>
                <th scope="col">Author</th>
                <th scope="col">Description</th>
                <th scope="col">Users Enrolled</th>
                <th scope="col">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {coursesData.length === 0 ||
              coursesData.detail == "No objects found"
                ? coursesData.detail
                : coursesData &&
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
                              value={course.title}
                              onChange={(e) => {
                                handleCourseCheckChange(e);
                              }}
                              // checked={check}
                              id="flexCheckDefult"
                            />
                          </div>
                        </td>
                        <td>{course.title}</td>
                        <td>{course.author}</td>
                        <td>{course.description}</td>
                        <td>{course.users_enrolled}</td>
                        <td>{course.created_at}</td>
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
                    setCheckAllUser((pre) => !pre);
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
                      setTeamName(team.name);
                      setTeamUser(team.users);
                      setTeamId(team.id)
                      setTeamCourses(team.courses);
                      // setTeamDetail([team.Users, team.Courses]);
                    }}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                  >
                    <td>{team.name}</td>
                    {console.log("This is Team courses ", team.courses)}
                    <td>
                      {
                        team.users && team.users.length !== 0 ? (
                          <span className={styles.text_with_background}>
                            {team.users.length}
                          </span>
                        ) : (
                          "0"
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
                        team.courses && team.courses.length !== 0 ? (
                          <span className={styles.txt_with_background}>
                            {team.courses.length}
                          </span>
                        ) : (
                          "0"
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

import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/AllTeam.module.css";
import userImg from "../../content/Images/user.png";
import Swal from "sweetalert2";
// import Avatar from "react-avatar";

const AllTeams = ({ show }) => {
  const [showBlock, setShowBlock] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);

  const [showUserDelete, setShowUserDelete] = useState(false);
  const [showCourseDelete, setShowCourseDelete] = useState(false);
  const [checkedAllCourse, setCheckAllCourse] = useState(false);
  const [checkedAllUser, setCheckAllUser] = useState(false);

  const checkbox = useRef("");
  const [teamId, setTeamId] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [teamDes, setTeamDes] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [teamUsers, setTeamUser] = useState([]);
  const [teamCourses, setTeamCourses] = useState([]);
  const [addTeamUsersId, setAddTeamUsersId] = useState([]);
  const [addTeamCoursesId, setAddTeamCoursesId] = useState([]);
  const [learnerUserData, setLearnerUserData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [visibility, setVisibility] = useState();
  const [editTeam, setEditTeam] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const [coursesData, setCoursesData] = useState([]);
  const [authorData, setAuthorData] = useState([]);

  useEffect(() => {
    const getAllTeams = () => {
      fetch("http://127.0.0.1:8000/teams_list_data/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setTeamData(result);
          });
        } else {
          console.log(response);
        }
      });
    };

    const getUsers = () => {
      fetch("http://127.0.0.1:8000/list_all_users/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setUserData(result);
            const obj = result.filter((user) => {
              return user.role === "learner";
            });
            setLearnerUserData(obj);
            // setLearnerUserData(result);

            // ************   List only Learner Users *********************
            //
            //   const users = result.filter(user => {
            //     return user.role === 'learner'
            // })
            // setLearnerUserData(users);
          });
        } else {
          console.log(response);
        }
      });
    };
    const getCourse = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("API result Courses:", result);
            const activeCourses = result.filter((course) => {
              return course.is_delete === false;
            });
            setCoursesData(activeCourses);
            // setCoursesData(result);
            // ****************** List only Acive Courses *********************
            //
            // const activeCourses = result.filter(course => {
            //   return course.is_active === true
            // });
            // setCoursesData(activeCourses)
          });
        } else {
          console.log(response);
        }
      });
      // setCoursesData(courseData);
    };

    const getAuthorsData = () => {
      fetch(`http://localhost:8000/api/authors/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Api result Author Data", result);
            setAuthorData(result);
          });
        } else {
          console.log(response);
        }
      });
    };

    getAllTeams();
    getUsers();
    getCourse();
    getAuthorsData();
  }, [0, visibility]);

  const handleTeamName = (e) => {
    setTeamName(e.target.value);
  };
  const handleTeamTitle = (e) => {
    setTeamTitle(e.target.value);
  };

  const handleTeamDes = (e) => {
    setTeamDes(e.target.value);
  };

  const handleUpdateTitle = (e) => {
    if (e.key === "Enter" || e.type === "contextmenu") {
      e.preventDefault();

      const obj = {
        name: teamTitle,
        is_updated: true,
        updated_by: 2,
      };

      fetch(`http://127.0.0.1:8000/teams/${teamId}/update/`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setTeamName(result.name);
            setTeamTitle("");
            setEditTeam(false);
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
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
        // window.location.reload();
        setTeamData((pre) => [...pre, result]);
      });
    });

    // setTeamData([...teamData, { TeamName: teamName, id: 3 }]);
    setTeamName("");
    setTeamDes("");
  };

  const handleCourseCheckChange = (e) => {
    const title = e.target.value;
    const newObj = coursesData.filter((course) => {
      return course.title === title;
    });

    if (e.target.checked && title !== "undefined") {
      setAddTeamCoursesId((pre) => [...pre, newObj[0].id]);
    } else if (!e.target.checked) {
      const coursesId = addTeamCoursesId.filter((course) => {
        return newObj[0].id !== course;
      });
      setAddTeamCoursesId(coursesId);
    }
  };

  const handleUserCheckChange = (e) => {
    const email = e.target.value;
    const newObj = learnerUserData.filter((user) => {
      return user.email === email;
    });

    if (e.target.checked && email !== "undefined") {
      setAddTeamUsersId((pre) => [...pre, newObj[0].id]);
    } else if (!e.target.checked) {
      const usersId = addTeamUsersId.filter((user) => {
        return newObj[0].id !== user;
      });
      setAddTeamUsersId(usersId);
    }
  };

  const handlCourseAllSelect = () => {
    const selectItems = document.getElementsByClassName("course-check");
    if (checkedAllCourse) {
      setAddTeamCoursesId([]);
      for (let item of selectItems) {
        item.checked = false;
      }
    } else {
      coursesData.forEach((course) => {
        setAddTeamCoursesId((pre) => [...pre, course.id]);
      });
      for (let item of selectItems) {
        item.checked = true;
      }
    }
  };
  const handlUserAllSelect = () => {
    const selectItems = document.getElementsByClassName("user-check");
    if (checkedAllUser) {
      setAddTeamUsersId([]);
      for (let item of selectItems) {
        item.checked = false;
      }
    } else {
      learnerUserData.forEach((user) => {
        setAddTeamUsersId((pre) => [...pre, user.id]);
      });
      for (let item of selectItems) {
        item.checked = true;
      }
    }
  };

  const handleDeleteCourse = (id) => {
    const obj = {
      team_id: teamId,
      course_ids: [id],
    };

    fetch("http://127.0.0.1:8000/remove_courses_from_team/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log(result);
          const updatedList = teamCourses.filter(
            (course) => course !== result.removed_courses[0]
          );
          setTeamCourses(updatedList);
        });
      }
    });

    // const obj = teamCourses.filter((course) => {
    //   return course.id !== id;
    // });
    // setTeamCourses(obj);
  };

  const handleDeleteUser = (user) => {
    const user_id = learnerUserData.filter((users) => {
      return users.id === user;
    });
    const obj = {
      team_name: teamName,
      user_ids: [user_id[0].id],
    };

    fetch("http://127.0.0.1:8000/remove_users_from_team/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log(result);
          const updatedList = teamUsers.filter(
            (user) => user !== result.removed_users[0]
          );
          setTeamUser(updatedList);
          // window.location.reload();
          // setTeamData(result);
        });
      }
    });

    // const obj = teamUsers.filter((users) => {
    //   return users.id !== user;
    // });
    // setTeamUser(obj);
  };

  const handleCourseVisibility = (course) => {
    const active = course.is_active;
    const obj = {
      title: course.title,
      instructor: course.instructor,
      updated_by: sessionStorage.getItem("user_id"),
      category: course.category,
      is_active: !active,
    };
    fetch(`http://127.0.0.1:8000/api/courses/${course.id}/`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log(result);
          Swal.fire({
            title: `${result.title} has been ${
              result.is_active ? "activated" : "deactivated"
            }`,
            icon: "success",
          }).then((res) => {
            setVisibility(!visibility);
          });

          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleUserVisibility = (email, active) => {
    let action = "";
    if (active === true) {
      action = "Deactivate";
    } else {
      action = "Activate";
    }
    Swal.fire({
      title: "Attention!",
      text: `Do you want to ${action} this User?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          email: email,
          is_active: !active,
        };
        fetch("http://127.0.0.1:8000/update_user/", {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 200) {
            response.json().then(function (result) {
              Swal.fire(
                result.is_active
                  ? "User Activation Successful!"
                  : `User Deactivation Successful!`,
                `${result.first_name} has been ${action}d`,
                "success"
              ).then((res) => {
                setVisibility(!visibility);
                // window.location.reload();
              });
              console.log(result);
              // window.location.reload();
            });
          } else {
            console.log(response);
          }
        });
      }
    });
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const selectItems = document.getElementsByClassName("course-check");
    for (let item of selectItems) {
      if (item.checked) {
        if (typeof teamCourses !== "undefined") {
          for (let i = 0; i < addTeamCoursesId.length; i++) {
            const element = addTeamCoursesId[i];
            if (teamCourses.includes(element)) {
              addTeamCoursesId.splice(i, 1);
              i--;
            }
          }
        } else {
        }
      }

      item.checked = false;
    }
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
      if (response.status === 200) {
        response.json().then(function (result) {
          setShowAddCourse(false);
          console.log(result);
          addTeamCoursesId.forEach((course) => {
            if (!teamCourses.includes(course)) {
              console.log("inside include condition");
              setTeamCourses((pre) => [...pre, course]);
            }
          });
          setAddTeamCoursesId([]);
        });
      }
    });
  };

  const getUSerFullName = (user) => {
    if (user) {
      const name = learnerUserData.filter((users) => users.id === user);
      console.log("This is name", user);
      if (name.length !== 0) {
        return `${name[0].first_name} ${name[0].last_name}`;
      }
    }
  };

  const getUSerAcivationStatus = (user) => {
    if (user) {
      const name = learnerUserData.filter((users) => users.id === user);

      if (name.length !== 0) {
        return name;
      }
    }
  };

  const getCourseActivationStatus = (courseId) => {
    if (courseId) {
      const course = coursesData.filter((course) => course.id === courseId);

      if (course.length !== 0) {
        return course[0];
      }
    }
  };
  const getAuthorFullName = (id) => {
    if (authorData.length !== 0) {
      const author = authorData.filter((author) => {
        return author.id === id;
      });
      if (author.length !== 0 && learnerUserData.length !== 0) {
        const user = userData.filter(
          (users) => users.id === author[0].created_by
        );

        if (user.length !== 0) {
          return `${user[0].first_name} ${user[0].last_name}`;
        } else {
          return "N/A";
        }
      } else {
        return "N/A";
      }
    }
  };

  const getTeamCourseName = (course) => {
    const title = coursesData.filter((courses) => courses.id === course);
    if (title.length !== 0) {
      return `${title[0].title}`;
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const selectItems = document.getElementsByClassName("user-check");
    for (let item of selectItems) {
      if (item.checked) {
        if (typeof teamUsers !== "undefined") {
          for (let i = 0; i < addTeamUsersId.length; i++) {
            const element = addTeamUsersId[i];
            if (teamUsers.includes(element)) {
              addTeamUsersId.splice(i, 1);
              i--;
            }
          }

          // setTeamUser(() => [...teamUsers, newObj[0]]);
        } else {
          // setTeamUser([newObj[0]]);
        }
      }

      item.checked = false;
    }
    const obj = {
      team_name: teamName,
      user_ids: addTeamUsersId,
    };

    fetch("http://127.0.0.1:8000/add_users_to_team/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          setShowAddUser(false);
          console.log("API result ", result);
          addTeamUsersId.forEach((user) => {
            setTeamUser((pre) => [...pre, user]);
          });
          setAddTeamUsersId([]);
        });
      }
    });
  };

  const handleDeleteTeam = (id) => {
    Swal.fire({
      title: "Attention!",
      text: `Do you want to Delete this Team?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          team_id: id,
        };
        fetch("http://127.0.0.1:8000/delete_team/", {
          method: "DELETE",
          body: JSON.stringify(obj),
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 204) {
            Swal.fire(
              `Team Deletion Successful!`,
              `This Team has been deleted`,
              "success"
            ).then((res) => {
              window.location.reload();
            });
          } else {
            response.json().then(function (result) {
              console.log(result);
              Swal.fire(
                `Team Deleted Successful!`,
                `${result.message}`,
                "success"
              ).then((res) => {
                window.location.reload();
              });
            });
          }
        });
      }
    });
  };

  const handleTeamUpdate = () => {};

  return (
    <div className="pt-2" style={{ boxShadow: "4px 5px 15px -3px gray" }}>
      <form className="add-teamform">
        <div className="creat-team-btn">
          <button
            type="button"
            className="btn btn-primary ms-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTeam"
            aria-controls="offcanvasRight"
          >
            <i className="fas fa-solid fa-plus"></i> Add Team
          </button>
          {/* This is for Team Add panel */}
        </div>
      </form>
      <div className="all-team-content">
        <div
          className={`offcanvas offcanvas-end ${show} `}
          tabIndex="-1"
          style={{ width: "30%" }}
          id="offcanvasTeam"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-body">
            <div className="add-new-team-outer-container">
              <div className="add-new-team-inner-container">
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
                <form className="add-new-team-form">
                  <div className="add-new-team-form-content">
                    <label className="mb-0 w-100">
                      Team Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => handleTeamName(e)}
                      required
                      placeholder="Team Name"
                      className="team-name w-100"
                    />
                    <label className="mb-0 w-100">Team Description</label>
                    <input
                      type="text"
                      value={teamDes}
                      onChange={(e) => handleTeamDes(e)}
                      required
                      placeholder="Team Description"
                      className="team-name w-100"
                    />
                  </div>
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
          data-bs-backdrop="static"
          tabIndex="-1"
          style={{ width: "87%" }}
          id="offcanvasCourse"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-body team-content-outer-div">
            <div className="add-team-content">
              <div className="course-name-section">
                <ul style={{ paddingLeft: "10px" }}>
                  {teamData &&
                    teamData.map((team) => {
                      return (
                        <div key={team.id}>
                          {/* <li
                              role="button"
                              onClick={() => {
                                setTeamName(team.name);
                                setTeamTitle(team.name);
                                setTeamUser(team.users);
                                setTeamId(team.id);
                                setTeamCourses(team.courses);
                              }}
                            >
                              {team.name}
                          
                          </li> */}
                          <li
                            className={`course-content-sub-menue-li ${
                              teamName === team.name && "active-course"
                            }`}
                            role="button"
                            onClick={() => {
                              setTeamName(team.name);
                              setTeamTitle(team.name);
                              setTeamUser(team.users);
                              setTeamId(team.id);
                              setTeamCourses(team.courses);
                            }}
                          >
                            {team.name}
                            {teamName === team.name && (
                              <span>
                                {" "}
                                <i class="fa fa-chevron-circle-right"></i>
                              </span>
                            )}
                          </li>
                        </div>
                      );
                    })}
                </ul>
              </div>
              <div className="team-form-section">
                <div className="offcanvas-head team-content-heading">
                  <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    Add Team Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => window.location.reload()}
                  ></button>
                </div>
                <form>
                  <div
                    className=""
                    style={{ display: "flex", flexDirection: "column" }}
                    onMouseEnter={() => setShowEditBtn(true)}
                    onMouseLeave={() => setShowEditBtn(false)}
                  >
                    {/* <label className="mb-0 team-title-label">Team Name:</label> */}
                    {/* <span>{teamName}</span> */}

                    {editTeam ? (
                      <input
                        type="text"
                        placeholder="Team Title"
                        value={teamTitle}
                        style={{ width: "99%" }}
                        className="team-title mb-2"
                        onChange={(e) => {
                          handleTeamTitle(e);
                        }}
                        required
                        onKeyDown={(e) => handleUpdateTitle(e)}
                        onContextMenu={(e) => handleUpdateTitle(e)}
                      />
                    ) : (
                      <span style={{ width: "" }} className="team-title  mb-2">
                        {teamName}
                        {showEditBtn && (
                          <i
                            className="bi bi-pencil ms-2 module-edit-btn"
                            onClick={() => setEditTeam(true)}
                          ></i>
                        )}
                      </span>
                    )}
                  </div>
                  {/* <input
                    type="text"
                    value={teamName}
                    onChange={(e) => handleTeamName(e)}
                    required
                    className="course-title"
                  /> */}

                  <div className={styles.teamListSection}>
                    <div className="team-content-user-table-container">
                      <table className="table team-content-user-table">
                        <thead>
                          <tr>
                            <th
                              style={{ borderTop: "none" }}
                              className="team-table-heading"
                            >
                              #
                            </th>
                            <th
                              style={{ borderTop: "none" }}
                              className="team-table-heading"
                            >
                              Users
                            </th>
                            <th
                              colSpan="2"
                              style={{ borderTop: "none" }}
                              className="team-table-heading"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamUsers &&
                            teamUsers.map((user, index) => {
                              return (
                                <tr key={user}>
                                  <td className={styles.borderLess}>
                                    {index + 1}
                                  </td>
                                  <td
                                    className={styles.borderLess}
                                    //   className="allusers-name-container"
                                  >
                                    <span>{getUSerFullName(user)}</span>
                                  </td>
                                  <td
                                    className={`${styles.borderLess} ps-0`}
                                    style={{ width: "3%" }}
                                  >
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input "
                                        type="checkbox"
                                        role="switch"
                                        checked={
                                          getUSerAcivationStatus(user)[0]
                                            .is_active
                                        }
                                        value={
                                          getUSerAcivationStatus(user)[0]
                                            .is_active
                                        }
                                        onChange={() => {
                                          handleUserVisibility(
                                            getUSerAcivationStatus(user)[0]
                                              .email,
                                            getUSerAcivationStatus(user)[0]
                                              .is_active
                                          );
                                        }}
                                        id="flexSwitchCheckDefault"
                                      />
                                    </div>
                                  </td>
                                  <td className={`${styles.borderLess} ps-0`}>
                                    <button
                                      type="button"
                                      className={`${styles.deleteBtn} p-0`}
                                      onClick={() => handleDeleteUser(user)}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>

                    <div className="team-content-course-table-container">
                      <table className="table team-content-course-table">
                        <thead>
                          <tr>
                            <th
                              style={{ borderTop: "none" }}
                              className="team-table-heading"
                            >
                              Courses
                            </th>
                            <th
                              colSpan="2"
                              style={{ borderTop: "none" }}
                              className="team-table-heading"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamCourses.length !== 0 &&
                            teamCourses.map((course) => {
                              return (
                                <tr key={course}>
                                  <td className={styles.borderLess}>
                                    {getTeamCourseName(course)}
                                  </td>
                                  <td
                                    className={`${styles.borderLess} ps-0`}
                                    style={{ width: "3%" }}
                                  >
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input "
                                        type="checkbox"
                                        role="switch"
                                        checked={
                                          getCourseActivationStatus(course)
                                            .is_active
                                        }
                                        value={
                                          getCourseActivationStatus(course)
                                            .is_active
                                        }
                                        onChange={() => {
                                          handleCourseVisibility(
                                            getCourseActivationStatus(course)
                                          );
                                        }}
                                        id="flexSwitchCheckDefault"
                                      />
                                    </div>
                                  </td>
                                  <td className={styles.borderLess}>
                                    <button
                                      type="button"
                                      className={`${styles.deleteBtn} p-0`}
                                      onClick={() => handleDeleteCourse(course)}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="teamAddBtn">
                    <button
                      className="btn btn-primary me-3"
                      type="button"
                      onClick={() => {
                        setShowAddCourse(!showAddCourse);
                        setShowAddUser(false);
                      }}
                    >
                      Add Course
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => {
                        setShowAddUser(!showAddUser);
                        setShowAddCourse(false);
                      }}
                    >
                      Add User
                    </button>
                  </div>
                  {showAddCourse && (
                    <div className="team-add-course-section mt-3 mb-3">
                      <div
                        className=""
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h3>Courses List</h3>
                        <button
                          type="button"
                          className="add-to-team-done-btn"
                          onClick={(e) => handleAddCourse(e)}
                        >
                          Done
                        </button>
                      </div>

                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th
                              onClick={() => {
                                setCheckAllCourse((pre) => !pre);
                                handlCourseAllSelect();
                              }}
                              style={{ cursor: "pointer" }}
                              className="team-table-heading"
                            >
                              Select All
                            </th>
                            <th scope="col" className="team-table-heading">
                              Course Title
                            </th>
                            <th scope="col" className="team-table-heading">
                              Author
                            </th>
                            <th scope="col" className="team-table-heading">
                              Description
                            </th>
                            <th scope="col" className="team-table-heading">
                              Last Update
                            </th>
                            <th scope="col" className="team-table-heading">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {coursesData.length === 0 ||
                          coursesData.detail == "No objects found"
                            ? coursesData.detail
                            : coursesData &&
                              coursesData.map((course, index) => {
                                if (!teamCourses.includes(course.id)) {
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
                                      <td>
                                        {getAuthorFullName(course.instructor)}
                                      </td>
                                      <td>{course.description}</td>
                                      {/* <td>{course.users_enrolled}</td> */}
                                      <td>{course.created_at}</td>
                                      <td>
                                        <div className="form-check form-switch">
                                          <input
                                            className="form-check-input "
                                            type="checkbox"
                                            role="switch"
                                            checked={course.is_active}
                                            value={course.is_active}
                                            onChange={() => {
                                              handleCourseVisibility(course);
                                            }}
                                            id="flexSwitchCheckDefault"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              })}
                        </tbody>
                      </table>
                      <div className={styles.addBtnSection}>
                        {/* <button
                          type="button"
                          className="text-bg-primary add-new-user"
                          onClick={(e) => handleAddCourse(e)}
                        >
                          Done
                        </button> */}
                      </div>
                    </div>
                  )}

                  {showAddUser && (
                    <div className="team-add-users-section mt-3">
                      <div>
                        <div
                          className=""
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h3>Users List</h3>
                          <button
                            type="button"
                            className="add-to-team-done-btn"
                            onClick={handleAddUser}
                          >
                            Done
                          </button>
                        </div>

                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th
                                onClick={() => {
                                  setCheckAllUser((pre) => !pre);
                                  handlUserAllSelect();
                                }}
                                style={{ cursor: "pointer" }}
                                className="team-table-heading"
                              >
                                Select All
                              </th>
                              <th scope="col" className="team-table-heading">
                                Name
                              </th>
                              <th scope="col" className="team-table-heading">
                                Gender
                              </th>
                              <th scope="col" className="team-table-heading">
                                Role
                              </th>
                              <th scope="col" className="team-table-heading">
                                Email
                              </th>
                              <th scope="col" className="team-table-heading">
                                Phone Number
                              </th>
                              <th scope="col" className="team-table-heading">
                                Active
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {learnerUserData &&
                              learnerUserData.map((user) => {
                                if (!teamUsers.includes(user.id)) {
                                  return (
                                    <tr key={user.id}>
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
                                      <td
                                        scope="row"
                                        className="team-allusers-name-container"
                                      >
                                        <div></div>
                                        <div className="allusers-name-section">
                                          <span>
                                            {user.first_name} {user.last_name}
                                            {/* {user.name} */}
                                          </span>
                                          <span className="designation">
                                            {user.country}
                                          </span>
                                        </div>
                                      </td>
                                      <td>{user.gender}</td>
                                      <td>{user.role}</td>
                                      <td>{user.email}</td>
                                      <td>{user.phone_number}</td>
                                      <td>
                                        <div className="form-check form-switch">
                                          <input
                                            className="form-check-input "
                                            type="checkbox"
                                            role="switch"
                                            checked={user.is_active}
                                            value={user.is_active}
                                            onChange={() => {
                                              handleUserVisibility(
                                                user.email,
                                                user.is_active
                                              );
                                            }}
                                            id="flexSwitchCheckDefault"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                }
                              })}
                          </tbody>
                        </table>
                        <div className={styles.addBtnSection}>
                          {/* <button
                            type="button"
                            className="text-bg-primary add-new-user"
                            onClick={handleAddUser}
                          >
                            Done
                          </button> */}
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="team-table-main-container">
          {!showBlock ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="team-table-heading" style={{ width: "3%" }}>
                    #
                  </th>
                  <th className="team-table-heading ">Team</th>
                  <th className="team-table-heading">Users</th>
                  <th className="team-table-heading">Courses</th>
                  <th className="team-table-heading">Action</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((team, index) => {
                  return (
                    <tr
                      key={team.id}
                      role="button"
                      onClick={() => {
                        setTeamName(team.name);
                        setTeamTitle(team.name);
                        setTeamUser(team.users);
                        setTeamId(team.id);
                        setTeamCourses(team.courses);
                        var myOffcanvas =
                          document.getElementById("offcanvasCourse");
                        if (myOffcanvas) {
                          myOffcanvas.classList.add("show");
                        }
                        // setTeamDetail([team.Users, team.Courses]);
                      }}
                    >
                      <td style={{ width: "3%", fontWeight: "bold" }}>
                        {index + 1}
                      </td>
                      <td className="all-team-table-team-title">{team.name}</td>
                      <td>
                        {team.users && team.users.length !== 0 ? (
                          <span className={styles.text_with_background}>
                            {team.users.length}
                          </span>
                        ) : (
                          <span className={styles.text_with_background}>
                            {"0"}
                          </span>
                        )}
                      </td>
                      <td>
                        {team.courses && team.courses.length !== 0 ? (
                          <span className={styles.txt_with_background}>
                            {team.courses.length}
                          </span>
                        ) : (
                          <span className={styles.text_with_background}>
                            {"0"}
                          </span>
                        )}
                      </td>
                      <td
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTeam(team.id);
                        }}
                      >
                        <i className="bi bi-trash text-danger"></i>
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
    </div>
  );
};

export default AllTeams;

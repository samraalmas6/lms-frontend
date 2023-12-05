import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [noCourses, setNoCourses] = useState(0);
  const [noUsers, setNoUsers] = useState(0);
  const [noTeams, setNoTeams] = useState(0);
  const [noInstructor, setNoInstructor] = useState(0);
  const [nonLearners, setNoLearners] = useState(0);
  const [newUserData, setNewUserData] = useState([]);
  const [allUser, setAllUser] = useState([])
  const [filterUSer, setFilterUser] = useState([])
  const [showUser, setShowUSer] = useState("more")
  const [visibility, setVisibility] = useState(false)

  useEffect(() => {
    const getCourseData = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            setNoCourses(result.length);
          });
        } else {
          console.log(response);
          setNoCourses(0);
        }
      });
    };

    const getTeamData = () => {
      fetch("http://127.0.0.1:8000/teams_list_data/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("team data", result);
            setNoTeams(result.length);
          });
        } else {
          console.log(response);
          setNoCourses(0);
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
            result.sort((a, b) => a - b);
            result.reverse();
            setAllUser(result.filter((user, index) => {
              if (index < 13) {
                return user;
              } else {
                return null;
              }
            }));
            setNewUserData(
              result.filter((user, index) => {
                if (index < 6) {
                  return user;
                } else {
                  return null;
                }
              })
            );
            setFilterUser(result.filter((user, index) => {
              if (index < 6) {
                return user;
              } else {
                return null;
              }
            }))
            setNoUsers(result.length);

            setNoInstructor(
              result.filter((user) => {
                return user.role === "instructor";
              }).length
            );
            setNoLearners(
              result.filter((user) => {
                return user.role === "learner";
              }).length
            );
            //
            // setNewUserData( result.filter((user) => {
            //   return user.is_created == "2023-10-05T06:15:24.064970Z";
            // }))
          });
        } else {
          console.log(response);
          setNoUsers(0);
        }
      });
    };
    getUsers();
    getCourseData();
    getTeamData();
  }, [0,visibility]);

  const data = [
    ["Year", "Courses", "Users", "Passed", "Not Passed"],
    ["2018", noCourses, noUsers, 8, 5],
    ["2019", noCourses, noUsers, 5, 2],
    ["2020", noCourses, noUsers, 3, 3],
    ["2021", noCourses, noUsers, 10, 5],
    ["2022", noCourses, noUsers, 9, 4],
    ["2023", noCourses, noUsers, 5, 1],
  ];

  const options = {
    chart: {
      title: "Courses Reports",
      subtitle: "Courses, Users : 2018-2023",
    },
  };

  const handleVisibility = (email, active) => {
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
                setVisibility(!visibility)
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


  const handleUserClick = (value) => {
    navigate("/user/all",{state:{filter: value}});
  };
  const handleCourseClick = () => {
    navigate("/course/all");
  };
  const handleTeamClick = () => {
    navigate("/team/all");
  };

  const handleShowMoreUser = (value) => {
    if(value === "more"){
      setNewUserData(allUser);
      setShowUSer("less")
    }
    else{
      setNewUserData(filterUSer);
      setShowUSer("more")
    }
    // navigate("/allusers");
    // setNewUserData(allUser);
  }

  return (
    <div className="dashboard-main-container">
      <div className="mb-3 dashboard-card-container">
        <div className="dashboard-card-inner-container text-center">
          <div className="card bg-success text-white dashboard-card">
            <div
              className="card-body bg-success "
              style={{ backgroundColor: "#57b960" }}
              onClick={() => handleUserClick("all")}
            >
              <div className="rotate">
                <i className="fa fa-user fa-4x"></i>
              </div>
              <h6 className="text-uppercase mt-2">Users</h6>
              <h1 className="">{noUsers}</h1>
            </div>
          </div>
        </div>
        <div className="dashboard-card-inner-container text-center">
          <div
            className="card text-white bg-warning h-100 dashboard-card"
            onClick={() => handleUserClick("instructor")}
          >
            <div className="card-body">
              <div className="rotate">
                <i className="fas fa-solid fa-users fa-4x"></i>
              </div>
              <h6 className="text-uppercase mt-1">Instructors</h6>
              <h1 className="">{noInstructor}</h1>
            </div>
          </div>
        </div>
        <div className="dashboard-card-inner-container text-center">
          <div
            className="card text-white bg-primary h-100 dashboard-card"
            onClick={() => handleUserClick("learner")}
          >
            <div className="card-body">
              <div className="rotate">
                <i className="fas fa-solid fa-users fa-4x"></i>
              </div>
              <h6 className="text-uppercase mt-1">Learners</h6>
              <h1 className="">{nonLearners}</h1>
            </div>
          </div>
        </div>
        <div className="dashboard-card-inner-container text-center">
          <div
            className="card text-white bg-danger h-100 dashboard-card"
            onClick={() => handleTeamClick()}
          >
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-list fa-4x"></i>
              </div>
              <h6 className="text-uppercase mt-1">Teams</h6>
              <h1 className="">{noTeams}</h1>
            </div>
          </div>
        </div>
        <div className="dashboard-card-inner-container text-center">
          <div
            className="card text-white bg-info h-100 dashboard-card"
            onClick={() => handleCourseClick()}
          >
            <div className="card-body bg-info">
              <div className="rotate">
                <i className="fas fa-solid fa-book fa-4x"></i>
              </div>
              <h6 className="text-uppercase mt-2">Courses</h6>
              <h1 className="">{noCourses}</h1>
            </div>
          </div>
        </div>
        {/* <div className="col-xl-2 col-sm-6 py-2  text-center">
          <div className="card text-white bg-info h-100 dashboard-card">
            <div className="card-body bg-secondary">
              <div className="rotate">
                <i className="fas fa-solid fa-book fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Groups</h6>
              <h1 className="display-4">{"0"}</h1>
            </div>
          </div>
        </div> */}
      </div>
      <div className="dashboard-chart-row">
        <div className="dashboard-chart-section">
          <Chart
            chartType="Bar"
            width="100%"
            height="350px"
            data={data}
            options={options}
          />
        </div>
        <div className="dashboard-new-registered-user-section">
          <h5 className="mt-1 mb-2">
            <strong>Recently Registered Users</strong>
            
          </h5>
          <table className="table mb-1">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Role</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {newUserData.length !== 0 &&
                newUserData.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="form-check form-switch">
                        <input
                            className="form-check-input "
                            type="checkbox"
                            role="switch"
                            checked={user.is_active}
                            value={user.is_active}
                            onChange={() => {
                              handleVisibility(user.email, user.is_active);
                            }}
                            id="flexSwitchCheckDefault"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* <div className="show-more-user-btn-section">
            <button className="show-more-btn" type="button" onClick={() => handleShowMoreUser(showUser)}>
              {showUser}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

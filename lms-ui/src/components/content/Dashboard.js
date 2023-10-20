import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const [noCourses, setNoCourses] = useState(0);
  const [noUsers, setNoUsers] = useState(0);
  const [noTeams, setNoTeams] = useState(0);
  const [noInstructor, setNoInstructor] = useState(0);
  const [nonLearners, setNoLearners] = useState(0);
  const [newUserData, setNewUserData] = useState(null);

  console.log("new user", newUserData);
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
            setNewUserData(
              result.filter((user, index) => {
                if (index < 8) {
                  return user;
                } else {
                  return null;
                }
              })
            );
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
  }, [0]);

  const data = [
    ["Year", "Courses", "Users", "Modules", "Units"],
    ["2018", noCourses, noUsers, 8, 10],
    ["2019", noCourses, noUsers, 5, 2],
    ["2020", noCourses, noUsers, 3, 9],
    ["2021", noCourses, noUsers, 4, 7],
    ["2022", noCourses, noUsers, 1, 4],
    ["2023", noCourses, noUsers, 5, 0],
  ];

  const options = {
    chart: {
      title: "Courses Reports",
      subtitle: "Courses, Users, Modules, and Units : 2018-2023",
    },
  };

  const handleUserClick = () => {
    navigate("/allusers");
  };
  const handleCourseClick = () => {
    navigate("/course/all");
  };
  const handleTeamClick = () => {
    navigate("/allteams");
  };

  return (
    <div className="main">
      <p className="lead d-none d-sm-block">Overview</p>
      <div
        className="alert alert-warning fade collapse"
        role="alert"
        id="myAlert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about LMS
      </div>
      <div className="row mb-3">
        <div className="col-xl-2 col-sm-6 py-2  text-center">
          <div className="card bg-success text-white h-100 dashboard-card">
            <div
              className="card-body bg-success "
              style={{ backgroundColor: "#57b960" }}
              onClick={() => handleUserClick()}
            >
              <div className="rotate">
                <i className="fa fa-user fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Users</h6>
              <h1 className="display-4">{noUsers}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 py-2  text-center">
          <div
            className="card text-white bg-warning h-100 dashboard-card"
            onClick={() => handleUserClick()}
          >
            <div className="card-body">
              <div className="rotate">
                <i className="fas fa-solid fa-users fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Instructors</h6>
              <h1 className="display-4">{noInstructor}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 py-2  text-center">
          <div
            className="card text-white bg-primary h-100 dashboard-card"
            onClick={() => handleUserClick()}
          >
            <div className="card-body">
              <div className="rotate">
                <i className="fas fa-solid fa-users fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Learners</h6>
              <h1 className="display-4">{nonLearners}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 py-2  text-center">
          <div
            className="card text-white bg-danger h-100 dashboard-card"
            onClick={() => handleTeamClick()}
          >
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-list fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Teams</h6>
              <h1 className="display-4">{noTeams}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-6 py-2  text-center">
          <div
            className="card text-white bg-info h-100 dashboard-card"
            onClick={() => handleCourseClick()}
          >
            <div className="card-body bg-info">
              <div className="rotate">
                <i className="fas fa-solid fa-book fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Courses</h6>
              <h1 className="display-4">{noCourses}</h1>
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
      <div className="row ">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">Courses</h5>
          <div className="">
            <Chart
              chartType="Bar"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
        </div>
        <div className="table-responsive mt-5 col-lg-5">
          <h5 className="mt-3 mb-3 text-secondary">
            Recently Registered Users
          </h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Role</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {newUserData &&
                newUserData.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.role}</td>
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
      </div>
      <hr />
    </div>
  );
};

export default Dashboard;

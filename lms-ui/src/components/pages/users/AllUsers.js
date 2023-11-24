import React, { useEffect, useState } from "react";
import userImg from "../../content/Images/user.png";
import "../../styles/Users.css";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import Swal from "sweetalert2";
// import Avatar from "react-avatar";

const AllUsers = () => {
  const [showBlock, setShowBlock] = useState(false);
  const [userData, setUserData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [singleUser, setSingleUser] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [showProfile, setShowProfile] = useState("");

  useEffect(() => {
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
            setUsersData(result);
          });
        } else {
          console.log(response);
        }
      });
    };
    getUsers();
  }, []);

  const handleViewTogle = () => {
    setShowBlock((prev) => !prev);
  };

  const handleFilterBtn = (value) => {
    if (value !== "all") {
      const filteredUserData = usersData.filter((user) => {
        return user.role === value;
      });
      console.log("filtered Data", filteredUserData, value);
      setUserData(filteredUserData);
    } else {
      setUserData(usersData);
    }
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
                window.location.reload();
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

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xffffff);

    let color = "#" + hex.toString(16);
    console.log(hex, color);
    return color;
  }

  return (
    <div className="main pt-2" style={{ boxShadow: "4px 3px 21px -10px gray" }}>
      <form className="all-usersform">
        {/* <input
          type="search"
          className="all-users-input"
          placeholder="Search user.."
        /> */}
        <div className="">
          <button
            className="btn btn-secondary me-3"
            type="button"
            style={{ width: "50px" }}
            onClick={handleViewTogle}
          >
            {showBlock ? (
              <i className="fas fa-solid fa-list"></i>
            ) : (
              <i className="fas fa-solid fa-grip-vertical"></i>
            )}
          </button>
          <Link to="/user/add" className="text-bg-primary add-new-user">
            Add User
            <i class="ms-2 bi bi-plus-circle"></i>
          </Link>
        </div>

        <div className="add-new-user-container">
          <div className="filter-container me-2">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => handleFilterBtn("all")}
            >
              All
            </button>
            {/* <button
              className="btn btn-danger"
              type="button"
              onClick={() => handleFilterBtn("admin")}
            >
              Admin
            </button> */}
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => handleFilterBtn("instructor")}
            >
              Instructor
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => handleFilterBtn("learner")}
            >
              learner
            </button>
          </div>
        </div>
      </form>
      <div className="all-users-content">
        {!showBlock ? (
          <>
          <div className="all-user-content-table">
          <table className="table">
            <thead>
              <tr>
              <th colSpan="1" className="all-user-table-heading ps-2">#</th>
                <th colSpan="2" className="all-user-table-heading ps-5">
                  Name
                </th>
                <th colSpan="1" className="all-user-table-heading">
                  Role
                </th>
                <th colSpan="1" className="all-user-table-heading">
                  Email
                </th>
                <th colSpan="1" className="all-user-table-heading">
                  Phone Number
                </th>
                <th colSpan="1" className="all-user-table-heading">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((user, index) => {
                  return (
                    <tr key={user.id}>
                       <td style={{ width: "3%", fontWeight: "bold"}} className="ps-2 pt-2">{index+1}</td>
                      <td style={{ width: "3%"}}>
                        <i
                          class={`bi bi-person-fill all-user-icon  ${
                            user.role === "admin"
                              ? "admin-role"
                              : user.role === "instructor"
                              ? "instructor-role"
                              : "learner-role"
                          }`}
                        ></i>
                      </td>
                      <td className="allusers-name-container">
                        <div className="allusers-name-section">
                          <span>
                            {user.first_name} {user.last_name}
                          </span>
                          <span className="designation">{user.country}</span>
                        </div>
                      </td>
                      <td>
                        <p className={`all-user-role-container`}>{user.role}</p>
                      </td>
                      <td><p className={`all-user-role-container`}>{user.email}</p></td>
                      <td><p className={`all-user-role-container`}>{user.phone_number}</p></td>
                      <td className="ps-2">
                        <div className="form-check form-switch ">
                          <input
                            className="form-check-input all-user-role-container"
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
           </div>
          {/*   <div className="all-user-next-container">
             <i class="bi bi-caret-left"></i>
             <i class="bi bi-caret-right"></i>
             </div> */}
             </>
        ) : (
          <>
            <div className="userCard">
              {userData.map((user) => {
                return (
                  <div
                    className="card userBlockCard mt-0"
                    key={user.id}
                    onClick={() => {
                      setShowProfile("show");
                      setSingleUser([user]);
                    }}
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasTeam"
                    aria-controls="offcanvasRight"
                  >
                    {/* <img
                    src={userImg}
                    className="card-img-top userCardImg"
                    alt="LMS User"
                  /> */}
                    {/* <Avatar
                    style={{
                      backgroundColor: randomColor(),
                    }} 
                    name={`${user.first_name} ${user.last_name}`}
                    className=""
                    round={true}
                    size="40px"
                  />*/}
                    <div className="mt-2">
                      <i
                        class={`bi bi-person-fill all-user-icon  ${
                          user.role === "admin"
                            ? "admin-role"
                            : user.role === "instructor"
                            ? "instructor-role"
                            : "learner-role"
                        }`}
                      ></i>{" "}
                    </div>

                    <div className="card-body blockCardBody">
                      <p className="card-text p-0 m-0"
                      style={{ fontWeight: "550", fontStyle: "italic", fontSize: "16px"}}>
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="card-text p-0 m-0">{user.city}</p>
                      <p className="card-text p-0 m-0">{user.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="user-profile-section">
              <div
                className={`offcanvas offcanvas-end ${showProfile} `}
                tabIndex="-1"
                style={{ width: "30%" }}
                id="offcanvasTeam"
                aria-labelledby="offcanvasRightLabel"
              >
                <div className="offcanvas-body ">
                  <div className="offcanvas-head">
                    <span
                      className="offcanvas-title single-user-heading-title"
                      id="offcanvasRightLabel"
                    >
                      User Information
                    </span>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                      onClick={() => setShowProfile("")}
                    ></button>
                  </div>
                  <div className="user-info-main-section">
                    {singleUser.length !== 0 &&
                      singleUser.map((user) => {
                        return (
                          <div className="single-user-info">
                            {/* <div className="single-user-icon-section">
                              <i
                                class={`bi bi-person-fill single-user-icon  ${
                                  user.role === "admin"
                                    ? "admin-role"
                                    : user.role === "instructor"
                                    ? "instructor-role"
                                    : "learner-role"
                                }`}
                              ></i>
                            </div> */}
                            <div className="single-user-first_name single-user-container mt-5">
                              <span className="single-user-label">
                                First Name
                              </span>
                              <span className="first-name-tag">
                                {user.first_name}
                              </span>
                            </div>
                            <div className="single-user-last_name single-user-container">
                              <span className="single-user-label">
                                Last Name
                              </span>
                              <span className="last-name-tag">
                                {user.last_name}
                              </span>
                            </div>
                            <div className="single-user-role single-user-container">
                              <span className="single-user-label">Role </span>
                              <span className="role-tag">{user.role}</span>
                            </div>
                            <div className="single-user-email single-user-container">
                              <span className="single-user-label">Email </span>
                              <span className="email-tag">{user.email}</span>
                            </div>
                            <div className="single-user-phone single-user-container">
                              <span className="single-user-label">Phone </span>
                              <span className="phone-tag">
                                {user.phone_number}
                              </span>
                            </div>
                            <div className="single-user-gender single-user-container">
                              <span className="single-user-label">Gender </span>
                              <span className="gender-tag">
                                {user.gender === "M" ? "Male" : "Female"}
                              </span>
                            </div>
                            <div className="single-user-city single-user-container">
                              <span className="single-user-label">City </span>
                              <span className="city-tag">{user.city}</span>
                            </div>
                            <div className="signle-user-country single-user-container">
                              <span className="single-user-label">Country</span>
                              <span className="country-tag">
                                {user.country}
                              </span>
                            </div>
                            <div className="signle-user-country single-user-container">
                              <span className="single-user-label">Active</span>
                              <span className="country-tag">
                                {user.is_active
                                  ? "Activated User"
                                  : "Not Activated"}
                              </span>
                            </div>
                            <div className="single-user-teams single-user-container"></div>
                            <div className="single-user-courses single-user-container"></div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllUsers;

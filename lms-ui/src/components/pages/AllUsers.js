import React, { useState } from "react";
import mockData from "../hooks/mockData";
import userImg from "../content/Images/user.png";
import "../styles/Users.css";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [showBlock, setShowBlock] = useState(false);

  const handleViewTogle = () => {
    setShowBlock((prev) => !prev);
  };

  return (
    <div className="main">
      <form className="all-usersform">
        <input
          type="search"
          className="all-users-input"
          placeholder="Search user.."
        />
        <div>
          <Link to="/adduser" className="text-bg-primary add-new-user">
            Add New User
          </Link>
          <button
            className="btn btn-secondary"
            type="button"
            style={{ width: "50px" }}
            onClick={handleViewTogle}
          >
            {showBlock ? (
              <i class="fas fa-solid fa-list"></i>
            ) : (
              <i class="fas fa-solid fa-grip-vertical"></i>
            )}
          </button>
        </div>
      </form>
      <div className="all-users-content">
        {!showBlock ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((user) => {
                return (
                  <tr key={user.id}>
                    <td scope="row" className="allusers-name-container">
                      <div>
                        <img src={userImg} alt="" className="allusers-image" />
                      </div>
                      <div className="allusers-name-section">
                        <span>{user.name}</span>
                        <span className="designation">{user.designation}</span>
                      </div>
                    </td>
                    <td>{user.Role}</td>
                    <td>{user.email}</td>
                    <td>{user.department}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          readOnly
                          checked={user.active}
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="userCard">
            {mockData.map((user) => {
              return (
                <div className="card userBlockCard" key={user.id}>
                  <img
                    src={userImg}
                    className="card-img-top userCardImg"
                    alt="LMS User"
                  />
                  <div className="card-body blockCardBody">
                    <p className="card-text p-0 m-0">{user.name}</p>
                    <p className="card-text p-0 m-0">{user.designation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;

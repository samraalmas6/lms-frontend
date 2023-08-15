import React from "react";
import mockData from "../hooks/mockData";
import userImg from "../content/Images/user.png";
import "../styles/Users.css";

const AllUsers = () => {
  return (
    <div className="main">
      <form className="all-usersform">
        <input
          type="search"
          className="all-users-input"
          placeholder="Search user.."
        />
        <button className="btn btn-primary">Add New User</button>
      </form>
      <div className="all-users-content">
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
                <>
                  <tr>
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
                      <div class="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={user.active}
                          id="flexSwitchCheckDefault"
                        />
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

import React, { useEffect, useState } from "react";
import userImg from "../../content/Images/user.png";
import "../../styles/Users.css";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [showBlock, setShowBlock] = useState(false);
  const [userData, setUserData] = useState([])
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const getUsers = () => {
      fetch('http://127.0.0.1:8000/list_all_users/',  {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem('user_token')}`,
        },
      }).then((response) => { 
        if(response.status === 200){
        response.json().then(function (result) {
          console.log(result);
          setUserData(result)
        });
      }
      else {
        console.log(response);
      }
      });
    }
    getUsers();
  }, [])

  const handleViewTogle = () => {
    setShowBlock((prev) => !prev);
  };

  const handleVisibility = (email, active) => {
 
    const obj = {
      email: email,
      is_active: !active
    }
    fetch('http://127.0.0.1:8000/update_user/',  {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      }).then((response) => { 
        if(response.status === 200){
        response.json().then(function (result) {
          console.log(result);
          window.location.reload();
        });
      }
      else {
        console.log(response);
      }
      });
  }
  return (
    <div className="main pt-2" style={{ boxShadow: "4px 3px 21px -10px gray" }}>
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
              <i className="fas fa-solid fa-list"></i>
            ) : (
              <i className="fas fa-solid fa-grip-vertical"></i>
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
                <th scope="col">Phone Number</th>
                <th scope="col">Active</th>
              </tr>
            </thead>
            <tbody>
              {userData && userData.map((user) => {
                return (
                  <tr key={user.id}>
                    <td scope="row" className="allusers-name-container">
                      
                      <div>
                        <img src={userImg} alt="" className="allusers-image" />
                      </div>
                      <div className="allusers-name-section">
                        <span>{user.first_name} {user.last_name}</span>
                        <span className="designation">{user.country}</span>
                      </div>
                    </td>
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
                          handleVisibility(user.email, user.is_active)}
                        }
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
            {userData.map((user) => {
              return (
                <div className="card userBlockCard" key={user.email}>
                  <img
                    src={userImg}
                    className="card-img-top userCardImg"
                    alt="LMS User"
                  />
                  <div className="card-body blockCardBody">
                    <p className="card-text p-0 m-0">{user.first_name} {user.last_name}</p>
                    <p className="card-text p-0 m-0">{user.role}</p>
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

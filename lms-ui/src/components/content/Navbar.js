import React from "react";
import user from "./Images/user.png";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const name = "Mohsen Ali";
  const role = "Admin";
  return (
    <nav className="navbar navbar-expand-md mb-0 nav-bar">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand" href="#">
          LMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to='/home' className="nav-link" href="#">
                Home <span className="sr-only">Home</span>
              </Link>
            </li>
          </ul>
          <div className="searchbar-container">
            <input type="search" placeholder="Search" />
          </div>
          <ul className="navbar-nav ml-auto navbar-right ">
          <li className="nav-item">
              <a
                className="nav-link notification-icon"
                href="/"
                data-target="#myModal"
                data-toggle="modal"
              >
<i class="fas fa-sharp fa-solid fa-message-sms"></i>          </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link notification-icon"
                href="/"
                data-target="#myModal"
                data-toggle="modal"
              >
                <i className="fas fa-solid fa-bell"></i>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                data-target="#myModal"
                data-toggle="modal"
              >
                <img src={user} alt="User" className="user-image" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="/"
                data-target="#myModal"
                data-toggle="modal"
              >
                <div className="user-name-container">
                  <span className="user-name">{name}</span>
                  <span className="user-role">{role}</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

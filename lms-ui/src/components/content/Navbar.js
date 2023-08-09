import React from "react";
import user from "./user.png";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const name = "Mohsen Ali";
  const role = "Admin";
  return (
    <nav class="navbar navbar-expand-md mb-1 nav-bar">
      <div class="container-fluid">
        <Link to='/' class="navbar-brand" href="#">
          LMS
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to='/home' class="nav-link" href="#">
                Home <span class="sr-only">Home</span>
              </Link>
            </li>
          </ul>
          <div className="searchbar-container">
            <input type="search" placeholder="Search" />
          </div>
          <ul class="navbar-nav ml-auto navbar-right ">
            <li class="nav-item">
              <a
                class="nav-link"
                href="/"
                className="notification-icon"
                data-target="#myModal"
                data-toggle="modal"
              >
                <i class="fas fa-solid fa-bell"></i>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                href="/"
                data-target="#myModal"
                data-toggle="modal"
              >
                <img src={user} alt="User" className="user-image" />
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
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

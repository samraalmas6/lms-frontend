import React from "react";
import "../styles/Sidebar.css";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-offcanvas pl-0 sidebar position-fixed">
      {/* <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
        aria-controls="offcanvasExample"
      >
        show
      </button> */}
      {/* <div
        // className="offcanvas offcanvas-start show"
        // style={{ width: 'inherit'}}
        // id="sidebar"
        // data-bs-scroll="true"
        // data-bs-backdrop="false"
      > */}
            {/* <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}

        <ul
          className="nav flex-column sticky-top pl-0 pt-0 p-2 mt-3 sidebar-nav"
        >
          <li className="nav-item mb-2 mt-3">
            <Link to="/dashboard" className="nav-link text-secondary" href="#">
              <h5 style={{ textAlign: "center" }}>Dashboard</h5>
            </Link>
          </li>
          <li className="nav-item mb-2 ">
            <a
              className="nav-link text-secondary"
              href="#submenu1"
              data-bs-toggle="collapse"
              data-target="#submenu1"
              aria-expanded="true"
            >
              <i className="fas fa-user font-weight-bold"></i>
              <span className="ml-2">People Management</span>
            </a>
            <ul
              className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub show"
              id="submenu1"
            >
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Overview
                </a>
              </li>
              <li className="nav-item mb-2 ">
                <Link
                  to="/adduser"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    borderBottom: "1px solid #b7b7b7",
                  }}
                  className="nav-link text-secondary navLink"
                >
                  Add User
                </Link>
              </li>
              <li className="nav-item mb-2 ">
                <Link
                  to="/allusers"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    borderBottom: "1px solid #b7b7b7",
                  }}
                  className="nav-link text-secondary navLink"
                >
                  All Users
                </Link>
              </li>
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href='/addteam'>
                  Add Team
                </a>
              </li>
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="/allteams">
                  All Teams
                </a>
              </li>
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Add Type
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item mb-2">
            <a
              className="nav-link text-secondary"
              href="#submenu2"
              data-bs-toggle="collapse"
              data-target="#submenu2"
              aria-expanded="true"
            >
              <i className="fas fa-book font-weight-bold"></i>
              <span className="ml-1">Course Management</span>
            </a>
            <ul
              className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub show"
              id="submenu2"
            >
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Overview
                </a>
              </li>
              <li className="nav-item mb-2 ">
                <Link className="nav-link text-secondary" to="/course/create">
                  Create Course
                </Link>
              </li>
              <li className="nav-item mb-2 ">
                <Link to="/course/all" className="nav-link text-secondary">
                  All Courses
                </Link>
              </li>
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href='/category/add'>
                  Add Category
                </a>

              </li>
              <li className="nav-item mb-2 ">
                <Link className="nav-link text-secondary" to='/category/all'>
                  All Category
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item mb-2 ">
            <a
              className="nav-link text-secondary"
              href="#submenu3"
              data-bs-toggle="collapse"
              data-target="#submenu3"
            >
              <i className="fas fa-solid fa-comment font-weight-bold"></i>
              <span className="ml-2">Communication</span>
            </a>
            <ul
              className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub"
              id="submenu3"
            >
              {/*  Chats and notification section will be developed in future  */}

              {/* <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
               Chats
              </a>
            </li>
            <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
                Notifications
              </a>
            </li> */}
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Announcements
                </a>
              </li>
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Create Groups
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item mb-2 ">
            <a
              className="nav-link text-secondary"
              href="#submenu4"
              data-bs-toggle="collapse"
              data-target="#submenu4"
            >
              <i className="fas fa-user font-weight-bold"></i>
              <span className="ml-2">Reports</span>
            </a>
            <ul
              className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub show"
              id="submenu4"
            >
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  My Favorites
                </a>
              </li>
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Users Insight
                </a>
              </li>
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Courses Insight
                </a>
              </li>

              {/* This feature will be added in future */}

              {/* <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
               System Insight
              </a>
            </li> */}
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  All Reports
                </a>
              </li>
            </ul>
          </li>

          <li className="nav-item mb-2 ">
            <a
              className="nav-link text-secondary"
              href="#submenu5"
              data-bs-toggle="collapse"
              data-target="#submenu5"
            >
              <i className="fas fa-solid fa-wrench font-weight-bold"></i>
              <span className="ml-2">Settings</span>
            </a>
            <ul
              className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub"
              id="submenu5"
            >
              <li className="nav-item mb-2 ">
                <a className="nav-link text-secondary" href="">
                  Accounts
                </a>
              </li>
            </ul>
          </li>
        </ul>
      {/* </div> */}
    </div>
  );
};

export default Sidebar;

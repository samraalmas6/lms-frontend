import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div
      className="sidebar-offcanvas pl-0"
      id="sidebar"
      role="navigation"
      style={{ backgroundColor: "#e9ecef" }}
    >
      <ul className="nav flex-column sticky-top pl-0 pt-0 p-2 mt-3 ">
        <li className="nav-item mb-2 mt-3">
          <a className="nav-link text-secondary" href="#">
            <h5>Dashboard</h5>
          </a>
        </li>
        <li className="nav-item mb-2 ">
          <a
            className="nav-link text-secondary"
            href="#submenu1"
            data-bs-toggle="collapse"
            data-target="#submenu1"
          >
            <i className="fas fa-user font-weight-bold"></i>
            <span className="ml-2">People Management</span>
          </a>
          <ul className="list-unstyled flex-column pl-3 collapse" id="submenu1">
            <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
              Overbiew
              </a>
            </li>
            <li className="nav-item mb-2 ">
              <Link to='/adduser' className="nav-link text-secondary" href="">
               Add User
              </Link>
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
          >
            <i className="fas fa-book font-weight-bold"></i>
            <span className="ml-1">Course Management</span>
          </a>
          <ul className="list-unstyled flex-column pl-3 collapse" id="submenu2">
            <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
                Overbiew
              </a>
            </li>
            <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
                All Courses
              </a>
            </li>
            <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
               Add Category
              </a>
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
          <ul className="list-unstyled flex-column pl-3 collapse" id="submenu3">

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
          <ul className="list-unstyled flex-column pl-3 collapse" id="submenu4">
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
          <ul className="list-unstyled flex-column pl-3 collapse" id="submenu5">
            <li className="nav-item mb-2 ">
              <a className="nav-link text-secondary" href="">
               Accounts
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

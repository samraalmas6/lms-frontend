import React, { useState } from "react";
import "../styles/Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import lmsLogo from '../content/Images/lms-logo.png'
import finalLogo from '../content/Images/xloop-logo-2.png'

const Sidebar = () => {
  const USER_Role = sessionStorage.getItem("role");
  const [activeLink, setActiveLink] = useState(null);

  const handleActiveLink = (value) => {
    setActiveLink(value)
    console.log('value', value);
  }
  return (
    <div className="sidebar-offcanvas pl-0 sidebar m-0">
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

      <ul className="nav flex-column sticky-top pl-0 pt-0 sidebar-nav ">
        <li className={`nav-item mb-2 mt-2 lms-logo-link`} >
          <Link to={USER_Role === "admin" ? "/dashboard" : "/course/my-courses"} className="nav-link text-secondary p-0 text-center " >
            <span style={{ textAlign: "center" }}>
              <img src={finalLogo} alt=" XLoop LMS" width={170}/>
             </span>
          </Link>
        </li>

        {
          // ************** Admin Section   *************************************
          USER_Role === "admin" || USER_Role === "instructor" ? (
            <>
              <li className="nav-item mb-2 w-100 " onClick={() => handleActiveLink(1)}>
                <a
                  className="nav-link text-secondary sidebar-heading"
                  href="#submenu1"
                  data-bs-toggle="collapse"
                  data-bs-target="#submenu1"
                  aria-expanded="true"
                >
                  <i className="fas fa-user font-weight-bold"></i>
                  <span className={`ml-2 ${activeLink === 1 ? "active-link" : "text-white"}`}>People Management</span>
                </a>
                <ul
                  className="list-unstyled flex-column collapse sidebar-nav-sub show"
                  id="submenu1"
                >
                  {/* <li className="nav-item mb-2 ">
                        <a className="nav-link text-secondary" href="">
                          Overview
                        </a>
                      </li> */}
                  {/* <li className="nav-item mb-2 ">
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
                  </li> */}
                  <li className="nav-item sidebar-nav-sub-nav-item">
                    <Link
                      to="/user/all"
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                      className="nav-link text-secondary navLink text-white"
                    >
                      Users
                    </Link>
                  </li>
                  {/* <li className="nav-item mb-2 ">
                    <a className="nav-link text-secondary" href="/addteam">
                      Add Team
                    </a>
                  </li> */}
                  <li className="nav-item sidebar-nav-sub-nav-item">
                    <a className="nav-link text-secondary text-white" href="/team/all">
                      Teams
                    </a>
                  </li>
                  {/* <li className="nav-item mb-2 ">
                        <a className="nav-link text-secondary" href="">
                          Add Type
                        </a>
                      </li> */}
                </ul>
              </li>

              <li className="nav-item mb-2">
                <a
                  className="nav-link text-secondary sidebar-heading"
                  href="#submenu2"
                  data-bs-toggle="collapse"
                  data-target="#submenu2"
                  aria-expanded="true"
                >
                  <i className="fas fa-book font-weight-bold"></i>
                  <span className="ml-2 text-white">Course Management</span>
                </a>
                <ul
                  className="list-unstyled flex-column collapse sidebar-nav-sub show"
                  id="submenu2"
                >
                  {/* <li className="nav-item mb-2 ">
                        <a className="nav-link text-secondary" href="">
                          Overview
                        </a>
                      </li> */}

                  {/* <li className="nav-item mb-2 ">
                    <a className="nav-link text-secondary" href="/category/add">
                      Add Category
                    </a>
                  </li> */}
                  <li className="nav-item sidebar-nav-sub-nav-item">
                    <Link
                      className="nav-link text-secondary text-white"
                      to="/category/all"
                    >
                      Categories
                    </Link>
                  </li>
                  {/*  <li className="nav-item mb-2 ">
                    <a
                      className="nav-link text-secondary"
                      href="/course/create"
                    >
                      Create Course
                    </a>
                  </li> */}
                  <li className="nav-item sidebar-nav-sub-nav-item ">
                    <Link to="/course/all" className="nav-link text-secondary text-white">
                      Courses
                    </Link>
                  </li>

                  { USER_Role === "instructor" && <li className="nav-item mb-2 ">
                    <Link
                      to="/course/assignment-hub"
                      className="nav-link text-secondary text-white"
                    >
                      Assignment Hub
                    </Link>
                  </li> }
                </ul>
              </li>
              {/*             
              <li className="nav-item mb-2 ">
                <a
                  className="nav-link text-secondary"
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  data-target="#submenu3"
                >
                  <i className="fas fa-solid fa-comment font-weight-bold"></i>
                  <span className="ml-2" >Communication</span>
                </a>
                <ul
                  className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub"
                  id="submenu3"
                >
                 

                  <li className="nav-item mb-2 ">
                      <a className="nav-link text-secondary" href="">
                       Chats
                      </a>
                    </li>
                    <li className="nav-item mb-2 ">
                      <a className="nav-link text-secondary" href="">
                        Notifications
                      </a>
                    </li> 
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

                  {/* This feature will be added in future 

                  {/* <li className="nav-item mb-2 ">
                      <a className="nav-link text-secondary" href="">
                       System Insight
                      </a>
                    </li> 
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
               */}
            </>
          ) : // ************** Learner Section   *************************************

          USER_Role === "learner" ? (
            <>
              <li className="nav-item mb-2">
                <a
                  className="nav-link text-secondary sidebar-heading"
                  href="#submenu2"
                  data-bs-toggle="collapse"
                  data-target="#submenu2"
                  aria-expanded="true"
                >
                  <i className="fas fa-book font-weight-bold"></i>
                  <span className="ml-2 text-white">Course Management</span>
                </a>
                <ul
                  className="list-unstyled flex-column collapse sidebar-nav-sub show"
                  id="submenu2"
                >
                  {/* <li className="nav-item mb-2 ">
                        <a className="nav-link text-secondary" href="">
                          Overview
                        </a>
                      </li> */}

                  <li className="nav-item sidebar-nav-sub-nav-item ">
                    <Link
                      to="/course/my-courses"
                      className="nav-link text-secondary text-white"
                    >
                      My Courses
                    </Link>
                  </li>
                  {/* <li className="nav-item mb-2 ">
                    <Link
                      to="/course/my-assignments"
                      className="nav-link text-secondary text-white"
                    >
                      My Assignments
                    </Link>
                  </li> */}
                </ul>
              </li>
{/* 
              <li className="nav-item mb-2 ">
                <a
                  className="nav-link text-secondary"
                  href="#submenu3"
                  data-bs-toggle="collapse"
                  data-target="#submenu3"
                >
                  <i className="fas fa-solid fa-comment font-weight-bold"></i>
                  <span className="ml-2 text-white">Communication</span>
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
                    </li> 
                  <li className="nav-item mb-2 ">
                    <a className="nav-link text-secondary text-white" href="">
                      Announcements
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
                  <span className="ml-2 text-white">Reports</span>
                </a>
                <ul
                  className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub show"
                  id="submenu4"
                >
                  <li className="nav-item mb-2 ">
                    <a className="nav-link text-secondary text-white" href="">
                      My Favorites
                    </a>
                  </li>

                  <li className="nav-item mb-2 ">
                    <a className="nav-link text-secondary text-white" href="">
                      Courses Insight
                    </a>
                  </li>

                  {/* This feature will be added in future */}

                  {/* <li className="nav-item mb-2 ">
                      <a className="nav-link text-secondary" href="">
                       System Insight
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
                  <span className="ml-2 text-white">Settings</span>
                </a>
                <ul
                  className="list-unstyled flex-column pl-3 collapse sidebar-nav-sub"
                  id="submenu5"
                >
                  <li className="nav-item mb-2 ">
                    <a className="nav-link text-secondary text-white" href="">
                      Accounts
                    </a>
                  </li>
                </ul>
              </li>
               */}
            </>
          ) : (
            ""
          )
        }
      </ul>
      {/* </div> */}
    </div>
  );
};

export default Sidebar;

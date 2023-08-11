import React from "react";
import user from "./user.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md mb-1 nav-bar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          LMS
        </a>
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
              <a className="nav-link" href="#">
                Home <span className="sr-only">Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="//www.codeply.com">
                Link
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto ">
            <li className="nav-item">
              <a
                className="nav-link"
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
                
                <div style={{ display: 'flex'}}>
                  <div><img src={user} alt="User" width="30" /></div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <span>Mohsen Ali</span>
                  <span>Admin</span>
                  </div>

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

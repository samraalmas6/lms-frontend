import React from "react";
import user from "./user.png";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-md mb-1 nav-bar">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          LMS
        </a>
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
              <a class="nav-link" href="#">
                Home <span class="sr-only">Home</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="//www.codeply.com">
                Link
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto ">
            <li class="nav-item">
              <a
                class="nav-link"
                href="/"
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

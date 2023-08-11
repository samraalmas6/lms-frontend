import React from "react";
import Navbar from "../pages/Navbar";
import Sidebar from "../pages/Sidebar";

export default function PrivateRoute({ children }) {
  // if (sessionStorage.getItem('user_id') == null) {
  //     return <Navigate to="/login" />
  // }
  // else {
  return (
    <div>
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <div className="col-sm-4 col-md-3 col-xl-2 px-sm-2 px-0 pe-0">
            <Sidebar />
          </div>
          <div className="col-sm-8 col-md-9 col-xl-10 ps-1">
            <Navbar />
            <div className="col pt-2 mt-2 main-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // }
}
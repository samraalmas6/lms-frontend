import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  if (sessionStorage.getItem('user_id') == null) {
      return <Navigate to="/auth/login" />
  }
  else {
  return (
    <div>
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-12 px-sm-2 col-lg-4 px-0 pe-0">
            <Sidebar />
          </div>
          <div className="col-xxl-10 col-xl-9 col-lg-8 col-md-7 col-xs-12 col-sm-6 ps-1">
            <Navbar />
            <div className="col pt-2 mt-2 main-body" style={{minHeight: '85vh'}}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  }
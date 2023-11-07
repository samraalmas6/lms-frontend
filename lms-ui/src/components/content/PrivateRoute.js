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
          <div 
            className="p-0"
          // className="col-xxl-2 col-xl-2 col-lg-4 col-md-4 col-sm-5 col-xs-6 px-0 pe-0"
            style={{ width: "14.5%"}}
          >
            <Sidebar />
          </div>
          <div 
          className="p-0"
          // className="col-xxl-10 col-xl-10 col-lg-8 col-md-7 col-sm-6 col-xs-6 ps-0 pe-0"
            style={{ width: "85%"}}
          >
            <Navbar />
            <div 
            className="ps-1"
            // className="col p-0 mt-2 pt-2 main-body" 
            style={{minHeight: '85vh'}}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  }
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, page }) {
  if (sessionStorage.getItem('user_id') == null) {
      return <Navigate to="/auth/login" />
  }
  else {
  return (
    <div>
      <div className="app-main-container" id="main">
        <div className="row">
          <div 
            className="p-0"
            style={{ width: "16%"}}
          >
            <Sidebar />
          </div>
          <div 
          className="p-0"
            style={{ width: "84%"}}
          >
            <Navbar page={page}/>
            <div 
            className="ps-1"
            style={{minHeight: '85vh'}}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  }
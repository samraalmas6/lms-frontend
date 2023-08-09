import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function PrivateRoute({ children }) {
  // if (sessionStorage.getItem('user_id') == null) {
  //     return <Navigate to="/login" />
  // }
  // else {
  return (
    <div>
      <Navbar />
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar />
            <div className="col pt-2 mt-2 main-body">
                {children}
            </div>
        </div>
      </div>
    </div>
  );

  // }
}

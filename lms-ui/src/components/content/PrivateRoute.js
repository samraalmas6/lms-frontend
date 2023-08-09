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
      <div class="container-fluid" id="main">
        <div class="row row-offcanvas row-offcanvas-left">
          <Sidebar />
            <div class="col pt-2 mt-2">
                {children}
            </div>
        </div>
      </div>
    </div>
  );

  // }
}

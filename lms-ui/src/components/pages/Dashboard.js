import { useEffect, useState } from "react";

const Dashboard = () => {

  return (
    <div class="col main pt-2 mt-2">
      {/* <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Library</a></li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
        </nav> */}
      <p class="lead d-none d-sm-block">Add User Details and Records</p>

      <div class="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span class="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about LMS
      </div>
      <div class="row mb-3">
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card bg-success text-white h-100">
            <div
              class="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <div class="rotate">
                <i class="fa fa-user fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Users</h6>
              <h1 class="display-4">134</h1>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-danger h-100">
            <div class="card-body bg-danger">
              <div class="rotate">
                <i class="fa fa-list fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Posts</h6>
              <h1 class="display-4">87</h1>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-info h-100">
            <div class="card-body bg-info">
              <div class="rotate">
                <i class="fas fa-solid fa-book fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Courses</h6>
              <h1 class="display-4">125</h1>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-sm-6 py-2">
          <div class="card text-white bg-warning h-100">
            <div class="card-body">
              <div class="rotate">
                <i class="fas fa-solid fa-users fa-4x"></i>
              </div>
              <h6 class="text-uppercase">Instructor</h6>
              <h1 class="display-4">36</h1>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div class="row placeholders mb-3">
        <div class="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/dddddd/fff?text=1"
            class="mx-auto img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>Responsive</h4>
          <span class="text-muted">Device agnostic</span>
        </div>
        <div class="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/e4e4e4/fff?text=2"
            class="mx-auto img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>Frontend</h4>
          <span class="text-muted">UI / UX oriented</span>
        </div>
        <div class="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/d6d6d6/fff?text=3"
            class="mx-auto img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>HTML5</h4>
          <span class="text-muted">Standards-based</span>
        </div>
        <div class="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/e0e0e0/fff?text=4"
            class="center-block img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>Framework</h4>
          <span class="text-muted">CSS and JavaScript</span>
        </div>
      </div>

      <div class="row ">
        <div class="col-lg-7 col-md-6 col-sm-12">
          <h5 class="mt-3 mb-3 text-secondary">
            Check More Records of Users
          </h5>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead class="thead-light">
                <tr>
                  <th>No</th>
                  <th>Label</th>
                  <th>Header</th>
                  <th>Column</th>
                  <th>Record Data</th>
                </tr>
              </thead>
              <tbody>
              
                  <tr>
                    <td>data 1</td>
                    <td>data 1</td>
                    <td>data 1</td>
                    <td>data 1</td>
                    <td>data 1</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

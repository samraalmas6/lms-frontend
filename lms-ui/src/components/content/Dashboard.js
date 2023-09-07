import React from 'react'

const Dashboard = () => {

  return (
    <div className="main">
      <p className="lead d-none d-sm-block">Add User Details and Records</p>
      <div className="alert alert-warning fade collapse" role="alert" id="myAlert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close</span>
        </button>
        <strong>Data and Records</strong> Learn more about LMS
      </div>
      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-success text-white h-100">
            <div
              className="card-body bg-success"
              style={{ backgroundColor: "#57b960" }}
            >
              <div className="rotate">
                <i className="fa fa-user fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Users</h6>
              <h1 className="display-4">134</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-list fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Posts</h6>
              <h1 className="display-4">87</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-info h-100">
            <div className="card-body bg-info">
              <div className="rotate">
                <i className="fas fa-solid fa-book fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Courses</h6>
              <h1 className="display-4">125</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <div className="rotate">
                <i className="fas fa-solid fa-users fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Instructor</h6>
              <h1 className="display-4">36</h1>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div className="row placeholders mb-3">
        <div className="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/dddddd/fff?text=1"
            className="mx-auto img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>Responsive</h4>
          <span className="text-muted">Device agnostic</span>
        </div>
        <div className="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/e4e4e4/fff?text=2"
            className="mx-auto img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>Frontend</h4>
          <span className="text-muted">UI / UX oriented</span>
        </div>
        <div className="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/d6d6d6/fff?text=3"
            className="mx-auto img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>HTML5</h4>
          <span className="text-muted">Standards-based</span>
        </div>
        <div className="col-6 col-sm-3 placeholder text-center">
          <img
            src="//placehold.it/200/e0e0e0/fff?text=4"
            className="center-block img-fluid rounded-circle"
            alt="Generic placeholder thumbnail"
          />
          <h4>Framework</h4>
          <span className="text-muted">CSS and JavaScript</span>
        </div>
      </div>

      <div className="row ">
        <div className="col-lg-7 col-md-6 col-sm-12">
          <h5 className="mt-3 mb-3 text-secondary">
            Check More Records of Users
          </h5>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="thead-light">
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

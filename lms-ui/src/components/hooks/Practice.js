import React from 'react';

function Practice() {
  return (
    <div id="accordion">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Tab 1
            </button>
          </h5>
        </div>

        <div
          id="collapseOne"
          className="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">Content for Tab 1</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button
              className="btn btn-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Tab 2
            </button>
          </h5>
        </div>

        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div className="card-body">Content for Tab 2</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" id="headingThree">
          <h5 className="mb-0">
            <button
              className="btn btn-link collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Tab 3
            </button>
          </h5>
        </div>

        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <div className="card-body">Content for Tab 3</div>
        </div>
      </div>
    </div>
  );
}

export default Practice;

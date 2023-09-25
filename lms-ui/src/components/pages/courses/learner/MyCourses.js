import React, { useState } from "react";
import "../../../styles/MyCourses.css";
import user from "../../../content/Images/user.png";
import cloudCourse from "../../../content/Images/cloudCourse.png"
import courseData from "../../../hooks/courseData";

const MyCourses = () => {
  const [showBlock, setShowBlock] = useState(false);

  const handleViewToggle = () => {
    setShowBlock((prev) => !prev);
  };
  return (
    <>
      <div>
        <button
          className="btn btn-secondary course-toggle-btn"
          type="button"
          style={{ width: "50px" }}
          onClick={handleViewToggle}
        >
          {showBlock ? (
            <i className="fas fa-solid fa-list"></i>
          ) : (
            <i className="fas fa-solid fa-grip-vertical"></i>
          )}
        </button>
        {/* Courses Block view */}
        {showBlock ? (
          <div className="main-cards-container">
            {courseData.map((course) => {
              return (
                <div
                  className="card-container"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                >
                  <div className="upper-half">
                    <div>
                      <h5>{course.course_title}</h5>
                      <p>Current Unit</p>
                      <h6>Instructor Name</h6>
                    </div>
                    <div>
                      <img
                        className="instr-img"
                        src={user}
                        width={"50px"}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="second-half">
                    <p>tagline</p>
                    <div className="progress-main-div block-view">
                      {/* progress % */}
                      {`${course.progress}%`}
                      {/* progress bar */}
                      <div class="progress">
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${course.progress}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      {/* status */}
                      <div>
                        <p className="progress-tag">
                          {course.progress < 1
                            ? "not started"
                            : course.progress < 100
                            ? "in progress"
                            : "completed"}
                        </p>
                      </div>
                    </div>
                    <p>Average Feedback</p>
                  </div>
                  <div className="bottom-container">
                    <i class="fas fa-solid fa-folder"></i>
                  </div>
                </div>
              );
            })}

            {/* -----------xxxxxxxxxxx---------- */}
            {/* <div className="card-container">
            <div className="upper-half">
              <div>
                <h5>Course Name</h5>
                <p>Current Unit</p>
                <h6>Instructor Name</h6>
              </div>
              <div>
                <img className="instr-img" src={user} width={"50px"} alt="" />
              </div>
            </div>
            <div className="second-half">
              <p>tagline</p>
              <div class="progress">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Average Feedback</p>
            </div>
            <div className="bottom-container">
              <i class="fas fa-solid fa-folder"></i>
            </div>
          </div> */}
            {/* ---------------xxxxxxxxx----------- */}
            {/* <div className="card-container">
            <div className="upper-half">
              <div>
                <h5>Course Name</h5>
                <p>Current Unit</p>
                <h6>Instructor Name</h6>
              </div>
              <div>
                <img className="instr-img" src={user} width={"50px"} alt="" />
              </div>
            </div>
            <div className="second-half">
              <p>tagline</p>
              <div class="progress">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Average Feedback</p>
            </div>
            <div className="bottom-container">
              <i class="fas fa-solid fa-folder"></i>
            </div>
          </div> */}
            {/* -------------xxxxxxxxxxxxxx---------------- */}
            {/* <div className="card-container">
            <div className="upper-half">
              <div>
                <h5>Course Name</h5>
                <p>Current Unit</p>
                <h6>Instructor Name</h6>
              </div>
              <div>
                <img className="instr-img" src={user} width={"50px"} alt="" />
              </div>
            </div>
            <div className="second-half">
              <p>tagline</p>
              <div class="progress">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Average Feedback</p>
            </div>
            <div className="bottom-container">
              <i class="fas fa-solid fa-folder"></i>
            </div>
          </div> */}
            {/* -------------xxxxxxxxxxxx--------------- */}
            {/* <div className="card-container">
            <div className="upper-half">
              <div>
                <h5>Course Name</h5>
                <p>Current Unit</p>
                <h6>Instructor Name</h6>
              </div>
              <div>
                <img className="instr-img" src={user} width={"50px"} alt="" />
              </div>
            </div>
            <div className="second-half">
              <p>tagline</p>
              <div class="progress">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Average Feedback</p>
            </div>
            <div className="bottom-container">
              <i class="fas fa-solid fa-folder"></i>
            </div>
          </div> */}
            {/* --------------xxxxxxxxxxxxx-------------- */}
            {/* <div className="card-container">
            <div className="upper-half">
              <div>
                <h5>Course Name</h5>
                <p>Current Unit</p>
                <h6>Instructor Name</h6>
              </div>
              <div>
                <img className="instr-img" src={user} width={"50px"} alt="" />
              </div>
            </div>
            <div className="second-half">
              <p>tagline</p>
              <div class="progress">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p>Average Feedback</p>
            </div>
            <div className="bottom-container">
              <i class="fas fa-solid fa-folder"></i>
            </div>
          </div> */}
            {/* --------------xxxxxxxxxxxxx-------------- */}
          </div>
        ) : (
          <div className="main-listView-Container">  
            {courseData.map((course) => {
              return (
                <div className="list-container">
                  <div className="image-div">
                  <img
                        className=""
                        src={cloudCourse}
                        width={"100%"}
                        alt=""
                      />
                  </div>
                  <div className="course-div">
                    <h5>Course Name</h5>
                    <p>last accessed two weeks ago</p>
                  </div>
                  <div className="progress-main-div">
                    {/* status */}
                    <div>
                      <p className="progress-tag">
                        {course.progress < 1
                          ? "not started"
                          : course.progress < 100
                          ? "in progress"
                          : "completed"}
                      </p>
                    </div>
                    <div className="progress-statics-div">
                       {/* progress % */}
                    <div>{`${course.progress}%`}</div>
                    {/* progress bar */}
                    <div class="progress">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${course.progress}%` }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    </div>
                   
                  </div>
                  <div className="button-div">
                    <button className="btn btn-primary launch-btn">
                      <i class="fas fa-solid fa-play"></i>Launch Course
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* side panel */}
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Offcanvas
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </div>
            <div class="dropdown mt-3">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Dropdown button
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourses;

import React, { useEffect, useState } from "react";
import "../../../styles/MyCourses.css";
import user from "../../../content/Images/user.png";
import cloudCourse from "../../../content/Images/cloudCourse.png";
import courseData from "../../../hooks/courseData";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigation = useNavigate();
  const userId = sessionStorage.getItem("user_id")

  const [showBlock, setShowBlock] = useState(false);
  const [courseContent, setCourseContent] = useState([]);



  useEffect(() => {

    const getTeamData = () => {
      fetch("http://127.0.0.1:8000/teams_list_data/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if(response.status === 200){
        response.json().then(function (result) {
          let totalCourses = [];
          for (const team of result) {
            if (team.users.includes(Number(userId))) {
              team.courses.forEach(course => {
                totalCourses.push(course)
              })
              // totalCourses += team.courses
              // totalCourses = [...totalCourses, team.courses];
            }
          }
          console.log('this is total courses ', totalCourses);
          // setMyCourses(totalCourses)
          getCourseData(totalCourses);
          // setTeamData(result);
        });
      }
      else {
        console.log(response);
      }
      });
    };

    getTeamData();

    const getCourseData = (totalCourses) => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if(response.status === 200) {
        response.json().then(function (result) {
          const courses = [];
          for (const course of result) {
            if (totalCourses.includes(course.id)) {
              courses.push(course)
          }
        }
          setCourseContent(courses);
        });
      }
      });
    };

   
  }, [0]);

  const handleViewToggle = () => {
    setShowBlock((prev) => !prev);
  };

  const handlLunchCourse = (id) => {
    navigation("/my-courses/show", { state: { courseId: id } });
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
            {courseContent.length === 0 
              ? "No Course Found"
              : courseContent &&
                courseContent.map((course) => {
                  return (
                    <div
                      className="card-container"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      key={course.id}
                    >
                      <div className="upper-half">
                        <div>
                          <h5>{course.title}</h5>
                          <p>Current Unit</p>
                          <h6>{"Course Author"}</h6>
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
                          {`${course.id + 20}%`}
                          {/* progress bar */}
                          <div class="progress">
                            <div
                              class="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: `${course.id + 20}%` }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          {/* status */}
                          <div>
                            <p className="progress-tag">
                              {course.id + 20 < 1
                                ? "not started"
                                : course.id + 20 < 100
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
            {courseContent.length === 0 
              ? "No Course Found"
              : courseContent &&
                courseContent.map((course) => {
              return (
                <div className="list-container">
                  <div className="image-div">
                    {course.course_image ? (
                      <img
                        className=""
                        src={course.course_image}
                        width={"100%"}
                        alt=""
                      />
                    ) : (
                      <img
                        className=""
                        src={cloudCourse}
                        width={"100%"}
                        alt=""
                      />
                    )}
                    <img
                      className=""
                      src={course.course_image}
                      width={"100%"}
                      alt=""
                    />
                  </div>
                  <div className="course-div">
                    <h5>{course.title}</h5>
                    {/* <p>last accessed two weeks ago</p> */}
                  </div>
                  <div className="progress-main-div">
                    status
                    <div>
                      <p className="progress-tag">
                        {course.id < 1
                          ? "not started"
                          : course.id < 100
                          ? "in progress"
                          : "completed"}
                      </p>
                    </div>
                    <div className="progress-statics-div">
                      {/* progress % */}
                      <div>{`${course.id + 20}%`}</div>
                      {/* progress bar */}
                      <div class="progress">
                        <div
                          class="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${course.id + 20}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="button-div">
                    <button
                      className="btn btn-primary launch-btn"
                      type="button"
                      onClick={() => handlLunchCourse(course.id)}
                    >
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

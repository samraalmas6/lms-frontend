import React, { useEffect, useState } from "react";
import "../../../styles/MyCourses.css";
import user from "../../../content/Images/user.png";
import cloudCourse from "../../../content/Images/cloudCourse.png";
import courseData from "../../../hooks/courseData";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigation = useNavigate();
  const userId = sessionStorage.getItem("user_id");

  const [showBlock, setShowBlock] = useState(false);
  const [courseContent, setCourseContent] = useState([]);
  // const [unitContent, setUnitContent] = useState([]);
  const [userData, setUserData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  console.log("I have come to my-courses screen");
  useEffect(() => {
    const getTeamData = () => {
      fetch("http://127.0.0.1:8000/teams_list_data/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        console.log("response: ", response);
        if (response.status === 200) {
          response.json().then(function (result) {
            let totalCourses = [];
            for (const team of result) {
              if (team.users.includes(Number(userId))) {
                team.courses.forEach((course) => {
                  totalCourses.push(course);
                });
              }
            }
            console.log("this is total courses ", totalCourses);
            // setMyCourses(totalCourses)
            getCourseData(totalCourses);
            // setTeamData(result);
          });
        } else {
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
          console.log('Course Api Result', result);
          const courses = [];
          for (const course of result) {
            if (totalCourses.includes(course.id)) {
              courses.push(course)
          }
        }
          setCourseContent(courses);
          console.log('this is course object', courses);
        });
      }
      });
    };

    // const getUnitData = () => {
    //   fetch("http://127.0.0.1:8000/api/units/", {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Token ${sessionStorage.getItem("user_token")}`,
    //     },
    //   }).then((response) => {
    //     if (response.status === 200) {
    //       response.json().then(function (result) {
    //         console.log("unit data: ",result);
    //         setUnitContent(result);
    //       });
    //     } else {
    //       console.log(response);
    //     }
    //   });
    // };
    // getUnitData()

    const getAuthors = () => {
      fetch("http://127.0.0.1:8000/api/authors/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("authors data: ", result);
            setAuthorData(result);
          });
        } else {
          console.log(response);
        }
      });
    };
    getAuthors();

    const getUsers = () => {
      fetch("http://127.0.0.1:8000/list_all_users/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("user data: ", result);
            setUserData(result);
          });
        } else {
          console.log(response);
        }
      });
    };
    getUsers();

    const getCategoriesData = () => {
      fetch("http://127.0.0.1:8000/api/categories/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("category data: ", result);
            setCategoryData(result);
          });
        } else {
          console.log(response);
        }
      });
    };
    getCategoriesData();
  }, [0]);

  const handleViewToggle = () => {
    setShowBlock((prev) => !prev);
  };

  const handlLunchCourse = (id) => {
    navigation("/my-courses/show", { state: { courseId: id } });
  };

  const getUSerFullName = (id) => {
    if (authorData.length !== 0) {
      const author = authorData.filter((author) => {
        return author.id === id;
      });

      if (author.length !== 0 && userData.length !== 0) {
        const user = userData.filter(
          (users) => users.id === author[0].created_by
        );
        if (user.length !== 0) {
          return `${user[0].first_name} ${user[0].last_name}`;
        } else {
          return "N/A";
        }
      } else {
        return "N/A";
      }
    }
  };

  const getCategoryName = (id) => {
    if (categoryData.length !== 0) {
      const category = categoryData.filter((cat) => cat.id === id);
      return category[0].title;
    }
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
                          {/* <p>{course.unit}</p> */}
                          {/* <h6>{"Course Author"}</h6> */}
                          <h6>{getUSerFullName(course.id)}</h6>
                          <div>
                            {course.category.map((category) => {
                              return <p>{getCategoryName(category)}</p>;
                            })}
                          </div>
                        </div>
                        <div className="instr-img">
                          <img src={user} width={"50px"} alt="" />
                        </div>
                      </div>
                      <div className="second-half">
                        {/* <p>tagline</p> */}
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
                        {/* <p>Average Feedback</p> */}
                      </div>
                      {/* <div className="bottom-container">
                        <i class="fas fa-solid fa-folder"></i>
                      </div> */}
                      <div className="block-view button-div">
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
                        {/* status */}
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
      </div>
    </>
  );
};

export default MyCourses;

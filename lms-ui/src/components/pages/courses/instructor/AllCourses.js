import React, { createContext, useEffect, useRef, useState } from "react";
import CourseContent from "./CourseContent";

export const CourseProbs = createContext(null);

const AllCourse = ({ show, minDate }) => {
  const userId = sessionStorage.getItem("user_id");
  const userRole = sessionStorage.getItem("role");
  //   Create Course Section
  const [courseContent, setCourseContent] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [moduleData, setModuleData] = useState([]);

  const [courseCategory, setCourseCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseStart, setCourseStart] = useState("2023-09-08");
  const [courseEnd, setCourseEnd] = useState("2023-10-08");
  const [courseImg, setCourseImg] = useState("");
  const [uploadImg, setUploadImg] = useState("");
  const [visibility, setVisibility] = useState();
  const [courseDes, setCourseDes] = useState("");
  const [courseCreator, setCourseCreator] = useState(sessionStorage.getItem("user_id"))
  const [courseCoauthors, setCourseCoauthors] = useState([]);

  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const getCourseData = () => {
      fetch("http://127.0.0.1:8000/api/courses/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Api course result", result);
            // setCourseContent(result);
            if (userRole === "admin") {
              setCourseContent(result);
            } else {
              const obj = result.filter((course) => {
                return (
                  course.created_by == userId || course.editor.includes(+userId)
                );
              });
              console.log("this is obj", obj, userId);
              setCourseContent(obj);
            }
          });
        } else {
          console.log(response);
          setCourseContent([]);
        }
      });
    };

    const getCategoryData = () => {
      fetch("http://127.0.0.1:8000/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            setCategoryData(result);
          });
        } else {
          console.log(response);
          setCategoryData([]);
        }
      });
    };

    const getTeamData = () => {
      fetch("http://127.0.0.1:8000/teams_list_data/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("team data", result);
            setTeamData(result);
          });
        } else {
          console.log(response);
          setTeamData([]);
        }
      });
    };

    const getUsers = () => {
      fetch("http://127.0.0.1:8000/list_all_users/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setUserData(result);
          });
        } else {
          console.log(response);
        }
      });
    };

    getCategoryData();
    getTeamData();
    getUsers();
    getCourseData();
  }, [0]);

  const getUSerFullName = (id) => {
    if (id !== "undefined" && userData.length !== 0) {
      const name = userData.filter((users) => users.id === id);
      if (name.length !== 0) {
        return `${name[0].first_name} ${name[0].last_name}`;
      } else {
        return "N/A";
      }
    } else {
      return "N/A";
    }
  };

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handlecourseCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (courseTitle && courseCategory) {
      const obj = {
        title: courseTitle,
        description: `This is description for the ${courseTitle} course.`,
        start_date: courseStart,
        end_date: courseEnd,
        updated_by: sessionStorage.getItem("user_id"),
        category: [courseCategory],
        created_by: courseCreator,
        editor: [sessionStorage.getItem('user_id')]
      };

      fetch("http://127.0.0.1:8000/api/courses/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            setCourseContent((pre) => [...pre, result]);
            setCourseCreator(result.created_by)
            setCourseCategory("");
            setCourseTitle("");
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  const getNumberOfUsers = (id) => {
    let totalUsers = 0;
    for (const team of teamData) {
      if (team.courses.includes(id)) {
        
        totalUsers += team.users.length;
      }
    }
    return totalUsers;
  };

  const handleCourseContentData = (course) => {
    setCourseCoauthors(course.editor);
    setCourseId(course.id);
    setCourseTitle(course.title);
    setCourseCategory(course.category);
    // setCourseStart(course.start_date)
    // setCourseEnd(course.end_date)
    setCourseImg(course.course_image);
    setVisibility(course.is_active);
    setCourseCreator(course.created_by);
    setCourseDes(`<p>${course.description}</p>`);

    fetch(`http://127.0.0.1:8000/api/courses/${course.id}/modules`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("Api result: ", result);
          setModuleData(result);
        });
      } else {
        console.log(response);
        setModuleData([]);
      }
    });
  };

  console.log("Course co-authors:", courseCoauthors);
  return (
    <div>
      <div className="all-course-content">
        <div className="creat-course-btn">
          <button
            type="button"
            className="btn btn-primary ms-3 mb-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
            onClick={() => {
              setCourseTitle("");
              setCourseCategory("");
            }}
          >
            <i className="fas fa-solid fa-plus"></i> Add Course
          </button>

          {/* This is for Category panel */}

          <div className="create-course">
            <div
              className={`offcanvas offcanvas-end ${show}`}
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                  Add Course
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div className="add-category-content">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <label className="mb-0">
                      Title<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={courseTitle}
                      onChange={handleCourseTitle}
                      required
                    />
                    <label className="mb-0 mt-1">
                      Category<span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      onChange={(e) => handlecourseCategory(e)}
                      value={courseCategory}
                      required
                    >
                      <option value="">--Select Category--</option>
                      {categoryData.length === 0 ||
                      categoryData.detail == "No objects found"
                        ? categoryData.detail
                        : categoryData &&
                          categoryData.map((category) => {
                            return (
                              <option value={category.id} key={category.id}>
                                {category.title}
                              </option>
                            );
                          })}
                    </select>
                    <div className="category-save-btn">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => handleSave(e)}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* This is for Course Content */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          style={{ width: "87%" }}
          id="offcanvasCourse"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-body">
            <CourseProbs.Provider
              value={{ courseId, courseCoauthors, setCourseCoauthors, courseCreator }}
            >
              <CourseContent
                courseTitle={courseTitle}
                setCourseTitle={setCourseTitle}
                courseCategory={courseCategory}
                setCourseCategory={setCourseCategory}
                courseImg={courseImg}
                setCourseImg={setCourseImg}
                moduleData={moduleData}
                categoryData={categoryData}
                setModuleData={setModuleData}
                courseContent={courseContent}
                setCourseId={setCourseId}
                visibility={visibility}
                setVisibility={setVisibility}
                courseDes={courseDes}
                setCourseDes={setCourseDes}
                userData={userData}
              />
            </CourseProbs.Provider>
          </div>
        </div>
        <table className="table table-striped ">
          <thead className="table-info">
            <tr>
              <th scope="col">Course Title</th>
              <th scope="col">Description</th>
              <th scope="col">Author</th>
              <th scope="col">Users Enrolled</th>
              <th scope="col">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {courseContent.length !== 0 &&
              courseContent.map((course) => {
                return (
                  <tr
                    key={course.id}
                    role="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                    onClick={() => {
                      handleCourseContentData(course);
                    }}
                  >
                    <td>{course.title}</td>
                    <td>{course.description}</td>
                    <td>{getUSerFullName(course.created_by)}</td>
                    <td>{getNumberOfUsers(course.id)}</td>
                    <td>{course.created_at}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourse;

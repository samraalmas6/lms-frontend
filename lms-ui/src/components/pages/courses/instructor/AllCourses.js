import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CourseProbs } from "../../../../App";
import Avatar from "react-avatar";

const AllCourse = ({ show, minDate }) => {
  const userId = sessionStorage.getItem("user_id");
  const userRole = sessionStorage.getItem("role");
  const navigate = useNavigate();
  const {
    courseId,
    setCourseId,
    instructor,
    setInstructor,
    courseCoauthors,
    setCourseCoauthors,
    courseCreator,
    setCourseCreator,
  } = useContext(CourseProbs);
  //   Create Course Section
  const [showContent, setShowContent] = useState("");
  const [courseContent, setCourseContent] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [moduleData, setModuleData] = useState([]);
  const [singleCourse, setSingleCourse] = useState([]);
  const [courseCategory, setCourseCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [authorData, setAuthorData] = useState([]);

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
                return course.is_delete === false
              });
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
            console.log("API team data", result);
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
            console.log('API user Data ',result);
            setUserData(result);
          });
        } else {
          console.log(response);
        }
      });
    };

    const getAuthorsData = () => {
      fetch(`http://localhost:8000/api/authors/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log('Api result Author Data', result);
            setAuthorData(result);
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
    getAuthorsData();
  }, [0]);

  const getUSerFullName = (id) => {
    if (authorData.length !== 0){
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

  function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);
  
    return color;
  }

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handlecourseCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (courseTitle && courseCategory) {
      fetch("http://127.0.0.1:8000/api/authors/", {
        method: "POST",
        body: JSON.stringify({created_by: userId, editor: [userId]}),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log('Author Post Api result', result);
            coursePostRequest(result.id)
           
          });
        } else {
          console.log(response);
        }
      });



      const coursePostRequest = (authorId) => {
      const obj = {
        title: courseTitle,
        description: `This is description for the ${courseTitle} course.`,
        category: [courseCategory],
        updated_by: userId,
        instructor: authorId
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
            setCourseCategory("");
            setCourseTitle("");
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
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

  const handleDeleteCourse = (course, deleted) => {
     const courseAuthor = authorData.filter(author => author.id === course.instructor); 
    if(+sessionStorage.getItem("user_id") === courseAuthor[0].created_by || sessionStorage.getItem("role") === 'admin'){
    let action = "";
    if (deleted) {
      action = "Delete";
    } else {
      action = "Restore";
    }
    Swal.fire({
      title: "Attention",
      text: `Do you want to ${action} this course?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          title: course.title,
          is_updated: true,
          is_delete: deleted,
          category: course.category,
          updated_by: userId,
          instructor: course.instructor
        };

        fetch(`http://127.0.0.1:8000/api/courses/${course.id}/`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 200) {
            response.json().then(function (result) {
              console.log("Api result Course: ", result);
              Swal.fire(
                `${action}d!`,
                `${course.title} has been ${action}d.`,
                "success"
              ).then((res) => {
                window.location.reload();
              });
              setCourseContent((pre) => [...pre, result]);
              setCourseCategory("");
              setCourseTitle("");
              
            });
          } else {
            console.log(response);
          }
        });
      }
    });
  }else {
   Swal.fire({
    icon: "warning",
    text: "You can't delete this course!"
   })
  }
  };

  const handleCourseContentData = (course) => {
    setSingleCourse(course);
    const obj = authorData.filter(author => author.id === course.instructor);
    if(obj.length !==0 ){
      setCourseCoauthors(obj[0].editor);
      setCourseCreator(obj[0].created_by)
    }

    setCourseId(course.id);
    setCourseTitle(course.title);
    setCourseCategory(course.category);
    setInstructor(course.instructor)

    navigate(`/course/content/${course.id}`, {
      state: {
        courseContent,
        categoryData,
        userData,
        course,
        courseCoauthors
      },
    });

    // setCourseStart(course.start_date)
    // setCourseEnd(course.end_date)
    // fetch(`http://127.0.0.1:8000/api/courses/${course.id}/modules`, {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Token ${sessionStorage.getItem("user_token")}`,
    //   },
    // }).then((response) => {
    //   if (response.status === 200) {
    //     response.json().then(function (result) {
    //       console.log("Api result: ", result);
    //       const obj = result.filter(module => {
    //         return module.is_delete === false
    //       })
    //       setModuleData(obj);

    //     });
    //   } else {
    //     console.log(response);
    //     setModuleData([]);
    //   }
    // });
  };

  return (
    <div className="">
      <div className="all-course-content pt-2">
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

        {/* <CourseContent
                singleCourse={singleCourse}
                setSingleCourse={setSingleCourse}
                moduleData={moduleData}
                categoryData={categoryData}
                setModuleData={setModuleData}
                courseContent={courseContent}
                setCourseId={setCourseId}
                userData={userData}
                showContent={showContent}
                setShowContent={setShowContent}
              /> */}
        <table className="table table-striped ">
          <thead className="table-info">
            <tr>
              <th scope="col">Course Title</th>
              <th scope="col">Description</th>
              <th scope="col">Author</th>
              <th scope="col">Users Enrolled</th>
              <th scope="col">Created</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {courseContent.length !== 0 &&
              courseContent.map((course) => {
                let deletedCourse = "";
                if (course.is_delete === true) {
                  deletedCourse = "course-delete";
                }
                return (
                  <tr
                    key={course.id}
                    role="button"
                    // data-bs-toggle="offcanvas"
                    // data-bs-target="#offcanvasCourse"
                    // aria-controls="offcanvasRight"
                    onClick={() => {
                      setShowContent("show");
                      handleCourseContentData(course);
                    }}
                  >
                    <td className={`deletedCourse} ${deletedCourse && "deleteCourse-line"}`}>{course.title}</td>
                    <td
                     className={deletedCourse}>{course.description}</td>
                    <td className={deletedCourse}>
                    <Avatar
                    name={getUSerFullName(course.instructor)}
                    style={{
                      backgroundColor: randomColor()
                    }}
                    className="me-1"
                    round={true}
                    size="30px"
                    ></Avatar> 
                      {getUSerFullName(course.instructor)}
                    </td>
                    <td className={`text-center ${deletedCourse}`}>
                      {getNumberOfUsers(course.id)}
                    </td>
                    <td className={deletedCourse}>{course.created_at}</td>
                    <td style={{ display: "flex" }}>
                      <i className="bi bi-pencil-square text-success me-3"></i>
                      {course.is_delete ? (
                        <i
                          className="bi bi-recycle text-info"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCourse(course, false);
                          }}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-trash text-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCourse(course, true);
                          }}
                        ></i>
                      )}

                      {/* <div className="form-check form-switch">
                          <input
                            className="form-check-input "
                            type="checkbox"
                            role="switch"
                            checked={visibility}
                            value={visibility}
                            onChange={handleVisibility}
                            id="flexSwitchCheckDefault"
                          />
                        </div> */}
                    </td>
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

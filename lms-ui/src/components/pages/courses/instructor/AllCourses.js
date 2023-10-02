import React, { useEffect, useRef, useState } from "react";
import CourseContent from "./CourseContent";

const AllCourse = ({ show, minDate }) => {
  //   Create Course Section
  const [courseContent, setCourseContent] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [teamData, setTeamData] = useState([]);

  const [moduleData, setModuleData] = useState([]);

  const [courseCategory, setCourseCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseStart, setCourseStart] = useState('2023-09-08T00:00:00Z')
  const [courseEnd, setCourseEnd] = useState('2023-10-08T00:00:00Z')
  const [courseImg, setCourseImg] = useState("");
  const [uploadImg, setUploadImg] = useState("");

  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const getCourseData = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setCourseContent(result);
        });
      });
    };
    const getCategoryData = () => {
      fetch("http://127.0.0.1:8000/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        response.json().then(function (result) {
          console.log(result);
          setCategoryData(result);
        });
      });
    };

    getCourseData();
    getCategoryData();
  }, [0]);

  console.log("Team Data", teamData);

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
        description: "Test Description",
        start_date: courseStart,
        end_date: courseEnd,
        author: sessionStorage.getItem('user_id'),
        updated_by: sessionStorage.getItem('user_id'),
        category: [courseCategory],
      };
      fetch("http://127.0.0.1:8000/api/courses/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status == 201) {
          response.json().then(function (result) {
            console.log(result);
            setCourseCategory("");
            setCourseTitle("");
            window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  const handleCourseContentData = (course) => {
    setCourseId(course.id);
    setCourseTitle(course.title);
    setCourseCategory(course.category)
    setCourseStart(course.start_date)
    setCourseEnd(course.end_date)
    setCourseImg(course.course_image)

    fetch(`http://127.0.0.1:8000/api/courses/${course.id}/modules`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      response.json().then(function (result) {
        console.log("Api result: ", result);
        setModuleData(result);
      });
    });
  };

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
              courseId={courseId}
              setCourseId={setCourseId}
            />
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course Title</th>
              <th scope="col">Description</th>
              <th scope="col">Duration</th>
              <th scope="col">Users Enrolled</th>
              <th scope="col">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {courseContent.length === 0 ||
            courseContent.detail == "No objects found"
              ? courseContent.detail
              : courseContent &&
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
                      <td>{course.duration}</td>
                      <td>{course.users_enrolled}</td>
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

import React, { useEffect, useState } from "react";
// import catData from "../../hooks/catData";
import "../../styles/Category.css";
// import courseData from "../../hooks/courseData";

const AllCategory = ({ show }) => {
  const [categoryName, setCatgoryName] = useState("");
  const [parentCat, setParentCat] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [categoryCourses, setcategoryCourses] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const [checkedAll, setCheckAll] = useState(false);

  useEffect(() => {
    const getCategory = () => {
      fetch("http://127.0.0.1:8000/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem('user_token')}`,
        },
      }).then((response) => {
        if(response.status === 200){
        response.json().then(function (result) {
          console.log(result);
          setCategoryData(result);
        });
      }
      else {
        console.log(response);
      }
      });
      // setCoursesData(courseData);
    };
    const getCourse = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem('user_token')}`,
        },
      }).then((response) => {
        if(response.status === 200){
        response.json().then(function (result) {
          console.log(result);
          setCoursesData(result);
        });
      }
      else {
        console.log(response);
      }
      });
    };

    getCategory();
    getCourse();
  }, []);

  const handleCatName = (e) => {
    setCatgoryName(e.target.value);
  };
  const handleParentCat = (e) => {
    setParentCat(e.target.value);
  };

  const handleDeleteCourse = (id) => {
    const obj = categoryCourses.filter((course) => {
      return course.id !== id;
    });
    setcategoryCourses(obj);
  };

  const handleAddCat = (e) => {
    const obj = {
      title: categoryName,
      description: "This is test cat",
      parent: parentCat,
      created_by: sessionStorage.getItem("user_id"),
      updated_by: sessionStorage.getItem("user_id"),
      // updated_by: sessionStorage.getItem('name')
    };

    fetch("http://127.0.0.1:8000/api/categories/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem('user_token')}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status == 201) {
        response.json().then(function (result) {
          console.log(result);
          setCatgoryName("");
          setParentCat("");
          setCategoryData(pre => [...pre, result])
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handlAllSelect = () => {
    const selectItems = document.getElementsByClassName("course-check");
    if (checkedAll) {
      for (let item of selectItems) {
        item.checked = false;
      }
    } else {
      for (let item of selectItems) {
        item.checked = true;
      }
    }
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    const selectItems = document.getElementsByClassName("course-check");
    for (let item of selectItems) {
      if (item.checked) {
        const newObj = coursesData.filter((course) => {
          return course.course_title === item.value;
        });
        console.log(" obj  =", newObj);
        if (typeof categoryCourses !== "undefined") {
          setcategoryCourses(() => [...categoryCourses, newObj[0]]);
        } else {
          setcategoryCourses([newObj[0]]);
        }
      }

      item.checked = false;
    }

    // console.log(categoryCourses);
  };
  return (
    <div style={{boxShadow: "4px 3px 21px -10px gray"}}>
      <div className="creat-course-btn p-2">
        <button
          type="button"
          className="btn btn-primary ms-3 mb-2"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          <i className="fas fa-solid fa-plus"></i> Add Category
        </button>
        {/* This is for Category panel */}
      </div>
      <div
        className={`offcanvas offcanvas-end ${show}`}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Add Category
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
            <form>
              <label className="mb-0">
                Title<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={handleCatName}
                required
              />
              <label className="mb-0 mt-1">Parent Category</label>
              <select onChange={handleParentCat} value={parentCat}>
                <option value="">--Select Category--</option>
                {categoryData &&
                  categoryData.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.title}
                      </option>
                    );
                  })}
                {/* <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
                <option value="Category 4">Category 4</option>
                <option value="Category 5">Category 5</option> */}
              </select>
              <div className="category-save-btn">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddCat}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Names</th>
            <th scope="col">Description</th>
            <th scope="col">Used In</th>
            <th scope="col">Parent Category</th>
          </tr>
        </thead>
        <tbody>
          {categoryData &&
            categoryData.map((category) => {
              return (
                <tr
                  key={category.id}
                  role="button"
                  onClick={() => {
                    setCatgoryName(category.title);
                    setParentCat(category.parent);
                    setcategoryCourses(() => category.courses);
                    //   setTeamUser(team.Users);
                    //   setTeamCourses(team.Courses);
                    // setTeamDetail([team.Users, team.Courses]);
                  }}
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasCourse"
                  aria-controls="offcanvasRight"
                >
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                  <td>{category.usedIn}</td>
                  <td>{category.parent}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        style={{ width: "87%" }}
        id="offcanvasCourse"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-body">
          <div className="add-course-content">
            <div className="course-name-section">
              <ul style={{ paddingLeft: "10px" }}>
                {categoryData &&
                  categoryData.map((category) => {
                    return (
                      <div key={category.id}>
                        <li>
                          <a
                            role="button"
                            onClick={() => {
                              setCatgoryName(category.title);
                              setParentCat(category.parent);
                              setcategoryCourses(() => category.courses);
                              // setTeamCourses(team.Courses);
                            }}
                          >
                            {category.title}
                          </a>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
            <div className="course-form-section">
              <div className="offcanvas-head">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                  Add Category Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <form>
                <label className="mb-0">
                  Category Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={handleCatName}
                  required
                  className="course-title"
                />

                <div className={"teamListSection"}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ borderTop: "none" }}>Name</th>
                        <th style={{ borderTop: "none" }}>Parent Category</th>
                        <th style={{ borderTop: "none" }}>Courses</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={"borderLess"}>
                        <td className={"borderLess"}>
                          <span>{categoryName}</span>
                        </td>
                        <td className={"borderLess"}>
                          {/* <span className="label-tag">{parentCat.slice(0,1).toUpperCase()+ parentCat.slice(-1).toUpperCase()}</span> */}
                          <span>{parentCat}</span>
                        </td>
                        <td className={"borderLess"}>
                          {categoryCourses &&
                            categoryCourses.map((course, index) => {
                              return (
                                <tr
                                  key={course.id}
                                  className={"borderLess w-100"}
                                >
                                  <td className={"borderLess"}>{index + 1}</td>
                                  <td className={"borderLess"}>
                                    {course.course_title}
                                  </td>
                                  <td className={"borderLess"}>
                                    <button
                                      type="button"
                                      className={"deleteBtn"}
                                      onClick={() =>
                                        handleDeleteCourse(course.id)
                                      }
                                    >
                                      {" "}
                                      X{" "}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* <div className="courseAddBtn catCourseBtn">
                  <button
                    className="btn btn-primary me-3"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#show-course-list"
                    aria-expanded="false"
                    aria-controls="show-course-list"
                  >
                    Add Course
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${"teamCourseSection"} offcanvas offcanvas-bottom`}
        id="show-course-list"
        tabindex="-1"
      >
        <div className="header-section">
          <h3>Courses</h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className={"addBtnSection"}>
          <input
            type="search"
            className="all-users-input"
            placeholder="Search Course.."
          />
          <button
            type="button"
            className="text-bg-primary add-new-user"
            onClick={handleAddCourse}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasCourse"
          >
            Add
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={() => {
                  setCheckAll((pre) => !pre);
                  handlAllSelect();
                }}
                style={{ cursor: "pointer" }}
              >
                Select All
              </th>
              <th scope="col">Course Title</th>
              <th scope="col">Author</th>
              <th scope="col">Description</th>
              <th scope="col">Users Enrolled</th>
              <th scope="col">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.length === 0 ||
          coursesData.detail == "No objects found"
            ? coursesData.detail
            : coursesData &&
            coursesData.map((course) => {
                return (
                  <tr key={course.id}>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input course-check"
                          type="checkbox"
                          name="check"
                          value={course.title}
                          onChange={(e) => {}}
                          id="flexCheckDefult"
                        />
                      </div>
                    </td>
                    <td>{course.title}</td>
                    <td>{course.author}</td>
                    <td>{course.description}</td>
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

export default AllCategory;

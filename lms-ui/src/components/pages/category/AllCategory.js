import React, { useEffect, useState } from "react";
// import catData from "../../hooks/catData";
import "../../styles/Category.css";
import Swal from "sweetalert2";
import SingleCategory from "./SingleCategory";
// import courseData from "../../hooks/courseData";

const AllCategory = ({ show }) => {
  const [categoryName, setCatgoryName] = useState("");
  const [parentCat, setParentCat] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [categoryContent, setCategoryContent] = useState([]);

  useEffect(() => {
    const getCategory = () => {
      fetch("http://127.0.0.1:8000/api/categories", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setCategoryData(result);
          });
        } else {
          console.log(response);
        }
      });
      // setCoursesData(courseData);
    };
    const getCourse = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setCoursesData(result);
          });
        } else {
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

  const handleAddCat = (e) => {
    const obj = {
      title: categoryName,
      description: "This is test cat",
      parent: parentCat,
      created_by: sessionStorage.getItem("user_id"),
      updated_by: sessionStorage.getItem("user_id"),
      user: sessionStorage.getItem("user_id"),
      // updated_by: sessionStorage.getItem('name')
    };

    fetch("http://127.0.0.1:8000/api/categories/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 201) {
        response.json().then(function (result) {
          console.log(result);
          setCatgoryName("");
          setParentCat("");
          setCategoryData((pre) => [...pre, result]);
          Swal.fire({
            icon: "success",
            title: `${result.title} has been created`,
          });
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleDeleteCategory = (category, deleted) => {
    if (sessionStorage.getItem("role") === "admin") {
      let action = "";
      if (deleted) {
        action = "Delete";
      } else {
        action = "Restore";
      }
      Swal.fire({
        title: "Attention",
        text: `Do you want to ${action} this category?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `${action}`,
      }).then((result) => {
        if (result.isConfirmed) {
          const obj = {
            title: category.title,
            is_updated: true,
            created_by: category.created_by,
            is_delete: deleted,
            updated_by: sessionStorage.getItem("user_id"),
          };

          fetch(`http://127.0.0.1:8000/api/categories/${category.id}/`, {
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
                  `${category.title} has been ${action}d.`,
                  "success"
                ).then((res) => {
                  window.location.reload();
                });
                // setCategoryData((pre) => [...pre, result]);
              });
            } else {
              console.log(response);
            }
          });
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        text: "You can't delete this course!",
      });
    }
  };

  const getNumberOfCourses = (id) => {
    let counter = 0;
    coursesData.forEach((course) => {
      if (course.category.includes(id)) {
        counter++;
      }
    });
    return counter;
  };

  const getCategoryName = (id) => {
    const category = categoryData.filter((category) => {
      return category.id === id;
    });
    console.log("This is category:", category, id);
    if (category.length !== 0) {
      return category[0].title;
    } else {
      return "None";
    }
  };

  return (
    <div className="pt-2">
      <form className="add-categoryform">
        <div className="create-category-btn">
          <button
            type="button"
            className="btn btn-primary ms-3"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fas fa-solid fa-plus"></i> Add Category
          </button>
          {/* This is for Category panel */}
        </div>
      </form>
      <div className="all-category-content">
      <div
        className={`offcanvas offcanvas-end ${show}`}
        style={{ width: "30%"}}
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
            <form className="add-new-category-form">
              <div className="add-new-category-form-content">
                <label className="mb-0 w-100">
                  Title<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={handleCatName}
                  required
                  placeholder="Team Title"
                  className="w-100"
                />
                <label className="mb-0 mt-1 w-100">Parent Category</label>
                <select
                  onChange={handleParentCat}
                  value={parentCat}
                  className="w-100"
                >
                  <option value="">--Select Category--</option>
                  {categoryData &&
                    categoryData.map((category) => {
                      return (
                        <option value={category.id} key={category.id}>
                          {category.title}
                        </option>
                      );
                    })}
                </select>
              </div>
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

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="category-table-heading">#</th>
            <th className="category-table-heading">Names</th>
            <th className="category-table-heading">Description</th>
            <th className="category-table-heading">Courses</th>
            <th className="category-table-heading">Parent Category</th>
            <th className="category-table-heading">Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryData &&
            categoryData.map((category, index) => {
              return (
                <tr
                  key={category.id}
                  style={{ borderBottom: "1px solid #dee2e6" }}
                  role="button"
                  onClick={() => {
                    setCategoryContent(category);
                    var myOffcanvas =
                      document.getElementById("offcanvasCourse");
                    if (myOffcanvas) {
                      myOffcanvas.classList.add("show");
                    }
                    // setCatgoryName(category.title);
                    // setParentCat(category.parent);
                    // setcategoryCourses(() => category.courses);

                    //   setTeamUser(team.Users);
                    //   setTeamCourses(team.Courses);
                    // setTeamDetail([team.Users, team.Courses]);
                  }}
                  // data-bs-toggle="offcanvas"
                  // data-bs-target="#offcanvasCourse"
                  // aria-controls="offcanvasRight"
                >
                  <td style={{ width: "3%", fontWeight: "bold" }}>
                    {index + 1}
                  </td>
                  <td className="category-table-title">{category.title}</td>
                  <td>{category.description}</td>
                  <td style={{ fontWeight: "bold" }} className="ps-3">
                    {getNumberOfCourses(category.id)}
                  </td>
                  <td>{getCategoryName(category.parent)}</td>
                  <td
                    style={{ display: "flex", border: "none" }}
                    className="ps-3"
                  >
                    {category.is_delete ? (
                      <i
                        className="bi bi-recycle text-info"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category, false);
                        }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-trash text-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(category, true);
                        }}
                      ></i>
                    )}
                  </td>
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
        <div className="offcanvas-body pe-1">
          <SingleCategory
            categoryContent={categoryContent}
            categoryData={categoryData}
            getCategoryName={getCategoryName}
            getNameOfCourses={getCategoryName}
            coursesData={coursesData}
          />
        </div>
      </div>


      </div>



    </div>
  );
};

export default AllCategory;

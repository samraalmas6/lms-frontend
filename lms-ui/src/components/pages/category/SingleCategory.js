import React, { useEffect, useState } from 'react'

const SingleCategory = ({categoryContent,categoryData, getCategoryName, coursesData}) => {

    const [categoryTitle, setCategoryTitle] = useState(categoryContent.title);
    const [categoryId, setCategoryId] = useState(categoryContent.id)
    const [categoryCourses, setcategoryCourses] = useState([]);
    const [parentCat, setParentCat] = useState(categoryContent.parent);
    const [editCategory, setEditCategory] = useState(false);
    const [showEditBtn, setShowEditBtn] = useState(false);
    const [categoryName, setCategoryName] = useState("")

    useEffect(() => {
        getNameOfCourses(categoryContent.id);
        setCategoryTitle(categoryContent.title);
        setParentCat(categoryContent.parent)
        setCategoryName(categoryContent.title)
    },[categoryContent])
    const handleCategoryName = (e) => {
        setCategoryTitle(e.target.value);
      };

      const getNameOfCourses = (id) => {
        setcategoryCourses([]);
        coursesData.forEach((course) => {
          if (course.category.includes(id)) {
            setcategoryCourses((pre) => [...pre, course]);
          }
        });
      };

    const handleUpdateTitle = (e) => {
        if (e.key === "Enter" || e.type === "contextmenu") {
          e.preventDefault();
    
          const obj = {
            title: categoryTitle,
            is_updated: true,
            created_by: 2,
            updated_by: 2,
          };
    
          fetch(`http://127.0.0.1:8000/api/categories/${categoryId}/`, {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: {
              Authorization: `Token ${sessionStorage.getItem("user_token")}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          }).then((response) => {
            if (response.status === 200) {
              response.json().then(function (result) {
                console.log(result);
                setCategoryName(result.title)
                setEditCategory(false);
                // window.location.reload();
              });
            } else {
              console.log(response);
            }
          });
        }
      };

  return (

      <div className="add-course-content">
            <div className="course-name-section">
              <ul style={{ paddingLeft: "10px" }}>
                {categoryData &&
                  categoryData.map((category) => {
                    return (
                      <div key={category.id}>
                        <li style={{ fontWeight: "bold"}}>
                          <a
                            role="button"
                            onClick={() => {
                              setCategoryTitle(category.title);
                              setCategoryId(category.id)
                              setParentCat(category.parent);
                              getNameOfCourses(category.id);
                              setCategoryName(category.title)                            }}
                          >
                            {category.title}
                          </a>
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>
            <div className="category-form-section">
              <div className="offcanvas-head category-content-heading">
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
                <div
                  className=""
                  style={{ display: "flex", flexDirection: "column" }}
                  onMouseEnter={() => setShowEditBtn(true)}
                  onMouseLeave={() => setShowEditBtn(false)}
                >
                  <label className="mb-0">
                    Category Name<span style={{ color: "red" }}>*</span>
                  </label>
                  {editCategory ? (
                    <input
                      type="text"
                      placeholder="Module Title"
                      value={categoryTitle}
                      style={{ width: "99%" }}
                      className="course-title mb-2"
                      onChange={(e) => {
                        handleCategoryName(e);
                      }}
                      required
                      onKeyDown={(e) => handleUpdateTitle(e)}
                      onContextMenu={(e) => handleUpdateTitle(e)}
                    />
                  ) : (
                    <span style={{ width: "" }} className="course-title mb-2">
                      {categoryTitle}
                      {showEditBtn && (
                        <i
                          className="bi bi-pencil ms-2 module-edit-btn"
                          onClick={() => setEditCategory(true)}
                        ></i>
                      )}
                    </span>
                  )}
                </div>

                <div className={"teamListSection"}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th
                          className="category-table-heading"
                          style={{ borderTop: "none" }}
                        >
                          Name
                        </th>
                        <th
                          className="category-table-heading"
                          style={{ borderTop: "none" }}
                        >
                          Parent Category
                        </th>
                        <th
                          className="category-table-heading"
                          style={{ borderTop: "none" }}
                        >
                          Courses
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={"borderLess"}>
                        <td className={"borderLess"}>
                          <span>{categoryName}</span>
                        </td>
                        <td className={"borderLess"}>
                          {/* <span className="label-tag">{parentCat.slice(0,1).toUpperCase()+ parentCat.slice(-1).toUpperCase()}</span> */}
                          <span>{getCategoryName(parentCat)}</span>
                        </td>
                        <td className={"borderLess"}>
                          {categoryCourses &&
                            categoryCourses.map((course, index) => {
                              return (
                                <tr
                                  key={course.id}
                                  className={"borderLess w-100"}
                                >
                                  <td className={"borderLess"}>
                                    {course.title}
                                  </td>
                                </tr>
                              );
                            })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
  )
}

export default SingleCategory

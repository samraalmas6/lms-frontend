import React, { useEffect, useRef, useState } from "react";
import courseData from "../../hooks/courseData";
import { Editor } from "@tinymce/tinymce-react";
import CreateCourse from './CreateCourse'

const AllCourse = () => {
  const [showBlock, setShowBlock] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [category, setCategory] = useState("");



  const handleCategoryTitle = (e) => {
    setCategoryTitle(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (categoryTitle) {
      const obj = {
        id: courseData[courseData.length - 1].id + 1,
        course_title: categoryTitle,
        author: "",
        duration: 25,
        users_enrolled: 0,
        last_updated: "3 hours ago",
      };
      courseData.push(obj);
    }
    setCategory("");
    setCategoryTitle("");
  };

  // console.log(process.env.REACT_APP_API_KEY);

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
          >
            <i className="fas fa-solid fa-plus"></i> Add Category
          </button>
          {/* This is for Category panel */}
        </div>
        <div
          className="offcanvas offcanvas-end"
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
                  value={categoryTitle}
                  onChange={handleCategoryTitle}
                  required
                />
                <label className="mb-0 mt-1">Category</label>
                <select onChange={handleCategory} value={category}>
                  <option value="">--Select Category--</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                  <option value="Category 4">Category 4</option>
                  <option value="Category 5">Category 5</option>
                </select>
                <div className="category-save-btn">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
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
          <CreateCourse  courseData={ courseData } />
          {/* <div className="offcanvas-body">
            <div className="add-course-content">
              <div className="course-name-section">
                <ul>
                  {courseData.map((course) => {
                    return (
                      <div key={course.id}>
                        <li>
                          <a role="button">{course.course_title}</a>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
              <div className="course-form-section">
                <div className="offcanvas-head">
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
                <form>
                  <label className="mb-0">
                    Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <input type="text" value={""} onChange={""} required />
                  <label className="mb-0 mt-1">Description</label>
                  <Editor
                    apiKey={process.env.REACT_APP_API_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue=""
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        // "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                  <div className="category-save-btn">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
        </div>
        {!showBlock ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Course Title</th>
                <th scope="col">Author</th>
                <th scope="col">Duration</th>
                <th scope="col">Users Enrolled</th>
                <th scope="col">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {courseData.map((course) => {
                return (
                  <tr
                    key={course.id}
                    role="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                  >
                    <td >{course.course_title}</td>
                    <td>{course.author}</td>
                    <td>{course.duration}</td>
                    <td>{course.users_enrolled}</td>
                    <td>{course.last_updated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
          // <div className="userCard">
          //   {courseData.map((user) => {
          //     return (
          //       <div className="card userBlockCard" key={user.id}>
          //         <img
          //           src={userImg}
          //           className="card-img-top userCardImg"
          //           alt="LMS User"
          //         />
          //         <div className="card-body blockCardBody">
          //           <p className="card-text p-0 m-0">{user.name}</p>
          //           <p className="card-text p-0 m-0">{user.Role}</p>
          //         </div>
          //       </div>
          //     );
          //   })}
          // </div>
        )}
      </div>
    </div>
  );
};

export default AllCourse;

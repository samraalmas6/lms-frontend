import React, { useEffect, useRef, useState } from "react";
import courseData from "../../hooks/courseData";
import CourseModule from "./CourseModule";
import img from "../../content/Images/uploadImg.jpg";
import { Editor } from "@tinymce/tinymce-react";
import CreateCourse from "./CreateCourse";

const AllCourse = ({ show }) => {
  //   Create Course Section

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  const inpRef = useRef("");

  const [courseTitle, setCourseTitle] = useState("");
  const [courseStart, setCourseStart] = useState(minDate);
  const [courseEnd, setCourseEnd] = useState("2025-12-30");
  const [courseImg, setCourseImg] = useState("");
  const [uploadImg, setUploadImg] = useState("");

  const [showModule, setShowModule] = useState(false);
  const [moduleData, setModuleData] = useState([]);

  const editorRef = useRef(null);

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };
  const handleCourseStart = (e) => {
    setCourseStart(e.target.value);
  };
  const handleCourseEnd = (e) => {
    setCourseEnd(e.target.value);
  };

  const handlImgClick = () => {
    inpRef.current.click();
  };
  const handleCourseImg = (e) => {
    const file = e.target.files[0];
    if (file !== "undefined") {
      setCourseImg(file);
      setUploadImg(() => e.target.files[0]);
    }

    console.log(file);
  };

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
          {/* <CreateCourse courseData={courseData} /> */}

          <div className="offcanvas-body">
            <div className="add-course-content">
              <div className="course-name-section">
                <ul style={{ paddingLeft: "10px" }}>
                  {courseData &&
                    courseData.map((course) => {
                      return (
                        <div key={course.id}>
                          <li>
                            <a
                              role="button"
                              onClick={() => {
                                setCourseTitle(course.course_title);
                              }}
                            >
                              {course.course_title}
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
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={handleCourseTitle}
                    required
                    className="course-title"
                  />
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
                  <div className="thumb-section">
                    <span className="choose-img">Choose Image</span>
                    <div
                      className="upload-image-section"
                      onClick={handlImgClick}
                    >
                      {uploadImg ? (
                        <img src={URL.createObjectURL(uploadImg)} alt="" />
                      ) : (
                        <img src={img} alt="" />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={inpRef}
                      accept="image/jpg, image/png, image/jpeg"
                      onChange={handleCourseImg}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="category-section">
                    <label className="mb-0 mt-1">Category</label>
                    <select onChange={handleCategory} value={category}>
                      <option value="">--Select Category--</option>
                      <option value="Category 1">Category 1</option>
                      <option value="Category 2">Category 2</option>
                      <option value="Category 3">Category 3</option>
                      <option value="Category 4">Category 4</option>
                      <option value="Category 5">Category 5</option>
                    </select>
                  </div>

                  <div className="course-module-section">
                    <ul>
                      {moduleData &&
                        moduleData.map((module) => {
                          return (
                            <div key={module.moduleTitle}>
                              <li>{module.moduleTitle}</li>
                            </div>
                          );
                        })}
                    </ul>

                    <div>
                    {showModule && (
                        <CourseModule
                          setModuleData={setModuleData}
                          setShowModule={setShowModule}
                          minDate={minDate}
                        />
                      )}
                      <button
                        type="button"
                        className="btn w-50 add-module-btn"
                        onClick={() => setShowModule((pre) => !pre)}
                      >
                        Add Module
                        <i className="fas fa-solid fa-plus ms-2"></i>
                      </button>
                     
                    </div>
                  </div>
                  <div className="category-save-btn">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={"handleSave"}
                    >
                      Save Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
                    onClick={() => {
                      setCourseTitle(course.course_title);
                    }}
                  >
                    <td>{course.course_title}</td>
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
        )}
      </div>
    </div>
  );
};

export default AllCourse;

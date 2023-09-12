import React, { useEffect, useRef, useState } from "react";
import courseData from "../../hooks/courseData";
import CourseModule from "./CourseModule";
import img from "../../content/Images/uploadImg.jpg";
import { Editor } from "@tinymce/tinymce-react";
import catData from "../../hooks/catData";

const AllCourse = ({
  show,
  courseTitle,
  setCourseTitle,
  courseCategory,
  setCourseCategory,
  courseImg,
  setCourseImg,
  minDate,
  unitData,
  setUnitData,
  moduleData,
  setModuleData
}) => {
  //   Create Course Section
  const inpRef = useRef("");
  const [showBlock, setShowBlock] = useState(false);
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDes, setCourseDes] = useState("");
  const [visibility, setVisibility] = useState(false)

  const [showModule, setShowModule] = useState(false);
  // const [moduleData, setModuleData] = useState([]);

  const editorRef = useRef(null);

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handlecourseCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const handleDescription = (value, e) => {
    setCourseDes(value);
    setCourseDescription(e.getContent({ format: "text" }));
    // console.log(courseDes)
  };

  const handlImgClick = () => {
    inpRef.current.click();
  };
  const handleCourseImg = (e) => {
    const file = e.target.files[0];
    if (file !== "undefined") {
      setCourseImg(file);
    }
    console.log(courseImg);
  };
  const handleVisibility = (e) => {
    setVisibility(e.target.value)
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (courseTitle) {
      const obj = {
        id: courseData[courseData.length - 1].id + 1,
        course_title: courseTitle,
        author: "",
        duration: 25,
        users_enrolled: 0,
        last_updated: "3 hours ago",
      };
      courseData.push(obj);
    }
    setCourseCategory("");
    setCourseTitle("");
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
                <label className="mb-0 mt-1">Category</label>
                <select onChange={handlecourseCategory} value={courseCategory}>
                  <option value="">--Select Category--</option>
                  {catData &&
                    catData.map((category) => {
                      return (
                        <option value={category.name} key={category.id}>
                          {category.name}
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
                    // value={courseDescription}
                    onEditorChange={(value, evt) =>
                      handleDescription(value, evt)
                    }
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
                      {courseImg ? (
                        <img src={URL.createObjectURL(courseImg)} alt="" />
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
                    <select
                      onChange={handlecourseCategory}
                      value={courseCategory}
                    >
                      <option value="">--Select Category--</option>
                      {catData &&
                        catData.map((category) => {
                          return (
                            <option value={category.name} key={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="form-check form-switch visibility">
                    <label
                      htmlFor="IsActive"
                      className=" course-unit-form-label"
                    >
                      Course Visibility
                    </label>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      value={visibility}
                      onChange={handleVisibility}
                      id="flexSwitchCheckDefault"
                    />
                  </div>
                  <div className="course-module-section">
                    {/* <ul>
                      {moduleData &&
                        moduleData.map((module) => {
                          return (
                            <div key={module.moduleTitle}>
                              <li>{module.moduleTitle}</li>
                            </div>
                          );
                        })}
                    </ul> */}

                    <div>
                      {showModule && (
                        <CourseModule
                          // setModuleData={setModuleData}
                          setShowModule={setShowModule}
                          minDate={minDate}
                          unitData={unitData}
                          setUnitData={setUnitData}
                          moduleData={moduleData}
                          setModuleData={setModuleData}
                        />
                      )}
                      { !showModule && <button
                        type="button"
                        className="btn w-50 add-module-btn"
                        onClick={() => setShowModule((pre) => !pre)}
                      >
                        Add Module
                        <i className="fas fa-solid fa-plus ms-2"></i>
                      </button> }
                      
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

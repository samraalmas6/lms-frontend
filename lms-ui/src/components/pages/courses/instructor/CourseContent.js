import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import CourseModule from "./CourseModule";
import img from "../../../content/Images/uploadImg.jpg";
import catData from "../../../hooks/catData";
import { useNavigate } from "react-router-dom";

const CourseContent = ({
  courseTitle,
  setCourseTitle,
  courseCategory,
  setCourseCategory,
  courseImg,
  setCourseImg,
  moduleData,
  setModuleData,
  courseContent,
  courseId
}) => {
  const navigate = useNavigate();
  const inpRef = useRef("");
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [courseStart, setCourseStart] = useState("");
  const [courseEnd, setCourseEnd] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDes, setCourseDes] = useState("");
  const [visibility, setVisibility] = useState(false);
  // const [course, setCourse] = useState([courseData[0]]);

  const [showModule, setShowModule] = useState(false);

  const [showModuleContent, setShowModuleContent] = useState("");

  // const [moduleData, setModuleData] = useState([]);

  const editorRef = useRef(null);

  const showModuleList = () => {
    setShowModuleContent(() => "show");
  };

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handlCourseStart = (e) => {
    startDateRef.current.removeAttribute("class", "course-start-field");
    startDatePickerRef.current.setAttribute("class", "course-start-field");
    setCourseStart(e.target.value);
  };
  const handlCourseEnd = (e) => {
    endDateRef.current.removeAttribute("class", "course-end-field");
    endDatePickerRef.current.setAttribute("class", "course-end-field");
    setCourseEnd(e.target.value);
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
    setVisibility(e.target.value);
  };

  const handleCourseContent = (course) => {
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

    // setCourse(() => course);
    // setModuleData(() => course.modules);
    setCourseTitle(() => course.course_title);
    setCourseDes(`<p>${course.description}</p>`);
    setCourseCategory(course.category);
    // setCourseImg(course.picture)
    setVisibility(() => course.visibility);
  };

  //   const handleModuleContent = (module) => {
  //     fetch(`http://127.0.0.1:8000/api/modules/${module.id}/units`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Token ${sessionStorage.getItem("user_token")}`,
  //       },
  //     }).then((response) => {
  //       response.json().then(function (result) {
  //         console.log("Api result: ", result);
  //         setUnitData(result);
  //       });
  //     });
  //   };

  return (
    <div>
      <div className="add-course-content">
        <div className="course-name-section">
          <ul style={{ paddingLeft: "10px" }}>
            {courseContent.length === 0 ||
            courseContent.detail == "No objects found"
              ? courseContent.detail
              : courseContent &&
                courseContent.map((course) => {
                  return (
                    <div key={course.id}>
                      <li
                        role="button"
                        onClick={() => {
                          handleCourseContent(course);
                        }}
                      >
                        {course.title}
                      </li>
                    </div>
                  );
                })}
          </ul>
        </div>
        <div className="course-form-section">
          {/* <div className="" style={{ display: 'flex', justifyContent: 'end'}}>
                    <button
                      type="button"
                      className="btn-close ms-3"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div> */}
          <div className="offcanvas-head course-heading">
            <div className="course-heading-section">
              <input
                type="text"
                value={courseTitle}
                onChange={handleCourseTitle}
                required
                className="courseTitle"
              />
              <label>Start Date:</label>
              <i
                class="bi bi-calendar-date date-picker"
                role="button"
                ref={startDatePickerRef}
                onClick={() => startDateRef.current.showPicker()}
              ></i>
              <input
                type="date"
                value={courseStart}
                className="course-start-field"
                ref={startDateRef}
                id="course-date-field"
                onChange={(e) => handlCourseStart(e)}
              />
              <label>End Date:</label>
              <i
                class="bi bi-calendar-date date-picker"
                role="button"
                ref={endDatePickerRef}
                onClick={() => endDateRef.current.showPicker()}
              ></i>
              <input
                type="date"
                value={courseEnd}
                onChange={(e) => handlCourseEnd(e)}
                className="course-end-field"
                id="course-date-field"
                ref={endDateRef}
              />
            </div>

            <div class="btn-group dropstart">
              <i
                className="bi bi-three-dots-vertical "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => null}
              ></i>
              <button
                type="button"
                className="btn-close ms-3"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
              <div className="dropdown-menu option-main-container">
                <ul class="option-ul" style={{ display: "flex" }}>
                  <li>
                    <div className="form-check form-switch visibility">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        role="switch"
                        value={visibility}
                        onChange={handleVisibility}
                        id="flexSwitchCheckDefault"
                      />
                    </div>
                  </li>
                  <li>
                    <i
                      className="bi bi-trash text-danger"
                      onClick={() => null}
                    ></i>
                  </li>
                  <li>
                    <i class="bi bi-copy text-info"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <form>
            <div className="thumb-section">
              <div className="editor">
                <label className="mb-0 mt-1">Description</label>
                <Editor
                  apiKey={process.env.REACT_APP_API_KEY}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue=""
                  value={courseDes}
                  onEditorChange={(value, evt) => handleDescription(value, evt)}
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
              </div>
              <div className="coverImage">
                <span className="choose-img">Upload Image</span>
                <div className="upload-image-section" onClick={handlImgClick}>
                  {courseImg ? (
                    <img
                      src={URL.createObjectURL(courseImg)}
                      alt=""
                      width="300"
                      height="300"
                      className=""
                    />
                  ) : (
                    <img src={img} />
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
            </div>
            <div className="category-section">
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
            </div>
            <div className="form-check form-switch visibility">
              <label htmlFor="IsActive" className=" course-unit-form-label">
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
            <hr style={{ margin: "20px 0px 20px 0px" }} />
            <div className="course-module-section">
              <CourseModule moduleData={moduleData} courseId={courseId} />
            </div>
            <div className="category-save-btn">
              <button
                type="submit"
                className="btn btn-primary"
                //   onClick={handleSaveCourse}
              >
                Save Course
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;

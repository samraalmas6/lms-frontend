import { Editor } from "@tinymce/tinymce-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import CourseModule from "./CourseModule";
import img from "../../../content/Images/uploadImg.jpg";
import { useNavigate } from "react-router-dom";
import { CourseProbs } from "./AllCourses";


const CourseContent = ({
  courseTitle,
  setCourseTitle,
  courseCategory,
  setCourseCategory,
  courseImg,
  setCourseImg,
  moduleData,
  categoryData,
  setModuleData,
  courseContent,
  setCourseId,
  visibility,
  setVisibility,
  courseDes,
  setCourseDes,
  userData,
}) => {
  const navigate = useNavigate();
  const { courseId, courseCoauthors, setCourseCoauthors, courseCreator } = useContext(CourseProbs);
  const inpRef = useRef("");
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [courseStart, setCourseStart] = useState("");
  const [courseEnd, setCourseEnd] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coAuthor, setCoAuthor] = useState("");
  const [coAuthors, setCoAuthors] = useState(courseCoauthors)
  const [coAutherData, setCoAuthorData] = useState([])

  // const [course, setCourse] = useState([courseData[0]]);

  console.log("this is visibility", visibility);
  const [showModule, setShowModule] = useState(false);

  const [showModuleContent, setShowModuleContent] = useState("");

  // const [moduleData, setModuleData] = useState([]);

  const editorRef = useRef(null);

  useEffect(() => {
    setCoAuthors(courseCoauthors)
    const getCoAuthorsData = () => {
      const coAuthors = userData.filter((user) => {
        return courseCoauthors.includes(user.id);
      });
      setCoAuthorData(coAuthors)
    };
    getCoAuthorsData();
  },[courseCoauthors]);

  const showModuleList = () => {
    setShowModuleContent(() => "show");
  };

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handlCourseStart = (e) => {
    startDateRef.current.removeAttribute("className", "course-start-field");
    startDatePickerRef.current.setAttribute("className", "course-start-field");
    setCourseStart(e.target.value);
  };
  const handlCourseEnd = (e) => {
    endDateRef.current.removeAttribute("className", "course-end-field");
    endDatePickerRef.current.setAttribute("className", "course-end-field");
    setCourseEnd(e.target.value);
  };

  const handlecourseCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const handleCoAuthor = (e) => {
    setCoAuthor(e.target.value);
    setCourseCoauthors(pre => [...pre, +e.target.value])
  };
console.log('this is co-authors:',courseCoauthors);
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
    // setVisibility(e.target.value);
    setVisibility(!visibility);
    const active = e.target.value;
    const obj = {
      title: courseTitle,
      author: sessionStorage.getItem("user_id"),
      updated_by: sessionStorage.getItem("user_id"),
      category: courseCategory,
      is_active: !visibility,
      created_by: sessionStorage.getItem('user_id')
    };
    fetch(`http://127.0.0.1:8000/api/courses/${courseId}/`, {
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
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleCourseContent = (course) => {
    setCourseId(course.id);
    setCourseTitle(course.title);
    setCourseCategory(course.category);
    setCourseStart(course.start_date);
    setCourseEnd(course.end_date);
    setCourseImg(course.course_image);
    setCourseDes(`<p>${course.description}</p>`);
    setVisibility(() => course.is_active);

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

  const getFirstAndLastName = (coAuthors) => {
    const { first_name, last_name } = coAuthors;
    const name = `${first_name.slice(0, 1)}${last_name.slice(0, 1)}`;
    return name.toUpperCase();
  };

  const handleSaveCourse = () => {
    if (courseTitle && courseCategory) {
      const formData = new FormData();
      if (typeof(courseImg) === "object" && courseImg) {
        formData.append("course_image", courseImg);
      }
      formData.append("title", courseTitle);
      formData.append("description", courseDescription);
      formData.append("start_date", courseStart);
      formData.append("end_date", courseEnd);
      formData.append("category", [courseCategory]);
      formData.append("updated_by", sessionStorage.getItem("user_id"));
      formData.append("created_by", courseCreator);
      console.log('Post Coauthors:', courseCoauthors);
      courseCoauthors.forEach(id => {
        formData.append("editor", id);
      });
      fetch(`http://127.0.0.1:8000/api/courses/${courseId}/`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          // "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 200) {
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
                className="bi bi-calendar-date date-picker"
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
                className="bi bi-calendar-date date-picker"
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

            <div className="btn-group dropstart">
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
                <ul className="option-ul" style={{ display: "flex" }}>
                  <li>
                    <div className="form-check form-switch visibility">
                      <input
                        className="form-check-input "
                        type="checkbox"
                        role="switch"
                        checked={visibility}
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
                    <i className="bi bi-copy text-info"></i>
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
                      // src={URL.createObjectURL(courseImg)}
                      src={courseImg}
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
              <div className="dropdown-section-for-cat-couthor">
                <div className="category-section me-2">
                  <label className="mb-0 mt-1">Category</label>
                  <select
                    onChange={handlecourseCategory}
                    value={courseCategory}
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
                </div>
              </div>
            </div>

            <div className="coauthor-section me-2">
              <label className="mb-0 mt-1">Co-Author</label>
              <select onChange={(e) => handleCoAuthor(e)} value={coAuthor}>
                <option value="">--Select Co-Author--</option>
                {userData.length !== 0 &&
                  userData.map((user) => {
                    if (user.role === "instructor") {
                      return (
                        <option value={user.id} key={user.id}>
                          {`${user.first_name} ${user.last_name}`}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
              </select>
            </div>
            <div className="coauther-selection">
              <ul className="coauthor-list-section">
                {coAutherData &&
                  coAutherData.map((coAuthor, index) => {
                    if(index === 0){
                      return null
                    }
                    return (
                      <li key={coAuthor.id} style={{ display: "flex" }}>
                        <div
                          className={`coauthor-name-icon coauthor-name-icon${index}`}
                        >
                          {getFirstAndLastName(coAuthor)}
                        </div>
                        <div className="coauthor-name-section ms-3">
                          <strong>{`${coAuthor.first_name} ${coAuthor.last_name}`}</strong>
                        </div>
                        <div className="coauthor-remove-icon ms-5">
                          <i className="bi bi-trash text-warining"></i>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* <div className="form-check form-switch visibility">
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
            </div> */}
            <hr style={{ margin: "20px 0px 20px 0px" }} />
            <div className="course-module-section">
              <CourseModule
                moduleData={moduleData}
                setModuleData={setModuleData}
                courseId={courseId}
              />
            </div>
            <div className="category-save-btn">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSaveCourse()}
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

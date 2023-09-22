import React, { useEffect, useRef, useState } from "react";
import courseData from "../../hooks/courseData";
import CourseModule from "./CourseModule";
import img from "../../content/Images/uploadImg.jpg";
import { Editor } from "@tinymce/tinymce-react";
import catData from "../../hooks/catData";
import { useNavigate } from "react-router-dom";
import UpdateUnit from "./UpdateUnit";

const AllCourse = ({
  show,
  courseTitle,
  setCourseTitle,
  courseCategory,
  setCourseCategory,
  courseImg,
  setCourseImg,
  minDate,
}) => {
  //   Create Course Section
  const navigate = useNavigate();
  const inpRef = useRef("");
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const startDateRefModule = useRef(null);
  const endDateRefModule = useRef(null);
  const startDatePickerRefModule = useRef(null);
  const endDatePickerRefModule = useRef(null);
  const startDateRefUnit = useRef(null);
  const endDateRefUnit = useRef(null);
  const startDatePickerRefUnit = useRef(null);
  const endDatePickerRefUnit = useRef(null);
  const [showBlock, setShowBlock] = useState(false);
  const [courseStart, setCourseStart] = useState("");
  const [courseEnd, setCourseEnd] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDes, setCourseDes] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [courseContent, setCourseContent] = useState([]);
  const [course, setCourse] = useState([courseData[0]]);

  const [showModule, setShowModule] = useState(false);
  const [moduleContent, setModuelContent] = useState([]);
  const [showModuleContent, setShowModuleContent] = useState("");


  // const [moduleData, setModuleData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [unitStart, setUnitStart] = useState("");
  const [unitEnd, setUnitEnd] = useState("");

  const [moduleData, setModuleData] = useState([]);

  const editorRef = useRef(null);

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
      // setCourseContent(courseData);
    };

    getCourseData();
  }, [0]);

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

  const handlUnitStart = (e) => {
    startDateRefUnit.current.removeAttribute("class", "unit-start-field");
    startDatePickerRefUnit.current.setAttribute("class", "unit-start-field");
    setUnitStart(e.target.value);
  };
  const handlUnitEnd = (e) => {
    endDateRefUnit.current.removeAttribute("class", "unit-end-field");
    endDatePickerRefUnit.current.setAttribute("class", "unit-end-field");
    setUnitEnd(e.target.value);
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

    setCourse(() => course);
    // setModuleData(() => course.modules);
    setCourseTitle(() => course.course_title);
    setCourseDes(`<p>${course.description}</p>`);
    setCourseCategory(course.category);
    // setCourseImg(course.picture)
    setVisibility(() => course.visibility);
  };

  const handleModuleContent = (module) => {
    fetch(`http://127.0.0.1:8000/api/modules/${module.id}/units`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      response.json().then(function (result) {
        console.log("Api result: ", result);
        setUnitData(result);
      });
    });
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (courseTitle && courseCategory) {
      const obj = {
        title: courseTitle,
        description: "Test Description",
        // categories: 1,
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
  const handleSaveCourse = (e) => {
    e.preventDefault();

    // const obj = {
    //   course_title: courseTitle,
    //   course_description: courseDescription,
    //   picture: courseImg,
    //   category: courseCategory,
    //   visibility,
    //   modules: moduleData
    // }
    // setCourseContent(() => [...courseContent])
    // console.log(obj);
  };
  // console.log("module Content", moduleData);
  // console.log('Course Content',course);
  // console.log('course Content',courseData);
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
        </div>
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
                <label className="mb-0 mt-1">Category</label>
                <select
                  onChange={handlecourseCategory}
                  value={courseCategory}
                  required
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
                  {courseContent &&
                    courseContent.map((course) => {
                      return (
                        <div key={course.id}>
                          <li
                            role="button"
                            onClick={() => {
                              // handleCourseContent(course.id);
                              handleCourseContent(course);
                              // setCourseTitle(course.course_title);
                              // fun(course.id)
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
                  {/* <label className="mb-0">
                    Title<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={handleCourseTitle}
                    required
                    className="course-title"
                  /> */}

                  <div className="thumb-section">
                    <div className="editor">
                      <label className="mb-0 mt-1">Description</label>
                      <Editor
                        apiKey={process.env.REACT_APP_API_KEY}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue=""
                        value={courseDes}
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
                    </div>
                    <div className="coverImage">
                      <span className="choose-img">Upload Image</span>
                      <div
                        className="upload-image-section"
                        onClick={handlImgClick}
                      >
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
                  <hr style={{ margin: "20px 0px 20px 0px" }} />
                  <div className="course-module-section">
                    <div className="unitData-section">
                      <div
                        className="accordion accordion-flush w-100"
                        id="module-section"
                      >
                        {moduleData.length === 0 ||
                        moduleData.detail == "No module found for this course."
                          ? moduleData.detail
                          : moduleData &&
                            moduleData.map((module) => {
                              return (
                                <div
                                  key={module.id}
                                  type="button"
                                  className="accordion-item mb-1"
                                  role="button"
                                  aria-expanded="false"
                                  onClick={() => {
                                    // showModuleList();
                                    // setUnitContent(unit)
                                    handleModuleContent(module);
                                    setModuelContent(module);
                                  }}
                                >
                                  <h2
                                    className="accordion-header module-collapse-button"
                                    id={`flush-module${module.id}`}
                                  >
                                    <div
                                      className="accordion-button collapsed module-button"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#module${module.id}`}
                                      aria-expanded="false"
                                      aria-controls={`flush-module${module.id}`}
                                    >
                                      <div className="module-heading-container">
                                      <div className="">
                                      <span className="me-3">MODULE</span>
                                      <input
                                        type="text"
                                        placeholder="Module Title"
                                        value={module.title}
                                        className="moduleTitle"
                                        // onChange={"handleModuleTitle"}
                                        required
                                      />
                                      </div>
                                      <div className="">
                                      <label>Start Date:</label>
                                      <i
                                        class="bi bi-calendar-date date-picker"
                                        role="button"
                                        ref={startDatePickerRef}
                                        onClick={() =>
                                          startDateRef.current.showPicker()
                                        }
                                      ></i>
                                      <input
                                        type="date"
                                        value={module.start_date}
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
                                        onClick={() =>
                                          endDateRef.current.showPicker()
                                        }
                                      ></i>
                                      <input
                                        type="date"
                                        value={module.end_date}
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
                                      <div className="dropdown-menu option-main-container module-option">
                                        <ul
                                          class="option-ul"
                                          style={{ display: "flex" }}
                                        >
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
                                  </div>

                                  </h2>
                                  <div
                                    id={`module${module.id}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`flush-module${module.id}`}
                                    data-bs-parent="#module-section"
                                  >
                                    <div className="accordion-body">
                                      <div
                                        className="accordion accordion-flush"
                                        id="unit-section"
                                      >
                                        {/* <h1 className="text-center rounded unit-list-heading" >Units</h1> */}
                                        {unitData.length === 0 ||
                                        unitData.detail ==
                                          "No unit found for this module."
                                          ? unitData.detail
                                          : unitData &&
                                            unitData.map((unit) => {
                                              return (
                                                <div
                                                  key={unit.id}
                                                  type="button"
                                                  className="accordion-item mb-1 unitSection"
                                                  role="button"
                                                  aria-expanded="false"
                                                  onClick={() => {
                                                    // showModuleList();
                                                    // setUnitContent(unit)
                                                    // handleModuleContent(module);
                                                    // setModuelContent(module);
                                                  }}
                                                >
                                                  <h2
                                                    className="accordion-header unit-collapse-button"
                                                    id={`flush-unit${unit.id}`}
                                                  >
                                                    <div
                                                      className="accordion-button collapsed unit-button"
                                                      type="button"
                                                      data-bs-toggle="collapse"
                                                      data-bs-target={`#unit${unit.id}`}
                                                      aria-expanded="false"
                                                      aria-controls={`flush-unit${unit.id}`}
                                                    >
 <div className="module-heading-container">
                                      <div className="">
                                      <span className="me-3">Unit</span>
                                      <input
                                        type="text"
                                        placeholder="Unit Title"
                                        value={unit.title}
                                        className="unitTitle"
                                        required
                                      />
                                      </div>
                                      <div className="">
                                      <label>Start Date:</label>
                                      <i
                                        class="bi bi-calendar-date date-picker"
                                        role="button"
                                        ref={startDatePickerRefUnit}
                                        onClick={() =>
                                          startDateRefUnit.current.showPicker()
                                        }
                                      ></i>
                                      <input
                                        type="date"
                                        value={unitStart}
                                        className="unit-start-field"
                                        ref={startDateRefUnit}
                                        id="unit-date-field"
                                        onChange={(e) => handlUnitStart(e)}
                                      />
                                      <label>End Date:</label>
                                      <i
                                        class="bi bi-calendar-date date-picker"
                                        role="button"
                                        ref={endDatePickerRefUnit}
                                        onClick={() =>
                                          endDateRefUnit.current.showPicker()
                                        }
                                      ></i>
                                      <input
                                        type="date"
                                        value={unitEnd}
                                        onChange={(e) => handlUnitEnd(e)}
                                        className="unit-end-field"
                                        id="unit-date-field"
                                        ref={endDateRefUnit}
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
                                      <div className="dropdown-menu option-main-container module-option">
                                        <ul
                                          class="option-ul"
                                          style={{ display: "flex" }}
                                        >
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
                                                    </div>
                                                   
                                                  </h2>
                                                  <div
                                                    id={`unit${unit.id}`}
                                                    className="accordion- collapse"
                                                    aria-labelledby={`flush-unit${unit.id}`}
                                                    data-bs-parent="#unit-section"
                                                  >
                                                    <div className="accordion-body">
                                                      {/* <UpdateUnit
                                                        unitContent={unit}
                                                        minDate={minDate}
                                                        setUnitData={
                                                          setUnitData
                                                        }
                                                      /> */}
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                      </div>
                    </div>
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
                          showModuleContent={showModuleContent}
                          setShowModuleContent={setShowModuleContent}
                          moduleContent={moduleContent}
                          setModuelContent={setModuelContent}
                        />
                      )}
                      {!showModule && (
                        <button
                          type="button"
                          className="btn w-50 add-module-btn"
                          onClick={() => setShowModule((pre) => !pre)}
                        >
                          Add Module
                          <i className="fas fa-solid fa-plus ms-2"></i>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="category-save-btn">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleSaveCourse}
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
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">Users Enrolled</th>
                <th scope="col">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {courseContent.map((course) => {
                return (
                  <tr
                    key={course.id}
                    role="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                    onClick={() => {
                      handleCourseContent(course);
                      // handleCourseContent(course.id);
                      setCourseTitle(course.title);
                      // fun(course.id)
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AllCourse;

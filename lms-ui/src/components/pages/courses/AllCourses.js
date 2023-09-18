import React, { useEffect, useRef, useState } from "react";
import courseData from "../../hooks/courseData";
import CourseModule from "./CourseModule";
import img from "../../content/Images/uploadImg.jpg";
import { Editor } from "@tinymce/tinymce-react";
import catData from "../../hooks/catData";
import { useNavigate } from "react-router-dom";

const AllCourse = ({
  show,
  courseTitle,
  setCourseTitle,
  courseCategory,
  setCourseCategory,
  courseImg,
  setCourseImg,
  minDate,
  // unitData,
  // setUnitData,
  // moduleData,
  // setModuleData,
}) => {
  //   Create Course Section
  const navigate = useNavigate();
  const inpRef = useRef("");
  const [showBlock, setShowBlock] = useState(false);
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
  const [moduleData, setModuleData] = useState([]);

  const editorRef = useRef(null);

  useEffect(() => {
    const getCourseData = () => {
      fetch("http://127.0.0.1:8000/api/courses", {
        method: "GET",
        headers: {
          Authorization: `Token 39d67e21dcd82c5ad6c98a1024fa1fdd0a484c61`,
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
        Authorization: `Token 39d67e21dcd82c5ad6c98a1024fa1fdd0a484c61`,
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
        Authorization: `Token 39d67e21dcd82c5ad6c98a1024fa1fdd0a484c61`,
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
          Authorization: `Token 39d67e21dcd82c5ad6c98a1024fa1fdd0a484c61`,
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

  // const fun = (id) => {
  //   const particularCourse = courseContent.filter((course) => {
  //     return course.id === id;
  //   });
  //   setCourse(() => particularCourse);
  //   console.log(course[0]);
  // };
  const updatedCourse = {
    id: 1, // Specify the ID of the course you want to update
    course_title: courseTitle,
    course_description: courseDescription,
    picture: courseImg,
    category: courseCategory,
    visibility,
    modules: [
      //  ...course.modules, moduleData[0]
    ],
    // [
    // moduleData.map((module) => {
    //   return module.id === 1
    //   ? { ...module, ...updatedCourse }
    //   : module
    // })
    // {
    //   id: 1, // Specify the ID of the module you want to update
    //   title: "Updated Module Title",
    // },
    // ],
    // units: [
    //   {
    //     id: 1, // Specify the ID of the unit you want to update
    //     title: "Updated Unit Title",
    //   },
    // ],
    // Add other fields you want to update
  };
  const handleSaveCourse = (e) => {
    e.preventDefault();

    setCourseContent((prevCourseData) => {
      return prevCourseData.map((course) =>
        course.id === updatedCourse.id
          ? { ...course, ...updatedCourse }
          : course
      );
    });

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
                <div className="offcanvas-head">
                  <h5 className="offcanvas-title" id="offcanvasRightLabel">
                    Add Course Content
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
                  {/* <hr style={{ margin: '0px', width: '53%'}}/> */}
                  <hr style={{ margin: "20px 0px 20px 0px" }} />
                  <div className="course-module-section">
                    {/* <ul>
                      {moduleData &&
                        moduleData.map((module) => {
                          return (
                            <div key={module.title}>
                              <li>{module.title}</li>
                            </div>
                          );
                        })}
                    </ul> */}
                    <div className="unitData-section">
                      <div
                        class="accordion accordion-flush"
                        id="accordionFlushExample"
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
                                  className="accordion-item"
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
                                    class="accordion-header"
                                    id={`flush-${module.id}`}
                                  >
                                    <button
                                      class="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#${module.id}`}
                                      aria-expanded="false"
                                      aria-controls={`flush-${module.id}`}
                                    >
                                      {module.title}
                                    </button>
                                  </h2>
                                  <div
                                    id={module.id}
                                    class="accordion-collapse collapse"
                                    aria-labelledby={`flush-${module.id}`}
                                    data-bs-parent="#accordionFlushExample"
                                  >
                                    <div class="accordion-body">
                                      <div
                                        class="accordion accordion-flush"
                                        id="unit-section"
                                      >
                                        {unitData.length === 0 ||
                                        unitData.detail ==
                                          "No module found for this course."
                                          ? unitData.detail
                                          : unitData &&
                                            unitData.map((unit) => {
                                              return (
                                                <div
                                                  key={unit.id}
                                                  type="button"
                                                  className="accordion-item"
                                                  role="button"
                                                  aria-expanded="true"
                                                  onClick={() => {
                                                    // showModuleList();
                                                    // setUnitContent(unit)
                                                    // handleModuleContent(module);
                                                    // setModuelContent(module);
                                                  }}
                                                >
                                                  <h2
                                                    class="accordion-header"
                                                    id={`flush-${unit.id}`}
                                                  >
                                                    <button
                                                      class="accordion-button collapsed"
                                                      type="button"
                                                      data-bs-toggle="collapse"
                                                      data-bs-target={`#${unit.id}`}
                                                      aria-expanded="false"
                                                      aria-controls={`flush-${unit.id}`}
                                                    >
                                                      {unit.title}
                                                    </button>
                                                  </h2>
                                                  <div
                                                    id={unit.id}
                                                    class="accordion-collapse collapse"
                                                    aria-labelledby={`flush-${unit.id}`}
                                                    data-bs-parent="#accordionFlushExample"
                                                  >
                                                    <div class="accordion-body"></div>
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

                        {/* <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingOne">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne"
                              aria-expanded="false"
                              aria-controls="flush-collapseOne"
                            >
                              Accordion Item #1
                            </button>
                          </h2>
                          <div
                            id="flush-collapseOne"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              Placeholder content for this accordion, which is
                              intended to demonstrate the{" "}
                              <code>.accordion-flush</code> class. This is the
                              first item's accordion body.
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingTwo">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseTwo"
                              aria-expanded="false"
                              aria-controls="flush-collapseTwo"
                            >
                              Accordion Item #2
                            </button>
                          </h2>
                          <div
                            id="flush-collapseTwo"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingTwo"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              Placeholder content for this accordion, which is
                              intended to demonstrate the{" "}
                              <code>.accordion-flush</code> class. This is the
                              second item's accordion body. Let's imagine this
                              being filled with some actual content.
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingThree">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseThree"
                              aria-expanded="false"
                              aria-controls="flush-collapseThree"
                            >
                              Accordion Item #3
                            </button>
                          </h2>
                          <div
                            id="flush-collapseThree"
                            class="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree"
                            data-bs-parent="#accordionFlushExample"
                          >
                            <div class="accordion-body">
                              Placeholder content for this accordion, which is
                              intended to demonstrate the{" "}
                              <code>.accordion-flush</code> class. This is the
                              third item's accordion body. Nothing more exciting
                              happening here in terms of content, but just
                              filling up the space to make it look, at least at
                              first glance, a bit more representative of how
                              this would look in a real-world application.
                            </div>
                          </div>
                        </div> */}
                      </div>

                      {/* {moduleData.length === 0 ||
                      moduleData.detail ==
                        "No module found for this course." ? (
                        moduleData.detail
                      ) : (
                        <ul className="units d-grid gap-2 w-50">
                          {moduleData &&
                            moduleData.map((module) => {
                              return (
                                <li
                                  key={module.id}
                                  type="button"
                                  className="text-start ms-0 ps-2 nav-link dropdown-toggle"
                                  id="navbarDropdown"
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  onClick={() => {
                                    // showModuleList();
                                    // setUnitContent(unit)
                                    handleModuleContent(module);
                                    setModuelContent(module);
                                  }}
                                >
                                  <span>{module.title}</span>
                                  <ul
                                    class="dropdown-menu"
                                    aria-labelledby="navbarDropdown"
                                  >
                                    {unitData &&
                                      unitData.map((unit) => {
                                        return (
                                          <li
                                            key={unit.id}
                                            type="button"
                                            className="text-start ms-0 ps-2"
                                            onClick={() => {
                                              // showUnitList();
                                              // setUnitContent(unit);
                                            }}
                                          >
                                            <span>{unit.title}</span>
                                            <i class="fas fa-solid fa-caret-up"></i>
                                          </li>
                                        );
                                      })}
                                  </ul>
                                </li>
                              );
                            })}
                        </ul>
                      )} */}
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
                      // setCourseTitle(course.course_title);
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

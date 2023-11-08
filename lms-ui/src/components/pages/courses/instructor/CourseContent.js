import { Editor } from "@tinymce/tinymce-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import CourseModule from "./CourseModule";
import img from "../../../content/Images/uploadImg.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { CourseProbs } from "../../../../App";
// import Swal from 'sweetalert2';

const CourseContent = ({}) => {
  const { courseId,setCourseId, instructor,setInstructor, courseCoauthors, setCourseCoauthors, courseCreator } =
    useContext(CourseProbs);
  const userId = sessionStorage.getItem("user_id")
  console.log('course coAuthors:', courseCoauthors);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);
  const [courseContent, setCourseContent] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [moduleData, setModuleData] = useState([]);
  const [moduleCounter, setModuleCounter] = useState(0)
  const [course, setCourse] = useState([]);

  const inpRef = useRef("");
  const editorRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const [courseStart, setCourseStart] = useState("");
  const [courseEnd, setCourseEnd] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coAuthor, setCoAuthor] = useState("");
  const [coAutherData, setCoAuthorData] = useState([]);

  const [courseCategory, setCourseCategory] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseImg, setCourseImg] = useState("");
  const [visibility, setVisibility] = useState();
  const [courseDes, setCourseDes] = useState("");

  useEffect(() => {
    const getModuleData = (id) => {
      fetch(`http://127.0.0.1:8000/api/courses/${id}/modules`, {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Api result: ", result);
            setModuleCounter(result.length)
            // setCourseCoauthors(result[0].editor)
            setCourseId(id)
            const obj = result.filter(module => {
              // setCourse(result.course)
              return module.is_delete === false
            })
            setModuleData(obj);
           
          });
        } else {
          console.log(response);
          setModuleData([]);
        }
      });
    }

    getModuleData(state.course.id);
    setCourse(state.course);
    setCourseContent(state.courseContent);
    setCategoryData(state.categoryData);
    setUserData(state.userData);
  }, [state.course]);

  useEffect(() => {
    setCourseTitle(course.title);
    setCourseStart(course.start_date);
    setCourseEnd(course.end_date);
    setCourseDes(course.description);
    setCourseCategory(course.category);
    setCourseImg(course.course_image);
    setVisibility(course.is_active);
  }, [course]);

  useEffect(() => {
    const getCoAuthorsData = () => {
      setCoAuthorData(courseCoauthors);
    };
    getCoAuthorsData();
  }, [courseCoauthors]);

  const handleCourseTitle = (e) => {
    setCourseTitle(e.target.value);
  };

  const handlCourseStart = (e) => {
    setCourseStart(e.target.value);
  };
  const handlCourseEnd = (e) => {
    setCourseEnd(e.target.value);
  };

  const handlecourseCategory = (e) => {
    setCourseCategory(e.target.value);
  };

  const handleCoAuthor = (e) => {
    setCoAuthor(e.target.value);
    setCourseCoauthors((pre) => [...pre, +e.target.value]);
  };
  console.log("this is co-authors:", courseCoauthors);
  const handleDescription = (value, e) => {
    setCourseDes(value);
    setCourseDescription(e.getContent({ format: "text" }));
    // console.log(courseDes)
  };

  const removeCoAuthor = (id) => {
    const obj = coAutherData.filter((coAuthor) => {
      return coAuthor !== id;
    });
    setCourseCoauthors(obj);
    setCoAuthorData(obj);
    setCoAuthor("");
  };
  const handlImgClick = () => {
    inpRef.current.click();
  };
  const handleCourseImg = (e) => {
    const file = e.target.files[0];
    if (file !== "undefined") {
      setCourseImg(file);
    }
    console.log("course image", file);
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
      created_by: sessionStorage.getItem("user_id"),
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
    setCourse(course);
    setCourseId(course.id);
    setInstructor(course.instructor)

    fetch(`http://127.0.0.1:8000/api/courses/${course.id}/modules`, {
      method: "GET",
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          console.log("Api result: ", result);
          const obj = result.filter(module => {
            return module.is_delete === false
          })
          setModuleCounter(result.length)
          setModuleData(obj);
        });
      } else {
        console.log(response);
        setModuleData([]);
      }
    });
  };

  const getFirstAndLastNameIcon = (id) => {
    const coAuthors = userData.filter((user) => {
      return user.id === id;
    });
    if (coAuthors.length !== 0) {
      const name = `${coAuthors[0].first_name.slice(
        0,
        1
      )}${coAuthors[0].last_name.slice(0, 1)}`;
      return name.toUpperCase();
    } else {
      return null;
    }
  };

  const getFirstAndLastName = (id) => {
    const coAuthors = userData.filter((user) => {
      return user.id === id;
    });
    return `${coAuthors[0].first_name} ${coAuthors[0].last_name}`;
  };

  const handleDeleteCourse = (course, deleted) => {
    let action = ""
    if(deleted) {
      action = "Delete"
    }
    else {
      action = "Restore" 
    }
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#3085d6',
    //   confirmButtonText: `${action}`
    // }).then((result) => {
    //   if (result.isConfirmed) {
        const obj = {
          title: course.title,
          is_updated: true,
          is_delete: deleted,
          created_by: course.created_by,
          editor: [2, 24],
          category: [1],
          updated_by: userId,
        };
    
        fetch(`http://127.0.0.1:8000/api/courses/${course.id}/`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 200) {
            response.json().then(function (result) {
              console.log('Api result: ',result);
              // Swal.fire(
              //   `${action}!`,
              //   `${course.title} has been ${action}.`,
              //   'success'
              // ).then(res => {
              //  navigate(-1)
              // })
              // setCourseContent((pre) => [...pre, result]);
              // setCourseCreator(result.created_by);
              // setCourseCategory("");
              // setCourseTitle("");
              // 
            });
          } else {
            console.log(response);
          }
        });
      // }
    // })


  };

  const handleSaveCourse = () => {
    if (courseTitle && courseCategory) {

      console.log('instructor id',instructor);

      fetch(`http://127.0.0.1:8000/api/authors/${instructor}/`, {
        method: "PUT",
        body: JSON.stringify({created_by: courseCreator, editor: courseCoauthors}),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
          });
        } else {
          console.log(response);
        }
      });

      const formData = new FormData();
      if (typeof courseImg === "object" && courseImg) {
        formData.append("course_image", courseImg);
      }
      formData.append("title", courseTitle);
      formData.append("description", courseDescription);
      formData.append("start_date", courseStart);
      formData.append("end_date", courseEnd);
      formData.append("category", [courseCategory]);
      formData.append("instructor", instructor);
      formData.append("updated_by", sessionStorage.getItem("user_id"));
      // formData.append("created_by", courseCreator);

      // courseCoauthors.forEach((id) => {
      //   formData.append("editor", id);
      // });
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
            navigate(-1)
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  return (
    <div>
      <div
        className={`offcanvas offcanvas-end ${"show"}`}
        tabIndex="-1"
        style={{ width: "84%" }}
        id="offcanvasCourse"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-body">
          <div className="add-course-content">
            <div className="course-name-section">
              <ul style={{ paddingLeft: "5px" }}>
                {courseContent && courseContent.length === 0
                  ? "No Module Found"
                  : courseContent.map((course) => {
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
              <div className="offcanvas-head course-heading  sticky-top">
                <div className="course-heading-section">
                  <input
                    type="text"
                    value={courseTitle}
                    onChange={handleCourseTitle}
                    required
                    className="courseTitle"
                  />
                  {/* <label className="course-content-label">Start Date:</label>
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
                  <label className="course-content-label">End Date:</label>
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
                  /> */}
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
                    className="btn-close ms-2  me-2"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    onClick={() => navigate(-1)}
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
                        {
                          course.length !== 0 && course.is_delete ?  <i
                          className="bi bi-recycle text-success"
                          onClick={() => handleDeleteCourse(course, false)}
                        ></i>:
                        <i
                          className="bi bi-trash text-danger"
                          onClick={() => handleDeleteCourse(course, true)}
                        ></i>
                        }
                        
                      </li>
                      <li>
                        <i className="bi bi-copy text-info"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <form className="course-content-form">
                <div className="course-content-description-section">
                  <div className="course-content-editor me-2">
                    <label className="mb-0 mt-1 course-content-label">
                      Description
                    </label>
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
                  <div className="course-content-cat-auth">
                    <div className="category-section mb-4">
                      <label className="mb-0 mt-1 course-content-label">
                        Category
                      </label>
                      <select
                        onChange={handlecourseCategory}
                        value={courseCategory}
                      >
                        <option value="">--Select Category--</option>
                        {categoryData.length === 0  ? "No Record ": categoryData &&
                            categoryData.map((category) => {
                              return (
                                <option value={category.id} key={category.id}>
                                  {category.title}
                                </option>
                              );
                            })}
                      </select>
                    </div>
                    <div className="dropdown-section-for-cat-couthor">
                      <div className="coauthor-section">
                        <label className="mb-0 mt-1 course-content-label">
                          Co-Author
                        </label>
                        <select
                          onChange={(e) => handleCoAuthor(e)}
                          value={coAuthor}
                        >
                          <option value="">--Select Co-Author--</option>
                          {userData.length !== 0 &&
                            userData.map((user) => {
                              if (
                               
                                user.role === "instructor" &&
                                user.id !== courseCreator &&
                                !coAutherData.includes(user.id)
                              ) {
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
                              if (index === 0) {
                                return null;
                              }
                              return (
                                <li
                                  key={coAuthor}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <div
                                      className={`coauthor-name-icon coauthor-name-icon${index} me-2`}
                                    >
                                      {getFirstAndLastNameIcon(coAuthor)}
                                    </div>
                                    <div className="coauthor-name-section ">
                                      <span>
                                        {getFirstAndLastName(coAuthor)}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="coauthor-remove-icon ">
                                    <i
                                      className="bi bi-trash text-warining remove-coauthor-icon"
                                      onClick={() => removeCoAuthor(coAuthor)}
                                    ></i>
                                  </div>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="course-content-image-section">
                  <div className="coverImage">
                    <label className="choose-img course-content-label">
                      Upload Image
                    </label>
                    <div
                      className="upload-image-section"
                      onClick={handlImgClick}
                    >
                      {courseImg ? (
                        <img
                          // src={URL.createObjectURL(courseImg)}
                          src={courseImg}
                          alt=""
                          className="course-content-cover-img"
                        />
                      ) : (
                        <img src={img} className="course-content-cover-img" />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={inpRef}
                      accept="image/jpg, image/png, image/jpeg"
                      onChange={(e) => handleCourseImg(e)}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div className="category-section me-2 ms-0 w-50">
                    <div className="">
                      <label className="course-content-label w-100 m-0 mt-3">
                        Course Start Date
                      </label>
                      <input
                        type="date"
                        value={courseStart}
                        className="course-start-field"
                        id="course-date-field"
                        onChange={(e) => handlCourseStart(e)}
                        ref={startDateRef}
                      />
                      <span
                        onClick={() => {
                          startDateRef.current.showPicker();
                        }}
                        className=" text-center course-content-date w-100"
                      >
                        {courseStart ? courseStart : "YYYY-MM-DD"}
                      </span>
                    </div>
                    <div className="">
                      <label className="course-content-label m-0 w-100 mt-3">
                        Course End Date
                      </label>
                      <input
                        type="date"
                        value={courseEnd}
                        onChange={(e) => handlCourseEnd(e)}
                        className="course-end-field"
                        id="course-date-field"
                        ref={endDateRef}
                      />
                      <span
                        onClick={() => endDateRef.current.showPicker()}
                        className=" text-center course-content-date w-100"
                      >
                        {courseEnd ? courseEnd : "YYYY-MM-DD"}
                      </span>
                    </div>
                  </div>
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
                    moduleCounter={moduleCounter}
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
      </div>
    </div>
  );
};

export default CourseContent;

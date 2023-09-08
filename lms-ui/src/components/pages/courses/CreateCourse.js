import React, { useRef, useState } from "react";
import courseData from "../../hooks/courseData";
import CourseModule from "./CourseModule";
import "../../styles/Courses.css";
import { Editor } from "@tinymce/tinymce-react";
import AllCourse from "./AllCourses";

const CreateCourse = ({  }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  const [courseTitle, setCourseTitle] = useState("");
  const [courseStart, setCourseStart] = useState(minDate);
  const [courseEnd, setCourseEnd] = useState("2025-12-30");

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

  return (
    <div>
      <AllCourse show={'show'} />
    </div>
    // <div className="offcanvas-body">
    //   <div className="add-course-content">
    //     <div className="course-name-section">
    //     <ul style={{ paddingLeft: '10px'}}>
    //         {courseData &&
    //           courseData.map((course) => {
    //             return (
    //               <div key={course.id}>
    //                 <li>
    //                   <a role="button">{course.course_title}</a>
    //                 </li>
    //               </div>
    //             );
    //           })}
    //       </ul>
    //     </div>
    //     <div className="course-form-section">
    //       <div className="offcanvas-head">
    //         <h5 className="offcanvas-title" id="offcanvasRightLabel">
    //           Add Course
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="offcanvas"
    //           aria-label="Close"
    //         ></button>
    //       </div>
    //       <form>
    //         <label className="mb-0">
    //           Title<span style={{ color: "red" }}>*</span>
    //         </label>
    //         <input
    //           type="text"
    //           value={""}
    //           onChange={""}
    //           required
    //           className="course-title"
    //         />
    //         <label className="mb-0 mt-1">Description</label>
    //         <Editor
    //           apiKey={process.env.REACT_APP_API_KEY}
    //           onInit={(evt, editor) => (editorRef.current = editor)}
    //           initialValue=""
    //           init={{
    //             height: 300,
    //             menubar: false,
    //             plugins: [
    //               "advlist",
    //               "autolink",
    //               "lists",
    //               "link",
    //               "image",
    //               "charmap",
    //               "preview",
    //               "anchor",
    //               "searchreplace",
    //               "visualblocks",
    //               "code",
    //               "fullscreen",
    //               "insertdatetime",
    //               "media",
    //               "table",
    //               "code",
    //               // "help",
    //               "wordcount",
    //             ],
    //             toolbar:
    //               "undo redo | blocks | " +
    //               "bold italic forecolor | alignleft aligncenter " +
    //               "alignright alignjustify | bullist numlist outdent indent | " +
    //               "removeformat",
    //             content_style:
    //               "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    //           }}
    //         />
    //         <div className="course-module-section">
    //           <ul>
    //             {moduleData &&
    //               moduleData.map((module) => {
    //                 return (
    //                   <div key={module.moduleTitle}>
    //                     <li>{module.moduleTitle}</li>
    //                   </div>
    //                 );
    //               })}
    //           </ul>

    //           <div>
    //             <button
    //               type="button"
    //               className="btn w-50 add-module-btn"
    //               onClick={() => setShowModule((pre) => !pre)}
    //             >
    //               Add Module
    //               <i className="fas fa-solid fa-plus ms-2"></i>
    //             </button>
    //             {showModule && (
    //               <CourseModule
    //                 setModuleData={setModuleData}
    //                 setShowModule={setShowModule}
    //                 minDate={minDate}
    //               />
    //             )}
    //           </div>
    //         </div>
    //         <div className="category-save-btn">
    //           <button
    //             type="submit"
    //             className="btn btn-primary"
    //             onClick={"handleSave"}
    //           >
    //             Save Course
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>

    //   {/* <button
    //     type="button"
    //     className="btn btn-primary w-100"
    //     data-bs-toggle="collapse"
    //     data-bs-target="#collapseOne"
    //     aria-expanded="true"
    //     aria-controls="collapseOne"
    //   >
    //     Create Course +
    //   </button>
    //   <div
    //     id="collapseOne"
    //     className="collapse "
    //     data-bs-parent="#accordionExample"
    //   >
    //     <div className="course-main">
    //       <form className="course-create-form">
    //         <div className="course-title">
    //           <label>Course Name:</label>
    //           <input
    //             type="text"
    //             placeholder="Course Title"
    //             value={courseTitle}
    //             onChange={handleCourseTitle}
    //           />
    //         </div>
    //         <div className="course-start">
    //           <label>Course Start Date:</label>
    //           <input
    //             type="date"
    //             placeholder="Start Date"
    //             min={minDate}
    //             value={courseStart}
    //             onChange={handleCourseStart}
    //           />
    //         </div>
    //         <div className="course-end">
    //           <label>Course End Date:</label>
    //           <input
    //             type="date"
    //             max="2030-12-30"
    //             min={minDate}
    //             placeholder="End Date"
    //             value={courseEnd}
    //             onChange={handleCourseEnd}
    //           />
    //         </div>
    //       </form>
    //       <ul>
    //         {moduleData
    //           ? moduleData.map((data) => {
    //               return (
    //                 <div key={data.moduleTitle}>
    //                   <li>{data.moduleTitle}</li>
    //                 </div>
    //               );
    //             })
    //           : ""}
    //       </ul> 
    //        <div className="course-module-section">
    //         <div>
    //         <button
    //           type="button"
    //           className="btn btn-secondary w-50"
    //           onClick={() => setShowModule((pre) => !pre)}
    //         >
    //           Add Module
    //         </button>
    //         {showModule && (
    //           <CourseModule
    //             setModuleData={setModuleData}
    //             setShowModule={setShowModule}
    //             minDate={minDate}
    //           />
    //         )}
    //         </div>
    //       </div>

    //       <div className="add-course-btn">
    //         <button type="button" className="btn btn-outline-primary">
    //           Create Course
    //         </button>
    //       </div>
    //     </div>
    //   </div> */}
    // </div>
  );
};

export default CreateCourse;

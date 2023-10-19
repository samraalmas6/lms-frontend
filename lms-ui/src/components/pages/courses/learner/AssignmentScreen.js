// import React from "react";
// import AssignmentPartners from "./AssignmentPartners";
// import "../../../styles/AssignmentScreen.css";
// import { useState } from "react";
// import AssigDesc from "./AssigDesc";
// // import UploadPicture from "./UploadPicture";
// import paraIcon from "../../../content/Images/paragraph.svg"
// import FileUploadComponent from "../../../content/FileUploadComponent";

// const AssignmentScreen = () => {
//   const currentDate = new Date();
//   const year = currentDate.getFullYear();
//   const month = String(currentDate.getMonth() + 1).padStart(2, "0");
//   const day = String(currentDate.getDate()).padStart(2, "0");
//   const minDate = `${year}-${month}-${day}`;

//   const [showComp, setShowComp] = useState(false);
//   const [courseStart, setCourseStart] = useState(minDate);
//   const [courseEnd, setCourseEnd] = useState("");
//   const [showAttachFile, setShowFileAttach] = useState(false);
//   const [title, setTitle] = useState("")
//   const [marks, setMarks] = useState("")
//   // const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

//   const handleTitle = (event) => {
//     setTitle(event.target.value)
//     console.log(title)
//   }

//   const handleMarks = (e) => {
//     setMarks(e.target.value)
//   }

//   const handleClick = () => {
//     console.log("button is pressed");
//     setShowComp(!showComp);
//   };

//   const handleCourseStart = (e) => {
//     setCourseStart(e.target.value);
//   };

//   const handleCourseEnd = (e) => {
//     setCourseEnd(e.target.value);
//   };

//   const handleFileAttachment = () => {
//     setShowFileAttach(true);
//   };

//   function handleSubmit(event) {
//     event.preventDefault();

//     // [
// //   {
// //     "title": "Sample Assignment",
// //     "description": "This is a sample assignment for testing purposes.",
// //     "due_date": "2023-09-30T23:59:59Z",
// //     "marks": "100",
// //     "unit": 1
// //   }
// // ]
//     const obj = {
//       title: title,
//       due_date : courseStart,
//       marks : marks,
//       unit: 1
//       // Add other data properties as needed
//     };

//     fetch("http://127.0.0.1:8000/api/assignments/", {
//       method: "POST",
//       body: JSON.stringify(obj),
//       headers: {
//         Authorization: `Token ${sessionStorage.getItem("user_token")}`,
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     }).then((response) => {
//       if (response.status == 201) {
//         response.json().then(function (result) {
//           console.log(result);
//           // setCourseStart(""),
//           // setTitle(""),
//           // setMarks("")
//         });
//       } else {
//         console.log(response);
//       }
//     });
//     // setShowConfirmationDialog(true);
//   }

//   return (
//     <div>
//       <div className="main-container">
//         <div className="assignment-details">
//           {/* <p>title</p>
//           <p>description</p>
//           <p>attach file</p> */}
//           <form>
//           <i class='fas fa-pen'></i>
//             <input type="text" placeholder="Title"/>
//           </form>
//           <div className="editor-container">
//             <div><img src={paraIcon} alt="" /></div>
//             <div className="description-container"><AssigDesc /></div>
//           </div>

//           {/* ***************   There is an issue with selecting a file   *************** */}

//           {/* <div className="file">
//             <FileUploadComponent />
//           </div>  */}

//           {/* ***************   There is an issue with selecting a file   *************** */}

//           <button onClick={handleSubmit}>Create Assignment</button>

//         </div>
//         <div className="side-container">
//           <div className="due-date-and-time">
//             {/* <p>due date</p> */}

//             <div className="due-date-time">
//               {/* <label>Due Date:</label> */}
//               <i class='fas fa-calendar-alt'></i>
//               <input
//                 type="date"
//                 placeholder="Start Date"
//                 min={minDate}
//                 value={courseStart}
//                 onChange={handleCourseStart}
//               />
//             </div>
//             {/* <p>Due time</p> */}
//             <div className="due-date-time">
//               {/* <label>Due Time:</label> */}
//               <i class='far fa-clock'></i>
//               <input
//                 type="time"
//                 // max="2030-12-30"
//                 // min={minDate}
//                 value={courseEnd}
//                 onChange={handleCourseEnd}
//               />
//             </div>
//           </div>
//           <div className="marks">
//           <i class="fas fa-thin fa-star fa-lg"></i>
//             <input type="text" placeholder="Enter Marks" onChange={handleMarks} />
//           </div>
//           <div className="assignment-partners">
//             <div className="heading-container">
//             <h3>Assignment Partners</h3>
//             {/* <button onClick={handleClick}> */}
//                 {/* <i class=" fas fa-solid fa-plus"></i> */}
//                 <div className="user-icon"  onClick={handleClick}>
//                 <i class="fas fa-thin fa-user-plus"></i>
//               </div>
//               {/* </button> */}
//             </div>
//             {showComp &&
//               <>
//              <AssignmentPartners />
//              </>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignmentScreen;

// --------------xxxxxxxxxxxxx-------------------
import React, { useState } from "react";
import AssignmentPartners from "./AssignmentPartners";
import "../../../styles/AssignmentScreen.css";
// import AssigDesc from "./AssigDesc";
import paraIcon from "../../../content/Images/paragraph.svg";
import FileUploadComponent from "../../../content/FileUploadComponent";
import { Editor } from "@tinymce/tinymce-react";
import "../../../styles/editor.css";
import { useLocation, useNavigate,  } from "react-router-dom";

const AssignmentScreen = () => {

  const userId = sessionStorage.getItem('user_id')

  const navigate = useNavigate()
  const {state} = useLocation();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const minDate = `${year}-${month}-${day}`;

  const [showComp, setShowComp] = useState(false);
  const [courseStart, setCourseStart] = useState(minDate);
  const [courseEnd, setCourseEnd] = useState("");
  const [title, setTitle] = useState("");
  const [marks, setMarks] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState("")


  // const handleContentChange = (event) => {
  //   handleEditorChange(content, editor);
  //   setContent(event.target.value);
  // }
  const handleEditorChange = (content, e) => {
    console.log("Content was updated:", content);
    // setContent(content);
    setContent(e.getContent({ format: "text" }))
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleMarks = (e) => {
    setMarks(e.target.value);
  };

  const handleClick = () => {
    setShowComp(!showComp);
  };

  const handleCourseStart = (e) => {
    setCourseStart(e.target.value);
  };

  const handleCourseEnd = (e) => {
    setCourseEnd(e.target.value);
  };
  const handleFileUpload = (selectedFile) => {
    // Handle the selected file here
    setSelectedFile(selectedFile);
  };
  const handleFileAttachment = () => {
    // Handle file attachment here if needed
  };

  function handleSubmit(event) {
    event.preventDefault();

    const obj = {
      title: title,
      description: content, // You can add the description here if you have it
      due_date: courseStart,
      marks: marks,
      due_time: courseEnd,
      is_updated: true,
      unit: 1, // Assuming a default unit value
      // Number_of_members: 1,
      updated_by: sessionStorage.getItem('user_id'),
      created_by: sessionStorage.getItem('user_id')
    };

    fetch("http://127.0.0.1:8000/api/assignments/", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log(result);
            // Clear the input fields after successful submission
            setTitle("");
            setMarks("");
            setCourseStart("");
            setCourseEnd("");
            setSelectedFile(null)
            navigate(-1)
          });
        } else {
          console.log(response);
          // Handle the error response here
          response.json().then(function (errorData) {
            console.error("Error:", errorData);
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div className="main-container">
        <div className="assignment-details">
          <form>
            <i className="fas fa-pen"></i>
            <input
              type="text"
              placeholder="Title"
              value={title}
              // className="assignment-screen-input-field "
              onChange={handleTitle}
            />
          </form>
          <div className="editor-container">
            <div>
              <img src={paraIcon} alt="" />
            </div>
            <div className="description-container">
              <div>
                <Editor
                  initialValue="<p>This is the initial content of the editor</p>"
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                  }}
                  // onEditorChange={handleEditorChange}
                  onEditorChange={(value, evt) => handleEditorChange(value, evt)}
                  value={content}
                />
              </div>
              <div>
                <FileUploadComponent />
              </div>
            </div>
          </div>
          <div className="file-upload-container">
            <FileUploadComponent onFileSelected={handleFileUpload} />
          </div>

          <button onClick={handleSubmit}>Create Assignment</button>
        </div>
       
        <div className="side-container">
          <div className="due-date-and-time">
            <div className="due-date-time">
              <i className="fas fa-calendar-alt"></i>
              <input
                type="date"
                placeholder="Start Date"
                min={minDate}
                value={courseStart}
                className="assignment-screen-input-field "
                onChange={handleCourseStart}
              />
            </div>
            <div className="due-date-time">
              <i className="far fa-clock"></i>
              <input type="time" value={courseEnd} className="assignment-screen-input-field " onChange={handleCourseEnd} />
            </div>
          </div>
          <div className="marks">
            <i className="fas fa-thin fa-star fa-lg"></i>
            <input
              type="text"
              placeholder="Enter Marks"
              value={marks} 
              className="assignment-screen-input-field"
              onChange={handleMarks}
            />
          </div>
          <div className="assignment-partners">
            <div className="heading-container">
              <h3>Assignment Partners</h3>
              <div className="user-icon" onClick={handleClick}>
                <i className="fas fa-thin fa-user-plus"></i>
              </div>
            </div>
            {showComp && <AssignmentPartners />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentScreen;


import React, { useState } from "react";

const SinglePdf = ({handleUnitPDF, pdf }) => {
  const userId = +sessionStorage.getItem("user_id");
  const [lectureCompleted, setLectureCompleted] = useState(false);
  const [showPDF, setShowPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState(pdf.completion)


  const handleFileComplete = (file) => {
    let completed = "";
    if (lectureCompleted !== true) {
      completed = file.completion;
    } else {
      completed = lectureCompleted;
    }
    const updatedObj = {
      title: file.title,
      instructor: file.instructor,
      unit: file.unit,
      updated_by: sessionStorage.getItem("user_id"),
      completion: completed,
      learner: userId
    };

    fetch(`http://127.0.0.1:8000/api/files/${file.id}/`, {
      method: "PUT",
      body: JSON.stringify(updatedObj),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          handleUnitPDF(file.unit)
          console.log("updated data: ", result);
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleViewPdf = (file) => {
    console.log("pdf url", file);
    handleFileComplete(pdf)
    // const obj = moduleUnit.filter((unit) => {
    //   return unit.id === id;
    // });
    // console.log('handleViewPdf ka obj',obj)
    // setDoc(() => file);
    setShowPdf(!showPDF);
    setLectureCompleted(true);
    window.open(file, "_blank");
  };



  return (
    <div>
      <div
        className="pdf-doc-container"
        onClick={() => {
          handleViewPdf(pdf.file);
        }}
      >
        <div className="check-box-div" 
        // onClick={() => handleFileComplete(pdf)}
        >
          <input
            className="checkbox"
            type="checkbox"
            id={pdf.id}
            name="lesson-checkbox"
            value={pdf.id}
            checked={pdf.completion}
          />
        </div>
        <i class="fas fa-solid fa-file-pdf"></i>
        <li>{pdf.title}</li>
      </div>
    </div>
  );
};

export default SinglePdf;

import React, { useContext, useRef, useState } from "react";
import { UnitProbs } from "./CourseUnit";
import { CourseProbs } from "../../../../App";

const AddUnitFile = ({ setUnitFiles }) => {
  const userId = sessionStorage.getItem("user_id");
  const pdfFieldRef = useRef(null);
  const slideFieldRef = useRef(null);
  const pdfSection = useRef(null);
  const slideSection = useRef(null);
  const pdfSelector = useRef(null);
  const slideSelector = useRef(null);
  const { unitId } = useContext(UnitProbs);
  const { instructor } = useContext(CourseProbs);

  const [unitPDF, setUnitPDF] = useState("");
  const [unitSlide, setUnitSlide] = useState("");

  const hanldePDFUpload = () => {
    pdfFieldRef.current.click();
  };

  const handleRemovePDF = () => {
    pdfSelector.current.removeAttribute("id", "hide-field");
    pdfSection.current.setAttribute("id", "hide-field");
    setUnitPDF(null);
  };

  const hanldeSlideUpload = () => {
    slideFieldRef.current.removeAttribute("id", "hide-field");
    slideFieldRef.current.click();
  };
  const handleRemoveSlide = () => {
    slideSelector.current.removeAttribute("id", "hide-field");
    slideSection.current.setAttribute("id", "hide-field");
    setUnitPDF(null);
  };

  const handleUnitPDF = (e) => {
    let file = e.target.files[0];
    if (file) {
      pdfSection.current.removeAttribute("id", "hide-field");
      pdfSelector.current.setAttribute("id", "hide-field");
    } else {
      pdfSection.current.setAttribute("id", "hide-field");
    }
    setUnitPDF(file);
  };
  const handleUnitSlide = (e) => {
    let file = e.target.files[0];
    if (file) {
      slideSection.current.removeAttribute("id", "hide-field");
      slideSelector.current.setAttribute("id", "hide-field");
    } else {
      pdfSection.current.setAttribute("id", "hide-field");
    }
    setUnitSlide(file);
  };

  const handleUploadFile = (e) => {
    console.log("unit id ", unitId);

    e.preventDefault();
    const formData = new FormData();
    if (unitSlide) {
      formData.append("file", unitSlide);
      formData.append(
        "title",
        unitSlide.name.split(".").slice(0, 1).toString()
      );
      formData.append("unit", unitId);
      formData.append("updated_by", userId);
      formData.append("instructor", instructor);
    } else {
      formData.append("file", unitPDF);
      formData.append("title", unitPDF.name.split(".").slice(0, 1).toString());
      formData.append("unit", unitId);
      formData.append("updated_by", userId);
      formData.append("instructor", instructor);
      // courseCoauthors.forEach(id => {
      //   formData.append("editor", id);
      // });
    }
    fetch("http://127.0.0.1:8000/api/files/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        // "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 201) {
        response.json().then(function (result) {
          pdfSelector.current.removeAttribute("id", "hide-field");
          pdfSection.current.setAttribute("id", "hide-field");
          setUnitPDF(null);
          setUnitSlide(null);
          setUnitFiles((pre) => [...pre, result]);
          // setVidoUrl("");
          // setModuleDescription("");
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  return (
    <div>
      <div className="add-unit-pdf-section">
        <div className="add-unit-selection-section">
          <span className="unit-form-span-title">Add File <i
            className="bi bi-plus-circle plus-icon unit-form-i-title"
            ref={pdfSelector}
            onClick={() => hanldePDFUpload()}
          ></i></span>
        </div>
        <div className="unit-field-section" id="hide-field" ref={pdfSection}>
          <input
            type="file"
            className="pdf-field"
            onChange={(e) => handleUnitPDF(e)}
            ref={pdfFieldRef}
            style={{ display: "none" }}
          />
          <span>{unitPDF && unitPDF.name}</span>
          <i
            className="bi bi-check-lg check-unit-content text-success"
            onClick={(e) => handleUploadFile(e)}
          ></i>
          <i
            className="bi bi-x check-unit-content text-danger"
            onClick={() => handleRemovePDF()}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default AddUnitFile;

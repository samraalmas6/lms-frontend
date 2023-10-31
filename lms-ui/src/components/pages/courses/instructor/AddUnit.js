import React, { useContext, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UnitProbs } from "./CourseUnit";
import { CourseProbs } from "../../../../App";

const AddUnit = ({setUnitVideos, setUnitFiles}) => {
  const userId = sessionStorage.getItem("user_id");
  const { courseCoauthors, courseId } = useContext(CourseProbs);
  const navigate = useNavigate();
  const videoFieldRef = useRef(null);
  const videoAddRef = useRef(null);
  const pdfFieldRef = useRef(null);
  const slideFieldRef = useRef(null);
  const pdfSection = useRef(null);
  const slideSection = useRef(null);
  const pdfSelector = useRef(null);
  const slideSelector = useRef(null);

  const { unitId } = useContext(UnitProbs);

  const [videoUrl, setVidoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [unitPDF, setUnitPDF] = useState("");
  const [unitSlide, setUnitSlide] = useState("");

  const hanldeVideoUpload = (e) => {
    // e.stopPropagation();
    videoFieldRef.current.removeAttribute("id", "hide-field");
    videoAddRef.current.setAttribute("id", "hide-field");
  };
  const handleAddVido = () => {
    videoAddRef.current.removeAttribute("id", "hide-field");
    videoFieldRef.current.setAttribute("id", "hide-field");
  };

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

  const hanldeVido = (e) => {
    setVidoUrl(e.target.value);
  };
  const hanldeVidoTitle = (e) => {
    setVideoTitle(e.target.value);
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


  const handleAssignment = () => {
    // navigate('/assignment', { state: { courseId, unitId } });

    navigate("/course/create-assignment", { state: { unitId,courseId  } });
  };

  const handleUploadVideo = (e) => {
    console.log("unit id ", unitId);
    e.preventDefault();
    if (videoUrl) {
      const obj = {
        title: videoTitle,
        url: videoUrl,
        unit: unitId,
        updated_by: userId,
        created_by: userId,
        editor: courseCoauthors
      };
      fetch("http://127.0.0.1:8000/api/videos/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log(result);
            setVideoTitle("");
            setVidoUrl("");
            setUnitVideos(pre => [...pre, result])
            // setModuleDescription("");
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };


  const handleUploadFile = (e) => {
    console.log("unit id ", unitId);
    
    const editorList = courseCoauthors.join(',');

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
      formData.append("created_by", userId);
      courseCoauthors.forEach(id => {
        formData.append("editor", id);
      });
      // formData.append("editor", courseCoauthors);
    } else {
      formData.append("file", unitPDF);
      formData.append("title", unitPDF.name.split(".").slice(0, 1).toString());
      formData.append("unit", unitId);
      formData.append("updated_by", userId);
      courseCoauthors.forEach(id => {
        formData.append("editor", id);
      });
      formData.append("created_by", userId);
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
          setUnitPDF(null);
          setUnitSlide(null);
          setUnitFiles(pre => [...pre, result])
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
      <div className="unit-form-section">
        <form className="unit-form">
          <div className="unit-video-section">
            <div className="unit-selection-section unit-selection-section-video">
              <span className="unit-form-span-title">Video</span>
              <i
                className="bi bi-plus-circle plus-icon unit-form-i-title"
                ref={videoAddRef}
                onClick={(e) => hanldeVideoUpload(e)}
              ></i>
            </div>
            <div
              className="unit-field-section unit-video-main-container"
              id="hide-field"
              ref={videoFieldRef}
            >
              <div
                className="unit-video-fields"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  className="video-title-field"
                  value={videoTitle}
                  onChange={(e) => hanldeVidoTitle(e)}
                  placeholder="Enter Video Title"
                />
                <input
                  type="url"
                  className="video-url"
                  value={videoUrl}
                  onChange={(e) => hanldeVido(e)}
                  placeholder="Video Link"
                />
              </div>
              <div className="unit-video-icon-section">
                <i
                  className="bi bi-check-lg check-unit-content text-success"
                  onClick={(e) => handleUploadVideo(e)}
                ></i>
                <i
                  className="bi bi-x check-unit-content text-danger"
                  onClick={() => handleAddVido()}
                ></i>
              </div>
            </div>
          </div>
          <div className="slides-section">
            <div className="unit-selection-section">
              <span className="unit-form-span-title">Slide</span>
              <i
                className="bi bi-plus-circle plus-icon unit-form-i-title"
                ref={slideSelector}
                onClick={() => hanldeSlideUpload()}
              ></i>
            </div>
            <div
              className="unit-field-section"
              ref={slideSection}
              id="hide-field"
            >
              <input
                type="file"
                className="slide-field"
                ref={slideFieldRef}
                onChange={handleUnitSlide}
                style={{ display: "none" }}
              />
              <span>{unitSlide && unitSlide.name}</span>
              <i
                className="bi bi-check-lg check-unit-content text-success"
                onClick={(e) => handleUploadFile(e)}
              ></i>
              <i
                className="bi bi-x check-unit-content text-danger"
                onClick={() => handleRemoveSlide()}
              ></i>
            </div>
          </div>
          <div className="pdf-section">
            <div className="unit-selection-section">
              <span className="unit-form-span-title">PDF</span>
              <i
                className="bi bi-plus-circle plus-icon unit-form-i-title"
                ref={pdfSelector}
                onClick={() => hanldePDFUpload()}
              ></i>
            </div>
            <div
              className="unit-field-section"
              id="hide-field"
              ref={pdfSection}
            >
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
          <div className="assignment-section">
            <div className="unit-selection-section">
              <span className="unit-form-span-title">Assignment</span>
              <i
                className="bi bi-plus-circle plus-icon unit-form-i-title"
                onClick={() => handleAssignment()}
              ></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUnit;

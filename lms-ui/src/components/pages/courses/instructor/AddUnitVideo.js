import React, { useContext, useRef, useState } from "react";
import { UnitProbs } from "./CourseUnit";
import { CourseProbs } from "../../../../App";

const AddUnitVideo = ({setUnitVideos}) => {
    const userId = sessionStorage.getItem("user_id");
  const videoFieldRef = useRef(null);
  const videoAddRef = useRef(null);
  const [videoUrl, setVidoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const { unitId } = useContext(UnitProbs);
  const {instructor} = useContext(CourseProbs);


  const hanldeVido = (e) => {
    setVidoUrl(e.target.value);
  };
  const hanldeVidoTitle = (e) => {
    setVideoTitle(e.target.value);
  };

  const hanldeVideoUpload = (e) => {
    // e.stopPropagation();
    videoFieldRef.current.removeAttribute("id", "hide-field");
    videoAddRef.current.setAttribute("id", "hide-field");
  };
  const handleAddVido = () => {
    videoAddRef.current.removeAttribute("id", "hide-field");
    videoFieldRef.current.setAttribute("id", "hide-field");
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
        instructor,
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
            videoAddRef.current.removeAttribute("id", "hide-field");
            videoFieldRef.current.setAttribute("id", "hide-field");
            console.log(result);
            setVideoTitle("");
            setVidoUrl("");
            setUnitVideos((pre) => [...pre, result]);
            // setModuleDescription("");
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  return (
    <div>
      <div className="add-unit-video-section">
        <div className="add-unit-video-selection-section">
          <span className="unit-form-span-title">Add video <i
            className="bi bi-plus-circle plus-icon unit-form-i-title"
            ref={videoAddRef}
            onClick={(e) => hanldeVideoUpload(e)}
          ></i></span>
         
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
    </div>
  );
};

export default AddUnitVideo;

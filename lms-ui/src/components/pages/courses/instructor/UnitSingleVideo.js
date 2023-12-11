import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UnitSingleVideo = ({
  video,
  index,
  getUSerFullName,
  handleUnitContent,
}) => {
  const [videoTitle, setVideoTitle] = useState(video.title);
  const [showEditVideoBtn, setShowEditVideoBtn] = useState(false);
  const [editVideo, setEditVideo] = useState(false);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(video.is_active);
  }, [0]);

  const handleVisibility = (e) => {
    setVisibility(!visibility);

    const obj = {
      title: video.title,
      url: video.url,
      is_active: !visibility,
      instructor: video.instructor,
      unit: video.unit,
      updated_by: sessionStorage.getItem("user_id"),
    };

    fetch(`http://127.0.0.1:8000/api/videos/${video.id}/`, {
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
          Swal.fire({
            icon: "success",
            text: `${result.title} has been ${
              result.is_active ? "activated" : "deactivated"
            }`,
          });
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleDeleteVideo = (video, deleted) => {
    let action = "";
    if (deleted) {
      action = "Delete";
    } else {
      action = "Restore";
    }
    Swal.fire({
      title: "Attention",
      text: `Do you want to ${action} this video?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          title: video.title,
          url: video.url,
          is_updated: true,
          is_delete: deleted,
          instructor: video.instructor,
          unit: video.unit,
          updated_by: sessionStorage.getItem("user_id"),
        };

        fetch(`http://127.0.0.1:8000/api/videos/${video.id}/`, {
          method: "PUT",
          body: JSON.stringify(obj),
          headers: {
            Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 200) {
            response.json().then(function (result) {
              console.log("Api result: ", result);
              Swal.fire(
                `${action}d!`,
                `${result.title} has been ${action}d.`,
                "success"
              ).then((res) => {
                window.location.reload();
              });
            });
          } else {
            console.log(response);
          }
        });
      }
    });
  };

  const handleVideoTitle = (e) => {
    setVideoTitle(e.target.value);
  };

  const handleUpdateVideoTitle = (e, video) => {
    if (e.key === "Enter" || e.type === "contextmenu") {
      e.preventDefault();

      const obj = {
        title: videoTitle,
        instructor: video.instructor,
        unit: video.unit,
        url: video.url,
        updated_by: sessionStorage.getItem("user_id"),
      };

      fetch(`http://127.0.0.1:8000/api/videos/${video.id}/`, {
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
            setEditVideo(false);
            handleUnitContent(video.unit);
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  return (
    <tr key={video.id}>
      <td className="single-unit-video-index-td">{index + 1}</td>
      <td
        onMouseEnter={() => {
          setShowEditVideoBtn(true);
          // setFileTitle(file.title);
        }}
        onMouseLeave={() => setShowEditVideoBtn(false)}
        className="single-unit-video-title-td"
      >
        <div className="single-unit-video-title-container">
          {editVideo ? (
            <input
              type="text"
              className="single-course-unit-video-title"
              autoFocus
              placeholder="Unit Title"
              value={videoTitle}
              onChange={(e) => handleVideoTitle(e)}
              required
              onKeyDown={(e) => handleUpdateVideoTitle(e, video)}
              //   onMouseEnter={preventAccordionClose}
              //   onMouseLeave={preventAccordionOpen}
            />
          ) : (
            <span className="single-course-unit-video-title">
            {video.title.length > 25 ? video.title.slice(0, 25)+"..." : video.title}

              {showEditVideoBtn && (
                <i
                  className="bi bi-pencil ms-2 module-edit-btn"
                  onClick={() => setEditVideo(true)}
                ></i>
              )}
            </span>
          )}
        </div>
      </td>
      <td className="single-unit-video-link-td">
        {/* <a href={video.url} target="_blank">
          {video.url}
        </a> */}

        <div className="single-unit-video-link-container">
          <a href={video.url} target="_blank" className="single-unit-video-link">
            {video.url.length > 40 ? video.url.slice(0,40)+"..." : video.url.slice(0,34)}
          </a>
        </div>
      </td>
      <td className="single-unit-video-created-td">{video.created_at}</td>
      <td className="single-unit-video-updated-td">
        {getUSerFullName(video.updated_by)}
      </td>
      <td colspan="2" className="single-unit-video-action-td">
        {/* {String(file.is_active).toUpperCase()} */}
        <ul className="unit-content-video-options">
          <li>
            <div className="form-check form-switch">
              <input
                className="form-check-input "
                type="checkbox"
                role="switch"
                value={visibility}
                checked={visibility}
                onChange={handleVisibility}
                id="flexSwitchCheckDefault"
              />
            </div>
          </li>
          <li>
            {video.length !== 0 && video.is_delete ? (
              <i
                className="bi bi-recycle text-success"
                onClick={() => handleDeleteVideo(video, false)}
              ></i>
            ) : (
              <i
                className="bi bi-trash text-danger"
                onClick={() => handleDeleteVideo(video, true)}
              ></i>
            )}
          </li>
          {/* <li>
          <i className="bi bi-copy text-info"></i>
        </li> */}
        </ul>
      </td>
    </tr>
  );
};

export default UnitSingleVideo;

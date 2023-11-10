import React, { useState } from 'react'

const UnitSingleVideo = ({video, index, getUSerFullName, handleUnitContent }) => {
    const [videoTitle, setVideoTitle] = useState(video.title);
    const [showEditVideoBtn, setShowEditVideoBtn] = useState(false);
    const [editVideo, setEditVideo] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const handleVisibility = (e) => {
        setVisibility(!visibility);
    }

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
    <td>{index + 1}</td>
    <td
        onMouseEnter={() => {
          setShowEditVideoBtn(true);
          // setFileTitle(file.title);
        }}
        onMouseLeave={() => setShowEditVideoBtn(false)}
      >
        {editVideo ? (
          <input
            type="text"
            placeholder="Unit Title"
            value={videoTitle}
            onChange={(e) => handleVideoTitle(e)}
            required
            onKeyDown={(e) => handleUpdateVideoTitle(e, video)}
            //   onMouseEnter={preventAccordionClose}
            //   onMouseLeave={preventAccordionOpen}
          />
        ) : (
          video.title.slice(0, 20)
        )}

        {showEditVideoBtn && (
          <i
            className="bi bi-pencil ms-2 module-edit-btn"
            onClick={() => setEditVideo(true)}
          ></i>
        )}
      </td>
    <td>
      <a href={video.url} target="_blank">
        {video.url}
      </a>
    </td>
    <td>{video.created_at}</td>
    <td>{getUSerFullName(video.updated_by)}</td>
    <td colspan="2">
      {/* {String(file.is_active).toUpperCase()} */}
      <ul className="unit-content-file-vidoe-options">
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
          <i className="bi bi-copy text-info"></i>
        </li>
      </ul>
    </td>
  </tr>
  )
}

export default UnitSingleVideo

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UnitSingleFile = ({ file, index, handleUnitContent }) => {
  const [fileTitle, setFileTitle] = useState(file.title);
  const [showEditFileBtn, setShowEditFileBtn] = useState(false);
  const [editFile, setEditFile] = useState(false);
  const [visibility, setVisibility] = useState();

  useEffect(() => {
    setVisibility(file.is_active)
  },[0])

  const handleVisibility = (e) => {
    setVisibility(!visibility);

    const obj = {
      title: file.title,
      is_active: !visibility,
      instructor: file.instructor,
      unit: file.unit,
      updated_by: sessionStorage.getItem("user_id"),
    };

    fetch(`http://127.0.0.1:8000/api/files/${file.id}/`, {
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
            text: `${result.title} has been ${result.is_active ? "activated" : "deactivated"}`
          })
          // window.location.reload();
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleDeleteFile = (file, deleted) => {
    let action = "";
    if (deleted) {
      action = "Delete";
    } else {
      action = "Restore";
    }
    Swal.fire({
      title: "Attention",
      text: `Do you want to ${action} this file?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: `${action}`
    }).then((result) => {
      if (result.isConfirmed) {
    const obj = {
      title: file.title,
      is_updated: true,
      is_delete: deleted,
      instructor: file.instructor,
      unit: file.unit,
      updated_by: sessionStorage.getItem("user_id"),
    };

    fetch(`http://127.0.0.1:8000/api/files/${file.id}/`, {
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
            'success'
          ).then(res => {
            window.location.reload();
          })

          
        });
      } else {
        console.log(response);
      }
    });
      }
    })
  };

  const handleFileTitle = (e) => {
    setFileTitle(e.target.value);
  };

  const handleUpdateFileTitle = (e, file) => {
    if (e.key === "Enter" || e.type === "contextmenu") {
      e.preventDefault();

      const obj = {
        title: fileTitle,
        instructor: file.instructor,
        unit: file.unit,
        updated_by: sessionStorage.getItem("user_id"),
      };

      fetch(`http://127.0.0.1:8000/api/files/${file.id}/`, {
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
            setEditFile(false);
            handleUnitContent(file.unit);
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };
  return (
    <tr key={file.id} className={`${file.is_delete ? "deleted-content" : ""}`}>
      <td>{index + 1}</td>
      <td
        onMouseEnter={() => {
          setShowEditFileBtn(true);
          // setFileTitle(file.title);
        }}
        onMouseLeave={() => setShowEditFileBtn(false)}
      >
        {editFile ? (
          <input
            type="text"
            placeholder="Unit Title"
            value={fileTitle}
            onChange={(e) => handleFileTitle(e)}
            required
            onKeyDown={(e) => handleUpdateFileTitle(e, file)}
            //   onMouseEnter={preventAccordionClose}
            //   onMouseLeave={preventAccordionOpen}
          />
        ) : (
          file.title.slice(0, 20)
        )}

        {showEditFileBtn && (
          <i
            className="bi bi-pencil ms-2 module-edit-btn"
            onClick={() => setEditFile(true)}
          ></i>
        )}
      </td>
      <td>{file.file.split(".").slice(-1)}</td>
      <td>
        <a href={file.file} target="_blank">
          {file.file.substr(34)}
        </a>
      </td>
      <td>{file.created_at}</td>
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
                checked={visibility}
                onChange={handleVisibility}
                id="flexSwitchCheckDefault"
              />
            </div>
          </li>
          <li>
          {file.length !== 0 && file.is_delete ? (
                      <i
                        className="bi bi-recycle text-success"
                        // onMouseEnter={preventAccordionClose}
                        // onMouseLeave={preventAccordionOpen}
                        onClick={() => handleDeleteFile(file, false)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-trash text-danger"
                        onClick={() => handleDeleteFile(file, true)}
                        // onMouseEnter={preventAccordionClose}
                        // onMouseLeave={preventAccordionOpen}
                      ></i>
                    )}
          </li>
          <li>
            <i className="bi bi-copy text-info"></i>
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default UnitSingleFile;

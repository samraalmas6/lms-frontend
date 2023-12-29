import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UnitSingleAssignment = ({
  assignment,
  index,
  getUSerFullName,
  handleUnitContent,
}) => {
  const navigate = useNavigate();

  const [assignmentTitle, setAssignmentTitle] = useState(assignment.title);
  const [showEditAssignmentBtn, setShowEditAssignmentBtn] = useState(false);
  const [editAssignment, setEditAssignment] = useState(false);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(assignment.is_active);
  }, [0]);


const handleAssignment = (assignment,unitId, courseId, instructor) => {
    navigate("/course/create-assignment", {
      state: { assignment, unitId, courseId, instructor },
    });
  };

  const handleVisibility = (e) => {
    setVisibility(!visibility);

    const obj = {
      title: assignment.title,
      instructor: assignment.instructor,
      unit: assignment.unit,
      description: assignment.description,
      due_date: assignment.due_date,
      due_time: assignment.due_time,
      updated: true,
      is_active: !visibility,
      marks: assignment.marks,
      updated_by: sessionStorage.getItem("user_id"),
    };

    fetch(`http://127.0.0.1:8000/api/assignments/${assignment.id}/`, {
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

  const handleDeleteAssignment = (assignment, deleted) => {
    let action = "";
    if (deleted) {
      action = "Delete";
    } else {
      action = "Restore";
    }
    Swal.fire({
      title: "Attention",
      text: `Do you want to ${action} this assignment?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `${action}`,
    }).then((result) => {
      if (result.isConfirmed) {
        const obj = {
          title: assignment.title,
          instructor: assignment.instructor,
          unit: assignment.unit,
          description: assignment.description,
          due_date: assignment.due_date,
          due_time: assignment.due_time,
          updated: true,
          is_delete: deleted,
          marks: assignment.marks,
          updated_by: sessionStorage.getItem("user_id"),
        };

        fetch(`http://127.0.0.1:8000/api/assignments/${assignment.id}/`, {
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

  const handleAssignmentTitle = (e) => {
    setAssignmentTitle(e.target.value);
  };

  const handleUpdateAssignmentTitle = (e, assignment) => {
    if (e.key === "Enter" || e.type === "contextmenu") {
      e.preventDefault();

      const obj = {
        title: assignmentTitle,
        instructor: assignment.instructor,
        unit: assignment.unit,
        description: assignment.description,
        due_date: assignment.due_date,
        due_time: assignment.due_time,
        marks: assignment.marks,
        updated_by: sessionStorage.getItem("user_id"),
      };

      fetch(`http://127.0.0.1:8000/api/assignments/${assignment.id}/`, {
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
            setEditAssignment(false);
            handleUnitContent(assignment.unit);
            // window.location.reload();
          });
        } else {
          console.log(response);
        }
      });
    }
  };

  return (
    <tr key={assignment.id}
      onClick={() =>  {
        handleAssignment(assignment,assignment.unit,14, assignment.instructor)
      }}
    >
      <td className="single-unit-assign-index-td">{index + 1}</td>
      <td
        onMouseEnter={() => {
          setShowEditAssignmentBtn(true);
          // setFileTitle(file.title);
        }}
        onMouseLeave={() => setShowEditAssignmentBtn(false)}
        className="single-unit-assign-title-td"
      >
                <div className="single-unit-file-title-container">
        {editAssignment ? (
          <input
            autoFocus
            className="single-course-unit-assign-title"
            type="text"
            placeholder="Unit Title"
            value={assignmentTitle}
            onChange={(e) => handleAssignmentTitle(e)}
            required
            onKeyDown={(e) => handleUpdateAssignmentTitle(e, assignment)}
            //   onMouseEnter={preventAccordionClose}
            //   onMouseLeave={preventAccordionOpen}
          />
        ) : (
          <span className="single-course-unit-assign-title">
            {assignment.title.length > 30
              ? assignment.title.slice(0, 30) + "..."
              : assignment.title}
            {showEditAssignmentBtn && (
              <i
                className="bi bi-pencil ms-2 module-edit-btn"
                onClick={() => setEditAssignment(true)}
              ></i>
            )}
          </span>
        )}
        </div>
      </td>
      <td className="single-unit-assign-description-td">
        {assignment.description.length > 30 ? assignment.description.slice(0,30)+"..." : assignment.description}
      </td>
      <td className="single-unit-assign-due-td text-danger">{assignment.due_date}</td>
      <td className="single-unit-assign-created-td">{assignment.created_at}</td>
      <td className="single-unit-assign-updated-td">
        {getUSerFullName(assignment.updated_by)}
      </td>
      <td colspan="2" className="single-unit-assign-action-td">
        {/* {String(file.is_active).toUpperCase()} */}
        <ul className="unit-content-assign-options">
          <li>
            <div className="form-check form-switch">
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
            {assignment.length !== 0 && assignment.is_delete ? (
              <i
                className="bi bi-recycle text-success"
                onClick={() => handleDeleteAssignment(assignment, false)}
              ></i>
            ) : (
              <i
                className="bi bi-trash text-danger"
                onClick={() => handleDeleteAssignment(assignment, true)}
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

export default UnitSingleAssignment;

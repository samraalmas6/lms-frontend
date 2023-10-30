import React, { useState } from "react";
// import "../styles/AssignmentPartner.css";
import "../../../styles/AssignmentPartner.css";
import { useEffect } from "react";
import SingleGroup from "./SingleGroup";
import SingleAssignment from "./SingleAssignment";
import { useNavigate } from "react-router-dom";

const AssignmentPartners = ({
  courseID,
  assignmentId,
  userData,
  studentsInCourse,
  setStudentsInCourse,
}) => {
  const userId = sessionStorage.getItem("user_id");
  const userRole = sessionStorage.getItem("role");
  const navigate = useNavigate(null)
  // --------------------------------------------
  const [selectedNames, setSelectedNames] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [removedNames, setRemovedNames] = useState([]);
  const [groupCreated, setGroupCreated] = useState(false); // Track whether a group has been created
  const [assignmentData, setAssignmentData] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showUserICon, setShowUserIcon] = useState(true);
  const [putRequest, setPutRequest] = useState(false);
  const [assignmentGroupIds, setAssignmentGroupIds] = useState([]);
  const [group, setGroup] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  const [loadPartner, setLoadPartner] = useState(false);
  const [loadGroup, setLoadGroup] = useState(false);


  useEffect(() => {
    const getAssignmentGroupData = () => {
      setAssignmentGroupIds([]);
      fetch("http://127.0.0.1:8000/api/assignment_partners_group/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            result.forEach((group) => {
              if (group.assignment === assignmentId) {
                setAssignmentGroupIds((pre) => [...pre, group.id]);
              }
            });
            setLoadGroup(!loadGroup);
          });
        } else {
          console.log(response);
        }
      });
    };

    getAssignmentGroupData();
  }, [0,loadPartner]);

  useEffect(() => {
    const getGroupPartnerData = () => {
      setGroup([]);
      fetch("http://localhost:8000/api/assignment_partners/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            result.forEach((partner) => {
              if (assignmentGroupIds.includes(partner.assignment_group)) {
                setGroup((pre) => [...pre, partner]);
              }
            });
          });
        } else {
          console.log(response);
          setGroup([]);
        }
      });
    };
    const getAssignmentData = () => {
      setAssignmentData([]);
      fetch("http://localhost:8000/api/assignments/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Api result Assignment data", result);
            result.forEach((assignment) => {
              if (assignment.is_team_submission_allowed === true) {
                setAssignmentData((pre) => [...pre, assignment]);
              }
            });
          });
        } else {
          console.log(response);
          setAssignmentData([]);
        }
      });
    };
    getGroupPartnerData();
    getAssignmentData();
  }, [loadGroup]);


  const handleNameSelect = (event) => {
    const name = event.target.value;
    console.log("selected name:", name);
    if (name && !selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, +name]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const handleRemoveSelected = (nameToRemove) => {

    const updatedSelectedNames = selectedNames.filter(
      (name) => name !== nameToRemove
    );
    console.log('updated selected name', updatedSelectedNames);
    setSelectedNames(updatedSelectedNames);
    setStudentsInCourse(pre => [...pre, nameToRemove])
    setRemovedNames([...removedNames, nameToRemove]);
  };

  const handleCreateGroup = (putRequest) => {
    let URL = "";
    let method = "";
    if (putRequest) {
      URL = `http://localhost:8000/api/assignment_partners/${partnerId}/`;
      method = "PUT";
    } else {
      URL = "http://localhost:8000/api/assignment_partners/";
      method = "POST";
    }
    if (selectedNames.length > 0) {
      const obj = {
        assignment_group: groupId,
        partners: selectedNames,
      };

      fetch(URL, {
        method: method,
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log("Api Partner Result: ", result);
            const updatedStudentsInCourse = studentsInCourse.filter(
              (student) => !result.partners.includes(student)
            );
            if (studentsInCourse.length === 0) {
              setShowUserIcon(false);
            }
            setStudentsInCourse(updatedStudentsInCourse);
            setGroup((pre) => [...pre, result]);
            setPutRequest(false);
          });
        } else if (response.status === 200) {
          response.json().then(function (result) {
            console.log("Api Partner Result: ", result);
            const updatedStudentsInCourse = studentsInCourse.filter(
              (student) => !result.partners.includes(student)
            );
            if (studentsInCourse.length === 0) {
              setShowUserIcon(false);
            }
            setStudentsInCourse(updatedStudentsInCourse);
            setLoadPartner(!loadPartner);
            setPutRequest(false);
          });
        } else {
          console.log(response);
        }
      });

      setSelectedNames([]);
      setGroupCreated(true);
      setShowContent(false);
      setShowUserIcon(true);
    }
  };

  const handleRemovePartner = (partnerId, groupId) => {
    const updatedGroup = group.map((element) => {
      if (element.id === groupId) {
        element.partners = element.partners.filter((id) => id !== partnerId);
      }
      return element;
    });
    const newGroup = updatedGroup.find((item) => item.id === groupId);

    fetch(`http://127.0.0.1:8000/api/assignment_partners/${groupId}/`, {
      method: "PUT",
      body: JSON.stringify(newGroup),
      headers: {
        Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        response.json().then(function (result) {
          setGroup(updatedGroup);
          setStudentsInCourse((pre) => [...pre, partnerId]);
          if (result.partners.length === 0) {
          }
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleAddNewPartner = (group) => {
    setShowContent(true);
    setSelectedNames(group.partners);
    setGroupCreated(true);
    setGroupId(group.assignment_group);
    setPartnerId(group.id);
    setPutRequest(true);
    console.log("This is Group", group);
  };

  const handleUserIconClick = () => {
    const obj = {
      assignment: assignmentId,
    };

    fetch("http://localhost:8000/api/assignment_partners_group/", {
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
          setGroupId(result.id);
          setShowUserIcon(!showUserICon);
          setShowContent(true);
        });
      } else {
        console.log(response);
      }
    });
  };

  const handleSave = () => {
    navigate(-1);
  }

  const getNumberOfUsers = (stuId) => {
    const student = userData.filter((user) => {
      return user.id === +stuId;
    });
    if (student.length === 0) {
      return null;
    } else {
      return `${student[0].first_name} ${student[0].last_name}`;
    }
  };

  const getFirstAndLastNameIcon = (id) => {
    const student = userData.filter((user) => {
      return user.id === +id;
    });
    if (student.length !== 0) {
      const name = `${student[0].first_name.slice(
        0,
        1
      )}${student[0].last_name.slice(0, 1)}`;
      return name.toUpperCase();
    } else {
      return null;
    }
  };

  const getRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    return randomNumber;
  };

  return (
    <div className="partner-section-container">
      <div className="main_container">
        <ul className="student-name-ul-tag m-0 p-0">
          {group.map((group) => {
            if (group.partners.length !== 0) {
              return (
                <>
                  <li style={{ display: "flex" }} className="student-name-list">
                    {/* <span>{`Group ${i+1}`}</span> */}
                    {group.partners.map((partner, index) => {
                      return (
                        <div>
                          {" "}
                          <div
                            className="remove_button"
                            onClick={() =>
                              handleRemovePartner(partner, group.id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 384 512"
                            >
                              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L237.3 256 342.6 150.6z" />
                            </svg>
                          </div>
                          <span
                            className={`name-icon name-icon${index} student-name-icon`}
                          >
                            {getFirstAndLastNameIcon(partner)}
                          </span>
                        </div>
                      );
                    })}
                    <i
                      className="bi bi-plus"
                      onClick={() => handleAddNewPartner(group)}
                    ></i>
                  </li>
                </>
              );
            }
            return null;
          })}
        </ul>

        <div className="assignment-header">
          {showUserICon && (
            <div className="add-partner-human-icon">
              <div className="user-icon">
                <i
                  className="fas fa-thin fa-user-plus"
                  onClick={handleUserIconClick}
                ></i>
                <i
                  class="bi bi-arrow-left-square-fill right-side-panel-icon"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                ></i>
              </div>
            </div>
          )}
        </div>
        {showContent && (
          <>
            <div className="selected_names">
              <ul>
                {selectedNames.map((name, index) => (
                  <li key={index}>
                    <div className={`name-icon name-icon${index}`}>
                      <span>{getFirstAndLastNameIcon(name)}</span>
                    </div>
                    <div
                      className="remove_button"
                      onClick={() => handleRemoveSelected(name)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L237.3 256 342.6 150.6z" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="names_list">
              <div className="create-group-button">
                <button
                  type="submit"
                  onClick={() => handleCreateGroup(putRequest)}
                >
                  {groupCreated ? "Add to Group" : "Create Group"}
                  <i class="material-icons"></i>
                </button>
              </div>

              <input
                type="text"
                placeholder="Search Names"
                value={searchText}
                onChange={handleSearchChange}
              />
              <select
                multiple
                onChange={handleNameSelect}
                value={selectedNames}
              >
                {studentsInCourse &&
                  studentsInCourse.map((student, index) => {
                    return (
                      <option key={index + 1} value={student}>
                        {getNumberOfUsers(student)}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="generated-group">
            </div>
          </>
        )}
      </div>
      <div className="right-side-panel-groups-section">
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">
              Assignments
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body p-0 pt-3">
            {assignmentData &&
              assignmentData.map((assignment) => {
                return (
                  <div className="assignment-name-main-section">
                    <p>
                      <SingleAssignment assignment={assignment} />
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="">
        <button className="btn btn-primary" type="button" onClick={() => handleSave()}>save</button>
      </div>
    </div>
  );
};

export default AssignmentPartners;

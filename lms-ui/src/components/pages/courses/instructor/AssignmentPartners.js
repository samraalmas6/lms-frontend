import React, { useState } from "react";
// import "../styles/AssignmentPartner.css";
import "../../../styles/AssignmentPartner.css";
import { useEffect } from "react";
import SingleGroup from "./SingleGroup";
import SingleAssignment from "./SingleAssignment";

const AssignmentPartners = ({
  courseID,
  assignmentId,
  userData,
  studentsInCourse,
  setStudentsInCourse,
}) => {
  const assignmentGroup = [
    {
      id: 1,
      assignment: 19,
    },
    {
      id: 2,
      assignment: 19,
    },
    {
      id: 3,
      assignment: 19,
    },
  ];
  // const groupPartners = [
  //   {
  //     id: 1,
  //     assignment_group: 1,
  //     partners: [30, 31],
  //   },
  //   {
  //     id: 2,
  //     assignment_group: 2,
  //     partners: [27, 29],
  //   },
  //   {
  //     id: 3,
  //     assignment_group: 3,
  //     partners: [28],
  //   },
  //   {
  //     id: 4,
  //     assignment_group: 1,
  //     partners: [29, 30],
  //   },
  // ];

  const userId = sessionStorage.getItem("user_id");
  const userRole = sessionStorage.getItem("role");
  // --------------------------------------------
  const [selectedNames, setSelectedNames] = useState([]);
  const [lastSelectedNames, setLastSelectedNames] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  // const [groups, setGroups] = useState([[]]); // Initialize with an empty group
  const [removedNames, setRemovedNames] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0); // Initialize to the first group
  const [filteredNames, setFilteredNames] = useState([]);
  const [groupCreated, setGroupCreated] = useState(false); // Track whether a group has been created
  const [courseContent, setCourseContent] = useState([]);
  const [assignmentData, setAssignmentData] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showUserICon, setShowUserIcon] = useState(true);

  const [assignmentGroupIds, setAssignmentGroupIds] = useState([]);
  const [group, setGroup] = useState([]);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [partnerId, setPartnerId] = useState(null)

  console.log("assignment group ids", assignmentGroupIds);

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
            // setAllGroupsData(result)
            result.forEach((group) => {
              if (group.assignment === assignmentId) {
                setAssignmentGroupIds((pre) => [...pre, group.id]);
              }
            });

            // setGroup(result);
          });
        } else {
          console.log(response);
          // setGroup([]);
        }
      });
    };
    getAssignmentGroupData();
  }, [userData]);

  useEffect(() => {
    setFilteredNames(userData);
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
  }, [0]);

  const updateFilteredNames = () => {
    // const newFilteredNames = allNames.filter(
    //   (name) =>
    //     !groupMembers.includes(name) &&
    //     !lastSelectedNames.includes(name) &&
    //     !removedNames.includes(name)
    // );
    // // Add names from selectedNames that are not already in newFilteredNames
    // selectedNames.forEach((name) => {
    //   if (!newFilteredNames.includes(name)) {
    //     newFilteredNames.push(name);
    //   }
    // });
    // newFilteredNames.sort(); // Sort the names if needed
    // setFilteredNames(newFilteredNames);
  };

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

  const handleAddToGroup = () => {
    // if (selectedNames.length > 0) {
    //   const updatedGroups = [...groups];
    //   updatedGroups[selectedGroupIndex] = [
    //     ...updatedGroups[selectedGroupIndex],
    //     ...selectedNames,
    //   ];
    //   setGroups(updatedGroups);
    //   const updatedGroupMembers = [...groupMembers, ...selectedNames];
    //   setGroupMembers(updatedGroupMembers);
    //   const updatedFilteredNames = filteredNames.filter(
    //     (name) => !selectedNames.includes(name)
    //   );
    //   // Add back any names that were previously removed from the group
    //   removedNames.forEach((name) => {
    //     if (!updatedFilteredNames.includes(name)) {
    //       updatedFilteredNames.push(name);
    //     }
    //     setFilteredNames(updatedFilteredNames);
    //   });
    //   setSelectedNames([]);
    //   setGroupCreated(true);
    // }
  };

  const handleRemoveSelected = (nameToRemove) => {
    const updatedSelectedNames = selectedNames.filter(
      (name) => name !== nameToRemove
    );
    setSelectedNames(updatedSelectedNames);

    // Add the removed name to the removedNames state
    setRemovedNames([...removedNames, nameToRemove]);
  };

  const handleRemoveFromGroup = (groupIndex, nameToRemove) => {
    // const updatedGroups = [...groups];
    // const groupToUpdate = updatedGroups[groupIndex];
    // // Remove the selected name from the group
    // const updatedGroup = groupToUpdate.filter((name) => name !== nameToRemove);
    // updatedGroups[groupIndex] = updatedGroup;
    // setGroups(updatedGroups);
    // // Check if the removed name is not in selectedNames
    // if (!selectedNames.includes(nameToRemove)) {
    //   // Add the removed name back to filteredNames
    //   const updatedFilteredNames = [...filteredNames, nameToRemove];
    //   setFilteredNames(updatedFilteredNames);
    // }
    // // Remove the group header if the group is empty
    // if (updatedGroups[groupIndex].length === 0) {
    //   updatedGroups.splice(groupIndex, 1);
    // }
    // setGroups(updatedGroups);
  };

  const handleCreateGroup = (groupCreated) => {
    let URL = ""
    let method = ""
    if(groupCreated) {
      URL = `http://localhost:8000/api/assignment_partners/${partnerId}/`
      method = "PUT"
    }
    else {
      URL= "http://localhost:8000/api/assignment_partners/"
      method = "POST"
    }
    // const obj = {
    //   id: groupPartners.length + 1,
    //   assignment_group: 3,
    //   partners: selectedNames,
    // };
    // setGroup((pre) => [...pre, obj]);
    // groupPartners.push(obj);
    if (selectedNames.length > 0) {
      // setGroup(selectedNames);
      // setGroups((pre) => [...pre, selectedNames]);

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
        if (response.status === 201 || response.status === 200) {
          response.json().then(function (result) {
            // setStudentsInCourse([])
            console.log("Api Partner Result: ", result);
            const updatedStudentsInCourse = studentsInCourse.filter(
              (student) => !result.partners.includes(student)
            );
            if (studentsInCourse.length === 0) {
              setShowUserIcon(false);
            }

            setStudentsInCourse(updatedStudentsInCourse);
            setGroup((pre) => [...pre, result]);
          });
        } else {
          console.log(response);
        }
      });

      // const updatedGroups = [...groups];
      // updatedGroups[selectedGroupIndex] = [
      //   ...updatedGroups[selectedGroupIndex],
      //   ...selectedNames,
      // ];
      // setGroups(updatedGroups);

      // const updatedGroupMembers = [...groupMembers, ...selectedNames];
      // setGroupMembers(updatedGroupMembers);

      // const updatedFilteredNames = filteredNames.filter(
      //   (name) => !selectedNames.includes(name)
      // );
      // setFilteredNames(updatedFilteredNames);

      // // Remove the selected names from the removedNames state
      // const updatedRemovedNames = removedNames.filter(
      //   (name) => !selectedNames.includes(name)
      // );
      // setRemovedNames(updatedRemovedNames);

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
    setShowContent(true)
    setSelectedNames(group.partners)
    setGroupCreated(true)
    setGroupId(group.assignment_group)
    setPartnerId(group.id)
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

  console.log("created Group", groups);
  // const handleFirstAndLastLetter = (name) => {
  //   const nameParts = name.split(" ");
  //   if (nameParts.length > 0) {
  //     const firstNameFirstLetter = nameParts[0].charAt(0).toUpperCase();
  //     const lastNameFirstLetter = nameParts[nameParts.length - 1]
  //       .charAt(0)
  //       .toUpperCase();
  //     return `${firstNameFirstLetter}${lastNameFirstLetter}`;
  //   } else {
  //     return "Invalid name format. Please provide a full name with a space in between.";
  //   }
  // };

  const getFirstAndLastName = (id) => {
    const coAuthors = userData.filter((user) => {
      return user.id === +id;
    });
    return `${coAuthors[0].first_name} ${coAuthors[0].last_name}`;
  };

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
    <div>
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
                <button type="submit" onClick={() => handleCreateGroup(groupCreated)}>
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
              {/* <div className="list-header-container">
                <h4>People</h4>
              </div> */}
              {/* 
              {groupCreated &&
                groups.map((group, groupIndex) => (
                  <div key={groupIndex} className="group">
                    {group.map((name, nameIndex) => (
                      <div key={nameIndex} className="group-member">
                        <div
                          className={`name-initials name-initials${nameIndex}`}
                        >
                          <span>{getFirstAndLastNameIcon(name)}</span>
                        </div>
                        {getNumberOfUsers(name)}
                        <span
                          className="remove-from-group"
                          onClick={() =>
                            handleRemoveFromGroup(groupIndex, name)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 384 512"
                          >
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L237.3 256 342.6 150.6z"></path>
                          </svg>
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
             */}
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
    </div>
  );
};

export default AssignmentPartners;

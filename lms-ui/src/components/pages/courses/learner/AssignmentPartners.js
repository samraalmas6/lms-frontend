import React, { useState } from "react";
// import "../styles/AssignmentPartner.css";
import "../../../styles/AssignmentPartner.css";
import { useEffect } from "react";

const AssignmentPartners = ({courseID,userData,studentsInCourse}) => {
  const userId = sessionStorage.getItem("user_id");
  const userRole = sessionStorage.getItem("role");
  // --------------------------------------------
  const [selectedNames, setSelectedNames] = useState([]);
  const [lastSelectedNames, setLastSelectedNames] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [groups, setGroups] = useState([[]]); // Initialize with an empty group
  const [removedNames, setRemovedNames] = useState([]);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0); // Initialize to the first group
  const [filteredNames, setFilteredNames] = useState([]);
  const [groupCreated, setGroupCreated] = useState(false); // Track whether a group has been created
  const [courseContent, setCourseContent] = useState([]);

  const mockData = [
    { firstName: "Abeera", lastName: "Arshad", color: "blue" },
    { firstName: "Samara", lastName: "Mohsin", color: "green" },
    { firstName: "Samra", lastName: "Almas", color: "red" },
    { firstName: "Hammad", lastName: "Siddiqui", color: "red" },
    { firstName: "Muhammad", lastName: "Humza", color: "red" },
    { firstName: "Mohsen", lastName: "Ali", color: "red" },
  ];

  const allNames = mockData.map((data) => `${data.firstName} ${data.lastName}`);



  //   const updateFilteredNames = () => {
  //     const newFilteredNames = allNames.filter(
  //       (name) =>
  //         !groupMembers.includes(name) &&
  //         !lastSelectedNames.includes(name) &&
  //         !removedNames.includes(name) &&
  //         name.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setFilteredNames(newFilteredNames);
  //   };

  const updateFilteredNames = () => {
    const newFilteredNames = allNames.filter(
      (name) =>
        !groupMembers.includes(name) &&
        !lastSelectedNames.includes(name) &&
        !removedNames.includes(name)
    );

    // Add names from selectedNames that are not already in newFilteredNames
    selectedNames.forEach((name) => {
      if (!newFilteredNames.includes(name)) {
        newFilteredNames.push(name);
      }
    });

    newFilteredNames.sort(); // Sort the names if needed
    setFilteredNames(newFilteredNames);
  };

  React.useEffect(() => {
    updateFilteredNames();
  }, [groupMembers, lastSelectedNames, searchText, removedNames]);

  const handleNameSelect = (event) => {
    const name = event.target.value;
    console.log("selected name:",name)
    if (name && !selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  //   const handleAddToGroup = () => {
  //     if (selectedNames.length > 0) {
  //       const updatedGroups = [...groups];
  //       updatedGroups[selectedGroupIndex] = [
  //         ...updatedGroups[selectedGroupIndex],
  //         ...selectedNames,
  //       ];
  //       setGroups(updatedGroups);

  //       const updatedGroupMembers = [...groupMembers, ...selectedNames];
  //       setGroupMembers(updatedGroupMembers);

  //       const updatedFilteredNames = filteredNames.filter(
  //         (name) => !selectedNames.includes(name)
  //       );
  //       setFilteredNames(updatedFilteredNames);

  //       // Remove the selected names from the removedNames state
  //       const updatedRemovedNames = removedNames.filter(
  //         (name) => !selectedNames.includes(name)
  //       );
  //       setRemovedNames(updatedRemovedNames);

  //       setSelectedNames([]);
  //       setGroupCreated(true);
  //     }
  //   };

  const handleAddToGroup = () => {
    if (selectedNames.length > 0) {
      const updatedGroups = [...groups];
      updatedGroups[selectedGroupIndex] = [
        ...updatedGroups[selectedGroupIndex],
        ...selectedNames,
      ];
      setGroups(updatedGroups);
      const updatedGroupMembers = [...groupMembers, ...selectedNames];
      setGroupMembers(updatedGroupMembers);
      const updatedFilteredNames = filteredNames.filter(
        (name) => !selectedNames.includes(name)
      );
      // Add back any names that were previously removed from the group
      removedNames.forEach((name) => {
        if (!updatedFilteredNames.includes(name)) {
          updatedFilteredNames.push(name);
        }
        setFilteredNames(updatedFilteredNames);
      });
      setSelectedNames([]);
      setGroupCreated(true);
    }
  };

  const handleRemoveSelected = (nameToRemove) => {
    const updatedSelectedNames = selectedNames.filter(
      (name) => name !== nameToRemove
    );
    setSelectedNames(updatedSelectedNames);

    // Add the removed name to the removedNames state
    setRemovedNames([...removedNames, nameToRemove]);
  };

  //   const handleRemoveFromGroup = (groupIndex, nameToRemove) => {
  //     const updatedGroups = [...groups];
  //     const groupToUpdate = updatedGroups[groupIndex];
  //     // Remove the selected name from the group
  //     const updatedGroup = groupToUpdate.filter((name) => name !== nameToRemove);
  //     updatedGroups[groupIndex] = updatedGroup;
  //     setGroups(updatedGroups);

  //     // Add the removed name back to filteredNames
  //     const updatedFilteredNames = [...filteredNames, nameToRemove];
  //     setFilteredNames(updatedFilteredNames);

  //     // Remove the group header if the group is empty
  //     if (updatedGroups[groupIndex].length === 0) {
  //       updatedGroups.splice(groupIndex, 1);
  //     }

  //     setGroups(updatedGroups);
  //   };

  const handleRemoveFromGroup = (groupIndex, nameToRemove) => {
    const updatedGroups = [...groups];
    const groupToUpdate = updatedGroups[groupIndex];
    // Remove the selected name from the group
    const updatedGroup = groupToUpdate.filter((name) => name !== nameToRemove);
    updatedGroups[groupIndex] = updatedGroup;
    setGroups(updatedGroups);

    // Check if the removed name is not in selectedNames
    if (!selectedNames.includes(nameToRemove)) {
      // Add the removed name back to filteredNames
      const updatedFilteredNames = [...filteredNames, nameToRemove];
      setFilteredNames(updatedFilteredNames);
    }

    // Remove the group header if the group is empty
    if (updatedGroups[groupIndex].length === 0) {
      updatedGroups.splice(groupIndex, 1);
    }

    setGroups(updatedGroups);
  };

  const handleCreateGroup = () => {
    if (selectedNames.length > 0) {
      const updatedGroups = [...groups];
      updatedGroups[selectedGroupIndex] = [
        ...updatedGroups[selectedGroupIndex],
        ...selectedNames,
      ];
      setGroups(updatedGroups);

      const updatedGroupMembers = [...groupMembers, ...selectedNames];
      setGroupMembers(updatedGroupMembers);

      const updatedFilteredNames = filteredNames.filter(
        (name) => !selectedNames.includes(name)
      );
      setFilteredNames(updatedFilteredNames);

      // Remove the selected names from the removedNames state
      const updatedRemovedNames = removedNames.filter(
        (name) => !selectedNames.includes(name)
      );
      setRemovedNames(updatedRemovedNames);

      setSelectedNames([]);
      setGroupCreated(true);
      

    }
  };

  const handleFirstAndLastLetter = (name) => {
    const nameParts = name.split(" ");
    if (nameParts.length > 0) {
      const firstNameFirstLetter = nameParts[0].charAt(0).toUpperCase();
      const lastNameFirstLetter = nameParts[nameParts.length - 1]
        .charAt(0)
        .toUpperCase();
      return `${firstNameFirstLetter}${lastNameFirstLetter}`;
    } else {
      return "Invalid name format. Please provide a full name with a space in between.";
    }
  };

  const getNumberOfUsers = (stuId) => {
   const student = userData.filter(user => {
      return user.id == stuId
    })
    if( student.length ===0){
      return null
    }
    else{
      
    return `${student[0].first_name} ${student[0].last_name}`
    }
    // let totalUsers = [];
    // if (teamData.length === 0){
    //   console.log("team",teamData)
    //   for (const team of teamData) {        
          
    //     if (team.courses.includes(courseID)) {
    //       // totalUsers += team.users.length;

    //       totalUsers.push(team.users);
    //     }
    //   } 
    //   console.log("users in a course",courseID)
    // }
   
   
    // return totalUsers;
  };

  

  // console.log("courses in a team: ",teamData[0].courses)

  return (
    <div>
      <div className="main_container">
        <div className="assignment-header"></div>
        <div className="selected_names">
          <ul>
            {selectedNames.map((name, index) => (
              <li key={index}>
                <div className={`name-icon name-icon${index}`}>
                  {handleFirstAndLastLetter(name)}
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
        {/* <ul>
          {studentsInCourse && studentsInCourse.map((student,index) => {
            return(
            <li>
                {getNumberOfUsers(student)}
            </li>
            )
          })}
        
        </ul> */}
        </div>
        <div className="names_list">
          <div className="create-group-button">
            <button
              type="submit"
              onClick={() => 
              //   {
              //   if (groupCreated) {
              //     handleAddToGroup();
              //   } else {
              //     handleCreateGroup();
              //   }
              // }
              handleCreateGroup()
            }
            >
              {groupCreated ? "Add to Group" : "Create Group"}
              <i class="material-icons"></i>
            </button>
          </div>

        

          {/* <div className="list-header-container">
            <p>People</p>
            <button
              type="submit"
              onClick={() => {
                if (groupCreated) {
                  handleAddToGroup();
                } else {
                  handleCreateGroup();
                }
              }}
            >
              {groupCreated ? "Add to Group" : "Create Group"}
              <i class="material-icons"></i>
            </button>
          </div> */}
          <input
            type="text"
            placeholder="Search Names"
            value={searchText}
            onChange={handleSearchChange}
          />
          <select multiple onChange={handleNameSelect} value={selectedNames}>
            {filteredNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
             {/* {studentsInCourse && studentsInCourse.map((student,index) => {
            return(
            <option key={index} value= {getNumberOfUsers(student)}>
                {getNumberOfUsers(student)}
            </option>
            )
          })} */}
          </select>
        </div>
        <div className="generated-group">
          {/* {selectedNames.map((name, index) => (
              <li key={index}>
                <div className={`name-icon name-icon${index}`}>
                  {handleFirstAndLastLetter(name)}
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
            ))} */}
          <div className="list-header-container">
            <h4>People</h4>
          </div>
          {groupCreated &&
            groups.map((group, groupIndex) => (
              <div key={groupIndex} className="group">
                {/* <div className="group-header">Group {groupIndex + 1}</div> */}
                {group.map((name, nameIndex) => (
                  <div key={nameIndex} className="group-member">
                    <div className={`name-initials name-initials${nameIndex}`}>
                      {handleFirstAndLastLetter(name)}
                    </div>
                    {name}
                    <span
                      className="remove-from-group"
                      onClick={() => handleRemoveFromGroup(groupIndex, name)}
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
        </div>
      </div>
    </div>
  );
};

export default AssignmentPartners;

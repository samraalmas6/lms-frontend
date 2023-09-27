import React from "react";
import { useState } from "react";
import "../../../styles/AssignmentPartner.css";

const AssignmentPartners = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const [lastSelectedNames, setLastSelectedNames] = useState([]); // Track last selected names
  const [searchText, setSearchText] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [groups, setGroups] = useState([]); // Store all created groups here
  const [removedNames, setRemovedNames] = useState([]);

  // const allNames = [
  //   "John Martin",
  //   "Jane Grek",
  //   "Alice Shack",
  //   "Bob Williams",
  //   "Mark Butchar",
  //   "Bruce Wayne",
  // ];

  const mockData = [
    { firstName: 'Abeera', lastName: 'Arshad', color: 'blue' },
    { firstName: 'Samara', lastName: 'Mohsin', color: 'green' },
    { firstName: 'Samra', lastName: 'Almas', color: 'red' },
    { firstName: 'Hammad', lastName: 'Siddiqui', color: 'red' },
    { firstName: 'Muhammad', lastName: 'Humza', color: 'red' },
    { firstName: 'Mohsen', lastName: 'Ali', color: 'red' },

  ];

  const allNames = mockData.map((data) => `${data.firstName} ${data.lastName}`);

  const filteredNames = allNames.filter(
    (name) =>
      !groupMembers.includes(name) &&
      // !selectedNames.includes(name) &&
      !lastSelectedNames.includes(name) && // Exclude last selected names
      name.toLowerCase().includes(searchText.toLowerCase())
  );

  removedNames.forEach((name) => {
    if (!filteredNames.includes(name)) {
      filteredNames.push(name);
    }
  });

  const handleNameSelect = (event) => {
    const name = event.target.value;
    if (name && !selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // const AddToGroup = () => {
  //   if (selectedNames.length > 0) {
  //     // Add selected names to the group members
  //     setGroupMembers([...groupMembers, ...selectedNames]);

  //     // Set last selected names
  //     setLastSelectedNames([...selectedNames]);

  //     // Clear selectedNames
  //     setSelectedNames([]);
  //   }
  // };

  // const handleAddToGroup = () => {
  //   if (selectedNames.length > 0) {
  //     Add selected names to the group members
  //     setGroupMembers([...groupMembers, ...selectedNames]);

  //     Set last selected names
  //     setLastSelectedNames([...selectedNames]);

  //     Clear selectedNames
  //     setSelectedNames([]);
  //   }
  // };

  const handleAddToGroup = () => {
    return new Promise((resolve, reject) => {
      if (selectedNames.length > 0) {
        // Add selected names to the group members
        setGroupMembers([...groupMembers, ...selectedNames]);

        // Set last selected names
        setLastSelectedNames([...selectedNames]);

        // Clear selectedNames
        setSelectedNames([]);
      }
      resolve();
    });
  };

  // const handleCreateGroup = () => {
  //   return new Promise((resolve, reject) => {
  //     if (lastSelectedNames.length > 0) {
  //       // yahan prr hn ...selectedNames use krr rhy thy to ek to wo sb names leke aarha tha list se
  //       // tou ek new state bnai jis me hmne last selected names ko manage kiya
  //       const newGroup = [...lastSelectedNames];
  //       setGroups([...groups, newGroup]);

  //       // Clear lastSelectedNames
  //       // or yahan aake us last selected names ko array se remove krr diya
  //       setLastSelectedNames([]);
  //     }
  //     resolve();
  //   });
  // };

  // const CreateGroup = () => {
  //   if (lastSelectedNames.length > 0) {
  //     // yahan prr hn ...selectedNames use krr rhy thy to ek to wo sb names leke aarha tha list se
  //     // tou ek new state bnai jis me hmne last selected names ko manage kiya
  //     const newGroup = [...lastSelectedNames];
  //     setGroups([...groups, newGroup]);

  //     // Clear lastSelectedNames
  //     // or yahan aake us last selected names ko array se remove krr diya
  //     setLastSelectedNames([]);
  //   }
  // };

  // const handleCreateGroupButton = () => {
  //   AddToGroup();
  //   CreateGroup();
  // }

  const handleRemoveSelected = (nameToRemove) => {
    console.log("svg clicked for functionality");
    const updatedSelectedNames = selectedNames.filter(
      (name) => name !== nameToRemove
    );
    setSelectedNames(updatedSelectedNames);
  };

  const handleRemoveFromGroup = (groupIndex, nameToRemove) => {
    const updatedGroups = [...groups];
    const removedName = updatedGroups[groupIndex].splice(
      updatedGroups[groupIndex].indexOf(nameToRemove),
      1
    )[0];
    if (updatedGroups[groupIndex].length === 0) {
      updatedGroups.splice(groupIndex, 1);
    }
    setGroups(updatedGroups);
    // Add the removed name back to the removed names state
    setRemovedNames([...removedNames, removedName]);
  };

  const handleFirstAndLastLetter = (name) => {
    // console.log("func call hua ha");
    // const fullName = "Samra Almas";
    // Split the name into parts
    const nameParts = name.split(" ");
    if (nameParts.length > 0) {
      // Extract the first letter of the first name
      const firstNameFirstLetter = nameParts[0].charAt(0).toUpperCase();
      // Extract the first letter of the last name
      const lastNameFirstLetter = nameParts[nameParts.length - 1]
        .charAt(0)
        .toUpperCase();
      // Display the first letters on the console
      return `${firstNameFirstLetter}${lastNameFirstLetter}`;
    } else {
      return "Invalid name format. Please provide a full name with a space in between.";
    }
  };


  const handleCreateGroup = () => {
    if (lastSelectedNames.length > 0 || selectedNames.length > 0) {
      const newGroup = [...lastSelectedNames, ...selectedNames];      
      setGroups([...groups, newGroup]);
      setGroupMembers([...groupMembers, ...newGroup]);
      setLastSelectedNames([]);
      setSelectedNames([]);
    }
  };
  const randomDecimal = Math.random();


  return (
    <div>
      <div className="main_container">
        <div className="selected_names">
          {/* <h4>Selected Names</h4> */}
          <ul>
            {selectedNames.map((name, index) => (
              <li key={index}>
                <div className={`name-icon name-icon${index}`}>
                        {handleFirstAndLastLetter(name)}
                      </div>
                {/* {name} */}
                
                <div
                  className="remove_button"
                  onClick={() => handleRemoveSelected(name)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 384 512"
                  >
                  <style>{"color: #FFFFFF;"}</style>
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                  {/* <i class="fa-solid fa-xmark" style="color: #FFFFFF;"></i> */}

                </div>
                {/* <button
                  className="remove_button"
                  onClick={() => handleRemoveSelected(name)}
                >
                  Remove
                </button> */}
              </li>
            ))}
          </ul>
        </div>
        {/* <h1 className="heading">Create Group</h1> */}
        <div className="names_list">
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
          </select>
          
        </div>

        <button className="create_button" onClick={handleCreateGroup}>
          Create Group
        </button>
        <div className="group_container">
          <h2>Created Groups</h2>
          <ul>
            {groups.map((group, groupIndex) => (
              <li key={groupIndex}>
                Group {groupIndex + 1}:
                <ul className="group-members-container">
                  {
                  group.map((name, nameIndex) => (
                    <li key={nameIndex} className="group-name-list">
                      <div className={`name-icon name-icon${nameIndex}`}>
                        {handleFirstAndLastLetter(name)}
                      </div>
                      {/* {name} */}
                      <div
                        className="remove_button"
                        onClick={() => handleRemoveFromGroup(groupIndex, name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 384 512"
                        >
                          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPartners;

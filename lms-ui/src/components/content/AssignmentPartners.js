import React from "react";
import { useState } from "react";

const AssignmentPartners = () => {
  const [selectedNames, setSelectedNames] = useState([]);
  const [lastSelectedNames, setLastSelectedNames] = useState([]); // Track last selected names
  const [searchText, setSearchText] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [groups, setGroups] = useState([]); // Store all created groups here

  const allNames = [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Mark",
    "Wayne",
    // Add more names here
  ];

  const filteredNames = allNames.filter(
    (name) =>
      !groupMembers.includes(name) &&
      // !selectedNames.includes(name) &&
      !lastSelectedNames.includes(name) && // Exclude last selected names
      name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleNameSelect = (event) => {
    const name = event.target.value;
    if (name && !selectedNames.includes(name)) {
      setSelectedNames([...selectedNames, name]);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleAddToGroup = () => {
    if (selectedNames.length > 0) {
      // Add selected names to the group members
      setGroupMembers([...groupMembers, ...selectedNames]);

      // Set last selected names
      setLastSelectedNames([...selectedNames]);

      // Clear selectedNames
      setSelectedNames([]);
    }
  };

  const handleCreateGroup = () => {
    if (lastSelectedNames.length > 0) {
      // yahan prr hn ...selectedNames use krr rhy thy to ek to wo sb names leke aarha tha list se
      // tou ek new state bnai jis me hmne last selected names ko manage kiya
      const newGroup = [...lastSelectedNames];
      setGroups([...groups, newGroup]);

      // Clear lastSelectedNames
      // or yahan aake us last selected names ko array se remove krr diya
      setLastSelectedNames([]);
    }
  };

  const handleRemoveSelected = (nameToRemove) => {
    const updatedSelectedNames = selectedNames.filter(
      (name) => name !== nameToRemove
    );
    setSelectedNames(updatedSelectedNames);
  };

  return (
    <div>
      <div className="main_container">
        <h1 className="heading">Create Group</h1>
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
          <button onClick={handleAddToGroup}>Add to Group</button>
        </div>
        <div className="selected_names">
          <h2>Selected Names</h2>
          <ul>
            {selectedNames.map((name, index) => (
              <li key={index}>
                {name}
                <button
                  className="remove_button"
                  onClick={() => handleRemoveSelected(name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button className="create_button" onClick={handleCreateGroup}>
            Create Group
          </button>
        </div>
        <div className="group_container">
          <h2>Created Groups</h2>
          <ul>
            {groups.map((group, index) => (
              <li key={index}>
                Group {index + 1}:
                <ul>
                  {group.map((name, nameIndex) => (
                    <li key={nameIndex}>{name}</li>
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

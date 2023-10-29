import React, { useEffect, useState } from "react";
import SingleGroup from "./SingleGroup";
import '../../../styles/SingleAssignment.css'

const SingleAssignment = ({ assignment }) => {
  const [allGroupsData, setAllGroupsData] = useState([]);
  const [particularGroup, setParticularGroup] = useState([]);
  const [showGroup, setShowGroup] = useState(false)
  useEffect(() => {
    const getAssignmentGroupData = () => {
      fetch("http://127.0.0.1:8000/api/assignment_partners_group/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            setAllGroupsData(result);
            //     result.forEach((group) => {
            //       if (group.assignment === assignmentId) {
            //         setAssignmentGroupIds((pre) => [...pre, group.id]);
            //       }
            //     });

            //     // setGroup(result);
          });
        } else {
          console.log(response);
          // setGroup([]);
        }
      });
    };
    getAssignmentGroupData();
  }, [0]);

  const handleGetGroups = (id) => {
    setShowGroup(!showGroup)
    const groups = allGroupsData.filter((group) => {
      return group.assignment === +id;
    });
    setParticularGroup(groups);
    console.log("particular group", groups);
  };

  return (
    <div>
      <div className="assignment-title" onClick={() => handleGetGroups(assignment.id)}>
        {assignment.title}
      </div>

      <div className="">
        {(particularGroup && showGroup) &&
          particularGroup.map((group, i) => {
            return <SingleGroup group={group} i={i} />;
          })}
      </div>
    </div>
  );
};

export default SingleAssignment;

import React, { useContext, useEffect, useState } from 'react'
import SinglePartner from './SinglePartner';

const SingleGroup = ({group,i}) => {

    const [allPartnersData, setAllPartnersData] = useState([]);
    const [particularPartner, setParticularPartner] = useState([]);
    const [userData, setUserData] = useState([])
    const [showPartner, setShowPartner] = useState(false)


    useEffect(() => {

        const getUserData = () => {
            fetch("http://127.0.0.1:8000/list_all_users/", {
              method: "GET",
              headers: {
                Authorization: `Token ${sessionStorage.getItem("user_token")}`,
              },
            }).then((response) => {
              if (response.status === 200) {
                response.json().then(function (result) {
                  // console.log(result);
                  setUserData(result);
                  console.log("userData: ", result);
                });
              } else {
                console.log(response);
              }
            });
          };
        

        const getAssignmentPartnerData = () => {
          fetch("http://127.0.0.1:8000/api/assignment_partners/", {
            method: "GET",
            headers: {
              Authorization: `Token ${sessionStorage.getItem("user_token")}`,
            },
          }).then((response) => {
            if (response.status === 200) {
              response.json().then(function (result) {
                setAllPartnersData(result);
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
        getAssignmentPartnerData();
        getUserData()
      }, [0]);


    const handleGetPartners = (id) => {
        setShowPartner(!showPartner)
        const partners = allPartnersData.filter((partner) => {
            return partner.assignment_group === +id;
          });
          setParticularPartner(partners);
          console.log("particular partner", partners);
    }
  return (
    <div onClick={() => handleGetPartners(group.id)}>
        <div className="group-title">
        {`Group ${i+1}`}
        </div>
        <div className="" style={{ marginLeft: '50px'}}>
            {
                (particularPartner && showPartner) && particularPartner.map(partner => {
                    return(
                       <SinglePartner partner={partner.partners} userData={userData} />
                    )
                })
            }
        </div>
 
    </div>
  )
}

export default SingleGroup

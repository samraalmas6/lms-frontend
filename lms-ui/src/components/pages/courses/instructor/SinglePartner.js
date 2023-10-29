import React from "react";

const SinglePartner = ({ partner, userData }) => {
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
  console.log("partner in partner component", userData);
  return (
    <div className="">
      <ul className="student-name-ul-tag m-0 p-0">
        <li className="learner-name-list"
        style={{ display: "flex"}}
        >
          {partner &&
            partner.map((partner, index) => {
              return (
                <div
                  className={`name-icon name-icon${index} learner-name-icon`}
                >
                  {getFirstAndLastNameIcon(partner)}
                </div>
              );
            })}
        </li>
      </ul>
    </div>
  );
};

export default SinglePartner;

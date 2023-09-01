
import React, { useEffect, useRef, useState } from "react";



const teamData = [
    {
    id: 1,
    TeamName: "Team B",
    Users: ["User 3", "User 4"],
    Courses: ["Course 3", "Course 4"]
        
        
    },
    {
        id: 2,
        TeamName: "Team A",
        Users: ["User 1" , "User 2"],
        Courses: ["Course 1" , "Course 2"]
        
    }

]

const MainListpage = () => {
  const [showBlock, setShowBlock] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [category, setCategory] = useState("");



  const handleCategoryTitle = (e) => {
    setCategoryTitle(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (categoryTitle) {
      const obj = {
        id: teamData[teamData.length - 1].id + 1,
        course_title: categoryTitle,
        author: "",
        duration: 25,
        users_enrolled: 0,
        last_updated: "3 hours ago",
      };
      teamData.push(obj);
    }
    setCategory("");
    setCategoryTitle("");
  };

  // console.log(process.env.REACT_APP_API_KEY);

  return (
    <div>
      <div className="all-course-content">
        <div className="creat-course-btn">
          <button
            type="button"
            className="btn btn-primary ms-3 mb-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fas fa-solid fa-plus"></i> Add Category
          </button>
          {/* This is for Category panel */}
        </div>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Add Category
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="add-category-content">
              <form>
                <label className="mb-0">
                  Title<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  value={categoryTitle}
                  onChange={handleCategoryTitle}
                  required
                />
                <label className="mb-0 mt-1">Category</label>
                <select onChange={handleCategory} value={category}>
                  <option value="">--Select Category--</option>
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                  <option value="Category 4">Category 4</option>
                  <option value="Category 5">Category 5</option>
                </select>
                <div className="category-save-btn">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* This is for Course Content */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          style={{ width: "87%" }}
          id="offcanvasCourse"
          aria-labelledby="offcanvasRightLabel"
        >
          {/* <AddTeam  teamData={ teamData } /> */}

        </div>
        {!showBlock ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Names</th>
                <th scope="col">Users</th>
                <th scope="col">Courses</th>
                 </tr>
            </thead>
            <tbody>
              {teamData.map((teamData) => {
                return (
                  <tr
                    key={teamData.id}
                    role="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCourse"
                    aria-controls="offcanvasRight"
                  >
                    <td >{teamData.TeamName}</td>
                    <td>{teamData.Users.join(', ')}</td>
                    <td>{teamData.Courses.join(', ')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        
        )}
      </div>
    </div>
  );
};

export default MainListpage;




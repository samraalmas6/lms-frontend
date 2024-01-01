import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { writeFile } from "xlsx";


const UnitResourse = () => {
  const {state} = useLocation();
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLinks, setResourceLinks] = useState([]);

  const handleResourceTitle = (e) => {
    setResourceTitle(e.target.value);
  };

  const handleResourceLinks = (e) => {
    setResourceLinks(e.target.value);
  };

  const handleSubmit = (e) => {    
    e.preventDefault();
    const file = new File([resourceLinks], `${state.unit.title}-resource.txt` )
    const formData = new FormData();
    formData.append("title", resourceTitle);
    formData.append("unit", state.unit.id)
    formData.append("instructor", state.unit.instructor);
    formData.append("updated_by", sessionStorage.getItem('user_id'));
    formData.append("resource", file);

    fetch(`http://localhost:8000/api/resources/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          // "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log(result);
          });
        } else {
          console.log(response);
        }
      });
  };

  return (
    <div>
      <div className="assignment-details mt-2">
        <form>
          <i className="fas fa-pen"></i>
          <input
            type="text"
            placeholder="Title"
            value={resourceTitle}
            // className="assignment-screen-input-field "
            onChange={(e) => handleResourceTitle(e)}
          />
        </form>
        <div className="editor-container">
          <div className="resource-link-container">
            <i class="fas fa-link"></i>
            <textarea
              cols="136"
              rows="25"
              placeholder="Addition Resource Links"
              onChange={(e) => handleResourceLinks(e)}
              value={resourceLinks}
            ></textarea>
          </div>
        </div>

        <button type="button" onClick={(e) => handleSubmit(e)}>
          Add Resources
        </button>
      </div>
    </div>
  );
};

export default UnitResourse;

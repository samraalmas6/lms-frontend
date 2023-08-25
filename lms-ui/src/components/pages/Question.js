import React, { useState } from 'react';
import styles from "../../components/styles/Quiz.module.css";


const Question = ({ question, image, options, marks, onEdit, onDelete, onSetMarks }) => {
  const [showDropdown, setShowDropdown] = useState(false);


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // const handleSetMarks = () => {
  //   onSetMarks(marks);
  //   toggleDropdown();
  // };



  return (
    <div className={styles.contain}>
      
        <div >
          <div>
            <div className={styles.nav}>
            <button className={styles.toggle_btn} onClick={toggleDropdown}>...</button>
            </div>
            {showDropdown && (
              <div className={styles.edit_delete} >
                
                <div>
                <button className={styles.edit_delete } onClick={onEdit}>
                    Edit
                  </button>
                </div>
                <div > 
                   <button className={styles.edit_delete }  onClick={onDelete}>Delete</button>
                 </div>
                </div>
              

            
            )}
           
          </div>
        </div>


        <div className="marks">Marks: {marks}</div>
        <div> <h2>{question}</h2> </div>

        {image && <img className="question-image" src={image} alt="Question" />}
        <div className="options">
          {options.map((option, index) => (
            <div className="option" key={index}>
              <label>
                <input type="radio" name={`question${index}`} className="option-input" disabled />
                {option}
              </label>
            </div>

          ))}
        </div>
      </div>
   
  );
};

export default Question;


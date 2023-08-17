import React from 'react';
import styles from "../../components/styles/Quiz.module.css";


const Question = ({ question, image, options }) => {
  return (
    <div className= {styles.contain}>
    <div className={styles.question}>
      <h2>{question}</h2>
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
    </div>
  );
};

export default Question;


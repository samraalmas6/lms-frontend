import React, { useState } from 'react';
import styles from "../../components/styles/Quiz.module.css";

const QuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() !== '') {
      onAddQuestion({ question, image, options, correctOption });
      setQuestion('');
      setImage(null);
      setOptions(['', '', '', '']);
      setCorrectOption(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.question_form}>
      

      <input
        type="text"
        placeholder=" + Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className={styles.input_field}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.img_option}
      />
      
      
      {options.map((option, index) => (
        <div  key={index}>
          <input
            type="radio"
            name="correctOption"
            checked={index === correctOption}
            onChange={() => setCorrectOption(index)}
            className={styles.radio_input}
          />
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className={styles.input_option}
          />
          
          {options.length > 1 && (
            <button type="img" className={styles.remove_btn} onClick={() => handleRemoveOption(index)}>
            -
            </button>
            
          )}
           <button type="button" className={styles.add_btn} onClick={handleAddOption}>
        +
      </button>
        </div>
      ))}
      
      <button type="submit" className={styles.submit_button}>Add Question</button>
    </form>
  );
};

export default QuestionForm;



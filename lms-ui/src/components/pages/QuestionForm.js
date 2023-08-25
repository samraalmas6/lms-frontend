import React, { useState, useEffect } from 'react';
import styles from "../../components/styles/Quiz.module.css";

const QuestionForm = ({ onAddQuestion , editingQuestion }) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState(10);

useEffect(() => {
  if (editingQuestion) {
    setQuestion(editingQuestion.question);
    setImage(editingQuestion.image);
    setOptions(editingQuestion.options);
    setCorrectOption(editingQuestion.correctOption);
    setMarks(editingQuestion.marks)
  }
}, [editingQuestion]);

  


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
      onAddQuestion({ question, image, options, correctOption,marks });
      setQuestion('');
      setImage(null);
      setOptions(['', '', '', '']);
      setCorrectOption(0);
      setMarks(10);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.question_form}>
      
      <div  >
        <label className= {styles.mark_label}>Marks:   
        <input
        type="number"
        min="1"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        className= {styles.mark_btn}
        />
       </label>
      
      </div>

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
          </div>
      ))}
           <button type="button" className={styles.add_btn} onClick={handleAddOption}>
        + Add Options
      </button>
        
    
      
      <button type="submit" className={styles.submit_button}>Add Question</button>
    </form>
  );
};

export default QuestionForm;



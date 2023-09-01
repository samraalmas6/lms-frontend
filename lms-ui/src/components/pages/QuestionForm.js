import React, { useState, useEffect, useRef } from 'react';
import styles from "../../components/styles/Quiz.module.css";
import upload from "../pages/Images/upload.jpg"


const QuestionForm = ({ onAddQuestion , editingQuestion , selectedCourse}) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(0);
  const [marks, setMarks] = useState(10);
  const [timer, setTimer] = useState(120);
  
 

  const [selectedImageLink, setSelectedImageLink] = useState(null);
  const inputRef = useRef(null);

useEffect(() => {
  if (editingQuestion) {
    setQuestion(editingQuestion.question);
    setImage(editingQuestion.image);
    setOptions(editingQuestion.options);
    setCorrectOption(editingQuestion.correctOption);
    setMarks(editingQuestion.marks)
    setTimer(editingQuestion.timer || 120);

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
  const handleImageClick = () =>{
    inputRef.current.click();
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (question.trim() !== '') {
  //     onAddQuestion({ question, image, options, correctOption,marks,courses });
  //     setQuestion('');
  //     setImage(null);
  //     setOptions(['', '', '', '']);
  //     setCorrectOption(0);
  //     setMarks(10);
  //     courses(selectedCourse);
      
   

  //   }
  const handleAddQuestion = (e) => {
    e.preventDefault();
    const newQuestion = {
      question: question,
      image: image,
      options: options,
      correctOption: correctOption,
      marks: marks,
      course: selectedCourse,
      timer: timer,
    };
    onAddQuestion(newQuestion);
    resetForm();
  };
  
  const resetForm = () => {
    setQuestion('');
    setImage(null);
    setOptions(['']);
    setCorrectOption(0);
    setMarks(10);
    setTimer(120);
    
  };
  const handleTimerChange = (e) => {
    setTimer(parseInt(e.target.value, 10));
  };
  

return (
    <form onSubmit={handleAddQuestion} className={styles.question_form}>
      
      <div>
      {selectedCourse && <div>Course: {selectedCourse}</div>}
      <div>
            <label>
              Timer Duration (seconds):
              <input
                type="number"
                value={timer}
                onChange={handleTimerChange}
                min={1}
                step={1}
              />
            </label>
          </div>
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
<div className={styles.placeholder}>
      <input
        type="text"
        placeholder=" + Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className={styles.input_field}
    />
      
     <div onClick={handleImageClick} >
     <img   className={styles.upld} src ={upload} alt= "" type="file"></img>

    
      <input
        type="file" ref={inputRef} style={{display:"none"}}   
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.placeholder}
      />
    
      </div>
      
      
      
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
   </div>
    </form>
    
  );
};

export default QuestionForm;



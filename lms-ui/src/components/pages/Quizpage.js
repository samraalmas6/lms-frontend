import React, { useEffect, useState } from 'react';
import styles from "../../components/styles/Quiz.module.css";
import Question from './Question';
import QuestionForm from './QuestionForm';
import CourseDropdown from './courseDropdown';
import Timer from './Timer';

function Quizpage() {


    const [questions, setQuestions] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState(['Course A', 'Course B', 'Course C']); // Add your course names here
    const [timer, setTimer] = useState(0);
    const handleAddQuestion = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
    };

    const handleSetTimer = (newTimerValue) => {
        setTimer(newTimerValue);
      };

    const handleEditQuestion = (index) => {
        setEditingIndex(index);
    };

    const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i)=> i !== index);
    
    setQuestions(newQuestions);
    setEditingIndex(null);
    }

     const handleSetMarks =(index, newMarks) => {
        const newQuestions =[...questions];
        newQuestions[index].marks =newMarks;
        setQuestions(newQuestions);

     }

    const renderQuestions = () => {
        return questions.map((q, index) => (

            <Question
                key={index}
                question={q.question}
                image={q.image}
                options={q.options}
                marks={q.marks}
                course={q.course}
                hideCourse={index > 0 && questions[index - 1].course === q.course}
                onEdit= {() => handleEditQuestion(index)}
                onDelete={() => handleDeleteQuestion(index)}
                onSetMarks={(newMarks) => handleSetMarks(index, newMarks)}
            />
        ))
    };

    return (
        <>
        
        
            <div >

                <div className={styles.quized}>
                <div>  <h1 className={styles.h1}>Quiz</h1>
                <Timer onSetTimer={handleSetTimer} />
                    <CourseDropdown
                      selectedCourse={selectedCourse}
                       onCourseChange={setSelectedCourse}
                        courses={courses}/>
                       
                       </div>
       
                    </div>
                    <QuestionForm onAddQuestion={handleAddQuestion}
                    editingQuestion={editingIndex !== null ? questions[editingIndex]: null}
                       selectedCourse={selectedCourse}
                   />
                    {renderQuestions()}
                
            </div>
        </>

    );
};









export default Quizpage

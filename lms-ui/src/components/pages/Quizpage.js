import React, { useState } from 'react';
import styles from "../../components/styles/Quiz.module.css";
import Question from './Question';
import QuestionForm from './QuestionForm';

function Quizpage() {


    const [questions, setQuestions] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    
    
    const handleAddQuestion = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
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
                    <h1 className={styles.h1}>Quiz</h1>
                    </div>
                    <QuestionForm onAddQuestion={handleAddQuestion}
                    editingQuestion={editingIndex !== null ? questions[editingIndex]: null}
                    />
                    {renderQuestions()}
                
            </div>
        </>

    );
};









export default Quizpage

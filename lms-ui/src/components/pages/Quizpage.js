import React, { useState } from 'react';
import styles from "../../components/styles/Quiz.module.css";
import Question from './Question';
import QuestionForm from './QuestionForm';

function Quizpage() {


    const [questions, setQuestions] = useState([]);

    const handleAddQuestion = (newQuestion) => {
        setQuestions([...questions, newQuestion]);
    };

    const renderQuestions = () => {
        return questions.map((q, index) => (
            <Question
                key={index}
                question={q.question}
                image={q.image}
                options={q.options}
            />
        ));
    };

    return (
        <>
            <div >
                <div className={styles.quized}>
                    <h1 className={styles.h1}>Quiz</h1>
                    </div>
                    <QuestionForm onAddQuestion={handleAddQuestion} />
                    {renderQuestions()}
                
            </div>
        </>

    );
};









export default Quizpage

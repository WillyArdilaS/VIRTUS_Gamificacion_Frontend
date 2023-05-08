import "./quizActividad.css"
import React from 'react'

function QuizActividad({ handleAnswer, showAnswers, handleNextQuestion, data: { question, correct_answer, answers }, currentIndex, numPreguntas }) {
    return (
        <>
            <div className="containerQuiz">
                <div className="quiz-container">
                    <div className="quiz-head">
                        <h1 className="quiz-title">Actividad de aula</h1>
                        <div className="quiz-score flex">
                            <span id="correct-score">{currentIndex+1}</span>/<span id="total-question">{numPreguntas}</span>
                        </div>
                    </div>
                    <div className="quiz-body">
                        <h2 className="quiz-question" id="question">{question}</h2>
                        <ul className="quiz-options">
                            {answers.map((answer, idx) => {
                                const specialClassName = showAnswers ? (
                                    answer === correct_answer ? "green-button" : "red-button"
                                ) : "";
                                return (
                                    <button key={answer} className={`normal-button ${specialClassName}`}
                                        onClick={() => handleAnswer(answer)}
                                        dangerouslySetInnerHTML={{ __html: answer }} />
                                )
                            })}
                        </ul>
                        <div id="result">
                        </div>
                    </div>
                    <div className="quiz-foot">
                        {showAnswers && (
                            <button onClick={handleNextQuestion}>Siguiente pregunta</button>
                        )}
                    </div>
                </div>
            </div>


        </>
    )
}

export default QuizActividad

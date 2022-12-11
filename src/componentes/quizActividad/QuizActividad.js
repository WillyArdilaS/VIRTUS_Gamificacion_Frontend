import "./quizActividad.css"
import React from 'react'

function QuizActividad({ handleAnswer, showAnswers, handleNextQuestion, data: { question, correct_answer, answers }, currentIndex, numPreguntas }) {
    return (
        <>
            <div className="containerQuiz">
                <div class="quiz-container">
                    <div class="quiz-head">
                        <h1 class="quiz-title">Actividad de aula</h1>
                        <div class="quiz-score flex">
                            <span id="correct-score">{currentIndex}</span>/<span id="total-question">{numPreguntas}</span>
                        </div>
                    </div>
                    <div class="quiz-body">
                        <h2 class="quiz-question" id="question">{question}</h2>
                        <ul class="quiz-options">
                            {answers.map((answer, idx) => {
                                const specialClassName = showAnswers ? (
                                    answer === correct_answer ? "green-button" : "red-button"
                                ) : "";
                                return (
                                    <button className={`normal-button ${specialClassName}`}
                                        onClick={() => handleAnswer(answer)}
                                        dangerouslySetInnerHTML={{ __html: answer }} />

                                )
                            })}
                        </ul>
                        <div id="result">
                        </div>
                    </div>
                    <div class="quiz-foot">
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

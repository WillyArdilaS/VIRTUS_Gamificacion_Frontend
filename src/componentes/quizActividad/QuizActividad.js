import { useEffect, useState } from "react";
import './quizActividad.css';



export default function QuizActividad({ preguntas, actividades }) {



    return ( actividades.length ? (
        <div>
            <h1>Quiz</h1>
            <hr></hr>
            <div class="wrapper">
                <div class="quiz-container">
                    <div class="quiz-head">
                        <h1 class="quiz-title">Quiz Game</h1>
                        <div class="quiz-score flex">
                            <span id="correct-score"></span>/<span id="total-question"></span>
                        </div>
                    </div>
                    <div class="quiz-body">
                        <h2 class="quiz-question" id="question">{preguntas[0].question}</h2>
                        <ul class="quiz-options">
                            <li>{preguntas[0].correct_answer}</li>
                            <li>{preguntas[0].incorrect_answers[0]}</li>
                            <li>{preguntas[0].incorrect_answers[1]}</li>
                            <li>{preguntas[0].incorrect_answers[2]}</li>
                        </ul>
                        <div id="result">
                        </div>
                    </div>
                    <div class="quiz-foot">
                        <button type="button" id="check-answer">Check Answer</button>
                        <button type="button" id="play-again">Play Again!</button>
                    </div>
                </div>
            </div>
        </div>) : null
    )
}

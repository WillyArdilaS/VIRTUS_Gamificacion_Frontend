import { useEffect, useState } from "react";
import './claseIndividualEstudiante.css';
import MapaActividades from '../../componentes/mapaActividades/MapaActividades';
import QuizActividadTest from '../../componentes/quizActividadTest/QuizActividadTest'
import QuizActividad from '../../componentes/quizActividad/QuizActividad';


export default function ClaseIndividualEstudiante(props) {
  // Hacer el fetch para traer el número de actividades y asi poder renderizar los botones del mapa
  useEffect(() => {
    getPreguntasQuiz();
    getActivity(props.clase._id);
  }, [])


  const [activity, setActivity] = useState([]);
  //QUIZ
  const [preguntasQuiz, setPreguntasQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);


  //Peticiones
  const getActivity = async (filtro) => {
    const urlBD = "http://localhost:8080/api/actividad";
    const response = await fetch(`${urlBD}`);
    const { actividadesBD } = await response.json();


    let actividadesFiltradas = actividadesBD.filter(actividad => actividad.claseFK == filtro);
    setActivity(actividadesFiltradas);
  }

  // //API preguntas actividad
  const getPreguntasQuiz = async (numPreguntas = 10) => {
    const url = `https://opentdb.com/api.php?amount=${numPreguntas}&type=multiple`;
    const response = await fetch(`${url}`);
    const { results } = await response.json();

    const preguntas = results.map((question) => ({
      ...question,
      answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5) //Unifica preguntas correctas e incorrectas en un array y las desordena
    }))

    setPreguntasQuiz(preguntas);
    console.log(preguntas);
  }

  const handleAnswer = (answer) => {
    if (!showAnswers) {
      if (answer === preguntasQuiz[currentIndex].correct_answer) {
        setScore(score + 1);
      }
    }
    setShowAnswers(true);
  }

  const handleNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    setShowAnswers(false);
  }


  return (preguntasQuiz.length > 0 ? (
    <div class="containerActividad">
      <h1>Info de la clase</h1>
      <hr></hr>
      <p>Nombre clase: {props.clase.nombre}</p>
      <p>Descripción: {props.clase.descripcion}</p>
      <p>Número de actividades: {activity.length}</p>

      <MapaActividades actividades={activity} />

      {/* <QuizActividadTest preguntas={preguntasQuiz} actividades={activity}></QuizActividadTest> */}

      <div className="container">
        {currentIndex >= preguntasQuiz.length ? (
          <h1>El puntaje del quiz es {score}</h1>) : (<QuizActividad handleAnswer={handleAnswer}
            showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion}
            data={preguntasQuiz[currentIndex]}
            currentIndex={currentIndex}
            numPreguntas={preguntasQuiz.length} />)}

      </div>

    </div>) : <p>CARGANDO...</p>
  )
}

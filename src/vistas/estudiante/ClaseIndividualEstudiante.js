import * as React from "react";
import clasesTDB from '../../data_prueba/clasesTDB.json';
import { useEffect, useState } from "react";
import './claseIndividualEstudiante.css';
import MapaActividades from '../../componentes/mapaActividades/MapaActividades';
import QuizActividad from '../../componentes/quizActividad/QuizActividad';
import ResmPersonaje from "../../componentes/resmPersonaje/ResmPersonaje";


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
  //Ficha PJ
  const [resPersonaje, setResPersonaje] = React.useState({
    tipo: "base",
    vida: "100",
    experiencia: "100",
    nivel: 0
  });


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
    const difficulty = "easy"
    const findClassTDB = clasesTDB.find(item => item.nombre === props.clase.nombre)
    //console.log(findClassTDB)
    const url = `https://opentdb.com/api.php?amount=${numPreguntas}&category=${findClassTDB.id}&difficulty=${difficulty}`;
    const response = await fetch(`${url}`);
    const { results } = await response.json();

    const preguntas = results.map((question) => ({
      ...question,
      answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5) //Unifica preguntas correctas e incorrectas en un array y las desordena
    }))
    //console.log(preguntas)

    setPreguntasQuiz(preguntas);
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

  //Evalua el resultado del quiz
  if (currentIndex == 10) {
    if (score > 5) {
      resPersonaje.experiencia = resPersonaje.experiencia + activity[0].recompensa;

    } else {
      resPersonaje.vida = resPersonaje.experiencia - activity[0].castigo;

    }
  }



  return (preguntasQuiz.length > 0 ? (
    <div className="containerActividad">
      <h1>Info de la clase</h1>
      <hr></hr>
      <p>Nombre clase: {props.clase.nombre}</p>
      <p>Descripción: {props.clase.descripcion}</p>
      <p>Número de actividades: {activity.length}</p>

      <MapaActividades actividades={activity} />


      <div className="container">
        {currentIndex >= preguntasQuiz.length || activity.length == 0 ? (
          <div className="resultadoQuiz"><h1>El puntaje del quiz es {score}</h1></div>) : (<QuizActividad handleAnswer={handleAnswer}
            showAnswers={showAnswers}
            handleNextQuestion={handleNextQuestion}
            data={preguntasQuiz[currentIndex]}
            currentIndex={currentIndex}
            numPreguntas={preguntasQuiz.length} />)}

        <ResmPersonaje resPersonaje={resPersonaje} />
      </div>

    </div>) : <p>CARGANDO...</p>
  )
}

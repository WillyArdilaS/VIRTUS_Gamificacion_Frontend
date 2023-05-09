import * as React from "react";
import clasesTDB from '../../data_prueba/clasesTDB.json';
import { useEffect, useState } from "react";
import './claseIndividualEstudiante.css';
import MapaActividades from '../../componentes/mapaActividades/MapaActividades';
import QuizActividad from '../../componentes/quizActividad/QuizActividad';
import ResmPersonaje from "../../componentes/resmPersonaje/ResmPersonaje";


export default function ClaseIndividualEstudiante() {
  // Hacer el fetch para traer el número de actividades y asi poder renderizar los botones del mapa
  useEffect(() => {
    getPreguntasQuiz();
    getActivity(JSON.parse(sessionStorage.getItem("EstudianteClaseActual"))._id);
    getPersonaje(JSON.parse(sessionStorage.getItem("usuario")).usuario._id);
  }, [])

  const [activity, setActivity] = useState([]);
  //QUIZ
  const [preguntasQuiz, setPreguntasQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  //Ficha PJ
  const [resPersonaje, setResPersonaje] = React.useState({
    id: "",
    clase: "",
    vida: 0,
    experiencia: 0,
    nivel: 0, 
    imgUrl: ""
  });


  //Peticiones
  const getPersonaje = async (filtro) => {
    const urlBD = "http://localhost:8080/api/personajes/";
    const response = await fetch(`${urlBD}`);
    const { personajesBD } = await response.json();

    let personajesFiltrados = personajesBD.filter(personaje => personaje.usuarioFK == filtro);
    setResPersonaje(()=> ({
      id: personajesFiltrados[0]._id,
      clase: personajesFiltrados[0].clase,
      vida: personajesFiltrados[0].vida,
      experiencia: personajesFiltrados[0].experiencia,
      nivel: personajesFiltrados[0].nivel,
      imgUrl: personajesFiltrados[0].imgUrl
    }));
  }

  const getActivity = async (filtro) => {
    const urlBD = "http://localhost:8080/api/actividad";
    const response = await fetch(`${urlBD}`);
    const { actividadesBD } = await response.json();


    let actividadesFiltradas = actividadesBD.filter(actividad => actividad.claseFK == filtro);
    setActivity(actividadesFiltradas);
  }

  const getDifficultyForConsult = () => {
    let difficulty = JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).dificultad
    if (difficulty === 'facil'){
      difficulty = 'easy'
    } else if (difficulty === 'medio'){
      difficulty = 'medium'
    } else if (difficulty === 'dificil'){
      difficulty = 'hard'
    }
    return difficulty
  }

  // //API preguntas actividad
  const getPreguntasQuiz = async (numPreguntas = 10) => {
    const findClassTDB = clasesTDB.find(item => item.nombre === JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).nombre)
    const difficulty = getDifficultyForConsult()

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
  useEffect(() => {
    if (currentIndex == 10) {
      if (score > 6) {
        resPersonaje.experiencia = resPersonaje.experiencia + activity[0].recompensa;
      } else {
        resPersonaje.vida = resPersonaje.vida - activity[0].castigo;
      }
      
      levelUpPersonaje();
      updatePersonaje();
    }
  }, [currentIndex])
  
  // Subir de nivel
  const levelUpPersonaje = () => {
    if(resPersonaje.experiencia >= 100) {
      resPersonaje.vida = 100;
      resPersonaje.experiencia = 0;
      resPersonaje.nivel += 1;
      alert("¡Felicidades! Has subido de nivel");
    } 
  }

  // Actualizar atributos del personaje
  const updatePersonaje = async () => {
    const urlBD = "http://localhost:8080/api/personajes/";
    const response = await fetch(urlBD, {
      method: "PUT",
      body: JSON.stringify({
        "_id": resPersonaje.id,
        "experiencia": resPersonaje.experiencia,
        "vida": resPersonaje.vida,
        "nivel": resPersonaje.nivel 
      }),
      headers: {
        "Content-Type": "application/json",
        "TokenRol": JSON.parse(sessionStorage.getItem("usuario")).token
      }
    });

    getPersonaje(JSON.parse(sessionStorage.getItem("usuario")).usuario._id);
  } 

  return (preguntasQuiz.length > 0 ? (
    <div className="containerActividad">
      <h1>Info de la clase</h1>
      <hr></hr>
      <p>Nombre clase: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).nombre}</p>
      <p>Codigo del grupo: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).codigoGrupo}</p>
      <p>Descripción: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).descripcion}</p>
      <p>Dificultad: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).dificultad}</p>
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

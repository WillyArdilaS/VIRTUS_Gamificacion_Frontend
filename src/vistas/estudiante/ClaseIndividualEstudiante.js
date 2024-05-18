import * as React from "react";
import clasesTDB from '../../data_prueba/clasesTDB.json';
import { useEffect, useState } from "react";
import './claseIndividualEstudiante.css';
import MapaActividades from '../../componentes/mapaActividades/MapaActividades';
import QuizActividad from '../../componentes/quizActividad/QuizActividad';
import ResmPersonaje from "../../componentes/resmPersonaje/ResmPersonaje";
import SopaLetras from "../../componentes/sopaLetras/SopaLetras";
import Crucigrama from "../../componentes/crucigrama/Crucigrama";
import JuegoPreguntas from "../../componentes/pregunta/Preguntas";
import {useParams} from "react-router-dom";


export default function ClaseIndividualEstudiante() {
  const { tipo } = useParams();
  const [activity, setActivity] = useState([]);
  const [actualActivity, setActualActivity] = useState();
  //QUIZ
  const [preguntasQuiz, setPreguntasQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false),
  [url, setUrl] = useState(window.location.href);
  //Ficha PJ
  const [resPersonaje, setResPersonaje] = React.useState({
    id: "",
    clase: "",
    vida: 0,
    experiencia: 0,
    nivel: 0,
    imgUrl: ""
  });

  const [showQuiz, setShowQuiz] = useState(false);

  // Hacer el fetch para traer el número de actividades y asi poder renderizar los botones del mapa
  useEffect(() => {
    getActivity(JSON.parse(sessionStorage.getItem("EstudianteClaseActual"))._id);
    getPersonaje(JSON.parse(sessionStorage.getItem("usuario")).usuario._id);
  }, [])

  //Peticiones
  const getPersonaje = async (filtro) => {
    const urlBD = "http://localhost:8080/api/personajes/";
    const response = await fetch(`${urlBD}`);
    const { personajesBD } = await response.json();

    let personajesFiltrados = personajesBD.filter(personaje => personaje.usuarioFK == filtro);
    setResPersonaje(() => ({
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

  // API preguntas actividad
  const getPreguntasQuiz = async (actividad, numPreguntas = 10) => {
    if (actividad.disponible == true) {
      let difficulty = actividad.dificultad;
      if (difficulty === 'facil') {
        difficulty = 'easy'
      } else if (difficulty === 'medio') {
        difficulty = 'medium'
      } else if (difficulty === 'dificil') {
        difficulty = 'hard'
      }

      const findClassTDB = clasesTDB.find(item => item.nombre === JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).nombre)
      const url = `https://opentdb.com/api.php?amount=${numPreguntas}&category=${findClassTDB.id}&difficulty=${difficulty}`;
      const response = await fetch(`${url}`);
      const { results } = await response.json();

      const preguntas = results.map((question) => ({
        ...question,
        answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5) //Unifica preguntas correctas e incorrectas en un array y las desordena
      }))

      setPreguntasQuiz(preguntas);
      setShowQuiz(true);
    } else {
      console.log("NO DISPONIBLE");
    }
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
    if (resPersonaje.experiencia >= 100) {
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

  useEffect(() => {
    getPreguntasQuiz(actualActivity);
  }, [actualActivity]);

  return (activity.length > 0 ? (
    <div className="containerActividad">
      <h1>Info de la clase</h1>
      <hr></hr>
      <p>Nombre clase: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).nombre}</p>
      <p>Codigo del grupo: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).codigoGrupo}</p>
      <p>Descripción: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).descripcion}</p>
      <p>Dificultad: {JSON.parse(sessionStorage.getItem("EstudianteClaseActual")).dificultad}</p>
      <p>Número de actividades: {activity.length}</p>

      <MapaActividades actividades={activity} setActualActivity={setActualActivity} setUrl={setUrl} />


      <div className="container">

        {console.log("activity", activity)}
        {
            activity.length > 0 && (
                tipo === "sopa-letras"
                    ? <SopaLetras activity={activity} url={url} />
                    : tipo === "crucigrama"
                        ? <Crucigrama id={activity} />
                        : tipo === "preguntas"
                            ? <JuegoPreguntas activity={activity} url={url}/>
                            : (showQuiz === true
                                ? currentIndex >= preguntasQuiz.length
                                    ? (<div className="resultadoQuiz"><h1>El puntaje del quiz es {score}</h1></div>)
                                    : (<QuizActividad handleAnswer={handleAnswer}
                                                      showAnswers={showAnswers}
                                                      handleNextQuestion={handleNextQuestion}
                                                      data={preguntasQuiz[currentIndex]}
                                                      currentIndex={currentIndex}
                                                      numPreguntas={preguntasQuiz.length} />)
                                : (<></>))
            )
        }

        <ResmPersonaje resPersonaje={resPersonaje} />
      </div>

    </div>) : <p>CARGANDO...</p>
  )
}

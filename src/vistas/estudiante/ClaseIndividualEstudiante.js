import { useEffect, useState } from "react";
import './claseIndividualEstudiante.css';
import MapaActividades from '../../componentes/mapaActividades/MapaActividades';
import QuizActividad from '../../componentes/quizActividad/QuizActividad'



export default function ClaseIndividualEstudiante(props) {
  // Hacer el fetch para traer el número de actividades y asi poder renderizar los botones del mapa
  useEffect(() => {
    getActivity(props.clase._id);
    getPreguntasQuiz();
  }, [])


  const [activity, setActivity] = useState([]);
  const [preguntasQuiz, setPreguntasQuiz] = useState([]);


  //Peticiones
  const getActivity = async (filtro) => {
    const urlBD = "http://localhost:8080/api/actividad";
    const response = await fetch(`${urlBD}`);
    const { actividadesBD } = await response.json();


    let actividadesFiltradas = actividadesBD.filter(actividad => actividad.claseFK == filtro);
    setActivity(actividadesFiltradas);
  }

  //API preguntas actividad
  const getPreguntasQuiz = async (numPreguntas = 10) => {
    const url = `https://opentdb.com/api.php?amount=${numPreguntas}`;
    const response = await fetch(`${url}`);
    const {results} = await response.json();
    setPreguntasQuiz(results);
  }


  return (
    <div class="containerActividad">
      <h1>Info de la clase</h1>
      <hr></hr>
      <p>Nombre clase: {props.clase.nombre}</p>
      <p>Descripción: {props.clase.descripcion}</p>
      <p>Número de actividades: {activity.length}</p>


      <MapaActividades actividades={activity} />

      <h1>Quiz</h1>
      <hr></hr>
      <QuizActividad preguntas={preguntasQuiz}></QuizActividad>

    </div>
  )
}
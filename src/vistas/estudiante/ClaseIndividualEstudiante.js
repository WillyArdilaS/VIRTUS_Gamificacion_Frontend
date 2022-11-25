import { useEffect, useState } from "react";
import './claseIndividualEstudiante.css';
import MapaActividades from '../../componentes/mapaActividades/MapaActividades';



export default function ClaseIndividualEstudiante(props) {
  // Hacer el fetch para traer el número de actividades y asi poder renderizar los botones del mapa
  useEffect(() => {
    getActivity(props.clase._id);
  }, [])


  const [activity, setActivity] = useState([]);


  //Peticiones
  const getActivity = async (filtro) => {
    const urlBD = "http://localhost:8080/api/actividad";
    const response = await fetch(`${urlBD}`);
    const { actividadesBD } = await response.json();


    let actividadesFiltradas = actividadesBD.filter(actividad => actividad.claseFK == filtro);
    setActivity(actividadesFiltradas);
  }

  return (
    <div class="containerActividad">
      <h1>Info de la clase</h1>
      <hr></hr>
      <p>Nombre clase: {props.clase.nombre}</p>
      <p>Descripción: {props.clase.descripcion}</p>
      <p>Número de actividades: {activity.length}</p>


      <MapaActividades actividades={activity}/>

      <h1>Quiz</h1>
      <hr></hr>

    </div>
  )
}

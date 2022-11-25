import './claseIndividualEstudiante.css';



export default function ClaseIndividualEstudiante(props) {
  return (
    <div class="containerActividad">
      <h1>Info de la clase</h1>
      <hr></hr>
      <p>Nombre clase: {props.clase.nombre}</p>
      <p>Descripción {props.clase.descripcion}</p>
      <h1>Mapa de actividades</h1>
      <hr></hr>

    </div>
  )
}

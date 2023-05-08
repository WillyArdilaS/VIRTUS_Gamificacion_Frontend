import "./fichaClase.css";
import { useNavigate } from "react-router-dom";


export default function FichaClase(props) {

  const navigate = useNavigate();

  const navigateToIndividualClass = () => {
    navigate("/Maestro/ClaseIndidivual");
  }


  const eventClaseProfesor = (clase, e) => {
    e.preventDefault();
    props.funcionClaseIndividual(clase);
    sessionStorage.setItem("ProfesorClaseActual", JSON.stringify(clase));
    navigateToIndividualClass();
  }

  return (
    <div className="fichaClase">
      <img src="https://cdn.pixabay.com/photo/2019/05/05/15/05/game-of-thrones-4180794_960_720.jpg" alt="Imagen de Fondo" />
      {/* <img src={props.clase.linkImagen} alt="Imagen de Fondo" /> */}
      <p className="nombre_clase">
        <i className="fa-solid fa-dice"></i>
        {props.clase.nombre}
      </p>
      <p className="codigoGrupo_clase">
        <i className="fa-solid fa-dice"></i>
        {props.clase.codigoGrupo}
      </p>
      <p className="dificultad_clase">
        <i className="fa-solid fa-dice"></i>
        {props.clase.dificultad}
      </p>
      <p className="descripcion_clase">
        <i className="fa-solid fa-dragon"></i> 
        {props.clase.descripcion}
      </p>

      <button className="ir_clase" onClick={(e) => eventClaseProfesor(props.clase, e)}>Ir a Clase</button>
    </div>
  );
}

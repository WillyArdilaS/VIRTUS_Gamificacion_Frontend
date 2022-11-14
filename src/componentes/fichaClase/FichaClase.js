import "./fichaClase.css";
import { useNavigate } from "react-router-dom";


export default function FichaClase(props) {

  const navigate = useNavigate();

  const navigateToIndividualClass = () => {
    navigate("/Profesor/ClaseIndidivual");
  }


  const eventClaseProfesor = (clase, e) => {
    e.preventDefault();
    console.log(props.ClaseIndividualInformacion);
    props.funcionClaseIndividual(clase);
    console.log("Presiono el botón", clase);
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
      <p className="profesor_clase">
        <i className="fa-solid fa-dragon"></i> {props.clase.profesor}
      </p>
      <button className="ir_clase" onClick={(e)=>eventClaseProfesor(props.clase, e)}>Ir a Clase</button>
    </div>
  );
}

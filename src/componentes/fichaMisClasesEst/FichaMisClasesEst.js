import './fichaMisClasesEst.css'
import { useNavigate } from "react-router-dom";



export default function FichaMisClasesEst(props) {
    const navigate = useNavigate();

    const navigateToIndividualClass = () => {
        navigate("/Estudiante/ClaseIndividualEstudiante");
    }

    const eventClaseProfesor = (clase, e) => {
        e.preventDefault();
        props.funcionClaseIndividual(clase);
        sessionStorage.setItem("EstudianteClaseActual", JSON.stringify(clase));
        navigateToIndividualClass();
      }

    return (
        <div className="fichaClase">
            <img src="https://cdn.pixabay.com/photo/2016/02/07/19/48/aurora-1185464_960_720.jpg" alt="Imagen de Fondo" />
            {/* <img src={props.clase.linkImagen} alt="Imagen de Fondo" /> */}
            <p className="nombre_clase">
                <i className="fa-solid fa-dice"></i>
                {props.clase.nombre}
            </p>
            <p className="profesor_clase">
                <i className="fa-solid fa-dragon"></i> {props.clase.profesor}
            </p>
            <button className="ir_clase" onClick={(e) => eventClaseProfesor(props.clase, e)}>Ir a Clase</button>
        </div>
    )
}

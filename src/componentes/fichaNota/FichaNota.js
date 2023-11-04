import "./fichaNota.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function FichaNota(props) {

  

  const navigate = useNavigate();
  const datos = props.value;
  const [estNombre, setEstNombre] = useState([]); //nombre del estudiante

  
//se solicita el nombre del estudiante
  useEffect(() => {
    getNombre(datos.usuarioEstudianteFK);
}, [])



  //peticiones, obtener nombre y correo del estudiante
  const getNombre = async (filtro) => {
    const urlBD = "http://localhost:8080/api/users";
    const response = await fetch(`${urlBD}`);
    const {usuariosBD}= await response.json();
    let buscarNombre = usuariosBD.filter(dato => dato._id == filtro);
    setEstNombre(buscarNombre[0])
}



//para cuando se implementen mas detalles del la nota del estudiante
const event = (clase, e) => {
/*  
   e.preventDefault();
   sessionStorage.setItem("ProfesorClaseActual", JSON.stringify(clase));
   navigateToDetalles();*/
 }

 const navigateToDetalles = () => {
  navigate("/Maestro/ClaseIndidivual");
}


  return (
    <div className="fichaClase">
      <img src="https://cdn.pixabay.com/photo/2019/05/05/15/05/game-of-thrones-4180794_960_720.jpg" alt="Imagen de Fondo" />
      {/* <img src={props.clase.linkImagen} alt="Imagen de Fondo" /> */}
      <p className="estudiante">
        <i className="fa-solid fa-dice"></i>
        {estNombre.nombre}
      </p>
      <p className="estudiante">
        <i className="fa-solid fa-dice"></i>
        {estNombre.correo}
      </p>
      <p className="nota">
        <i className="fa-solid fa-dice"></i>
        {datos.valor}
      </p>

      <button className="Detalles" onClick={(e) => event(props.clase, e)}>Detalles</button>
    </div>
  );
}

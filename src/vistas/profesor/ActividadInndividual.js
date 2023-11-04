import './actividadIndividual.css';
import { useEffect, useState } from "react";
import FichaNota from "../../componentes/fichaNota/FichaNota";

export default function PerfilProf(props) {
 
    
    const [notas, setNotas] = useState([]); //Notas indivuduales del get
    const [actividad, setActividad] = useState([]); //Actividad de la pagina anterior

    useEffect(() => {
        setActividad(JSON.parse(localStorage.getItem("actividad")))
        getNotas(JSON.parse(localStorage.getItem("actividad"))._id);
    }, [])


    //Peticiones
    const getNotas = async (filtro) => {
        const urlBD = "http://localhost:8080/api/nota/obtenerNotasPorActividad?idActividad="+ filtro;
        const response = await fetch(`${urlBD}`);
        const notasBD= await response.json();
        setNotas(notasBD.notas);
    }


    

    return (
        <div className="infoClase">
            <h1>Reporte de la actividad</h1>
            <p>Estado: {actividad.disponible ? "Disponible":"No disponible"}</p>
            <p>Nombre: {actividad.nombre}</p>
            <p>Fecha limite: {actividad.fechaVencimiento}</p>
            <p>Castigo: {actividad.castigo}</p>
            <p>Recompensa: {actividad.recompensa}</p>
            <p>Descripcion: {actividad.descripcion}</p>
            <hr></hr>

            <hr></hr>
            <h1>Notas</h1>
            {notas.map(item => {
                return(<FichaNota key={item._id} value={item}></FichaNota>)
            })}
            
            
        </div>)
}
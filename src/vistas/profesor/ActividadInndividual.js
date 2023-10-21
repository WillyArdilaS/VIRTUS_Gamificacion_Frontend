import { useEffect } from 'react';
import './actividadIndividual.css';

export default function PerfilProf(props) {
 
   
    let actividad = JSON.parse(localStorage.getItem('actividad'))

    

    return (
        <div className="infoClase">
            <h1>Información de la clase</h1>
            <p>Nombre clase: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).nombre}</p>
            <p>Codigo del grupo: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).codigoGrupo}</p>
            <p>Descripción: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).descripcion}</p>
            <p>Dificultad: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).dificultad}</p>
            <h1>Reporte de la actividad</h1>
            <p>Nombre: {actividad.nombre}</p>
            <p>Fecha limite: {actividad.fechaVencimiento}</p>
            <hr></hr>


   
        </div>)
}
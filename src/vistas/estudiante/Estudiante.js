import {Outlet } from "react-router-dom";
import './estudiante.css';
import MenuIzq from '../../componentes/menuIzq/MenuIzq';



export default function Estudiante(props) {
    const opciones=['Mi cuenta','Clases','Misiones Pendientes'];
    return( <div className="contenedor_Est">
                <MenuIzq opciones={opciones} usuario={props.data}/>
                <Outlet></Outlet>
            </div>)
}
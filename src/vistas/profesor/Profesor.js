import {Outlet } from "react-router-dom";
import './profesor.css';
import MenuIzq from '../../componentes/menuIzq/MenuIzq';



export default function Profesor() {
    const opciones=['Mi cuenta','Clases'];
    return( <div className="contenedor_Profesor">
                <MenuIzq opciones={opciones}/>
                <Outlet></Outlet>
            </div>)
}
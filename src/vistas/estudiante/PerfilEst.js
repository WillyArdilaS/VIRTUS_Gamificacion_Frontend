import './PerfilEst.css';
import { useEffect } from 'react';

export default function PerfilEst() {
    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function(event) {
        window.history.pushState(null, document.title, window.location.href);})
    }, []);

    return (
        <div className="infoEstudiante">

            <div className="cardInfoEstudiante">
                <div className="headerCardInfoEstudiante">
                    <h1>Perfil Estudiante</h1>
                    <img
                    className="imgEstudiante"
                        src="https://www.theedublogger.com/files/2020/06/Dexter-the-cat-Icons-19-128x128.png"
                        alt="imagen de perfil"
                    />
                </div>


                <p>Nombre: <span className="capitalizar">{JSON.parse(sessionStorage.getItem("usuario")).usuario.nombre}</span></p>
                <p>Apellido: <span className="capitalizar">{JSON.parse(sessionStorage.getItem("usuario")).usuario.apellido}</span></p>
                <p>Rol: <span className="capitalizar">{JSON.parse(sessionStorage.getItem("usuario")).usuario.rol}</span></p>
                <p>Correo: <span>{JSON.parse(sessionStorage.getItem("usuario")).usuario.correo}</span></p>
                <p>Fecha de nacimiento: <span>{JSON.parse(sessionStorage.getItem("usuario")).usuario.fechaNacimiento}</span></p>

            </div>


        </div>)

}
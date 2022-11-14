import './PerfilProf.css';

export default function PerfilProf(props) {

    return (
        <div className="infoProfesor">

            <div className="cardInfoProfesor">
                <div className="headerCardInfoProfesor">
                    <h1>Perfil Profesor</h1>
                    <img
                    className="imgProfesor"
                        src="https://www.theedublogger.com/files/2020/06/Dexter-the-cat-Icons-27-128x128.png"
                        alt="imagen de perfil"
                    />
                </div>


                <p>Nombre: <span className="capitalizar">{props.data.usuario.nombre}</span></p>
                <p>Apellido: <span className="capitalizar">{props.data.usuario.apellido}</span></p>
                <p>Rol: <span className="capitalizar">{props.data.usuario.rol}</span></p>
                <p>Correo: <span>{props.data.usuario.correo}</span></p>
                <p>Fecha de nacimiento: <span>{props.data.usuario.fechaNacimiento}</span></p>

            </div>


        </div>)

}
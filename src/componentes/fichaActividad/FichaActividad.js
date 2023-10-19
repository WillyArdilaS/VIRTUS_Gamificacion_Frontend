import './fichaActividad.css';




export default function FichaActividad(props) {
    return (
        <div className="cardClase">
            <img className="imgCardClase" src="https://cdn.pixabay.com/photo/2016/12/25/22/32/gladiator-1931077_960_720.jpg"></img>
            <div className="informacionClase">
                <div className="indicadoresClase">
                    <img src="https://cdn-icons-png.flaticon.com/512/5219/5219258.png" className="imgIcon"></img>
                    <p>Recompensa: </p>
                    <p>{props.actividad.recompensa}</p>
                </div>
                <div className="indicadoresClase">
                    <img src="https://img.favpng.com/2/15/13/the-icons-computer-icons-skull-png-favpng-MADHvngC4cqTQ4KtHKvPeURcp.jpg" className="imgIcon"></img>
                    <p>Castigo: </p>
                    <p>{props.actividad.castigo}</p>
                </div>

            </div>
            <div className="indicadoresClase">
                <img src="https://cdn-icons-png.flaticon.com/512/1162/1162281.png" className="imgIcon"></img>
                <p>Descripción:</p>
            </div>
            <div className="indicadoresClase">
                <p>{props.actividad.descripcion} - {props.actividad.dificultad}</p>
            </div>
        </div>
    )
}

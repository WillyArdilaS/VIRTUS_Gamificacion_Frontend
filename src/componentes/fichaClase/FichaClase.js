import "./fichaClase.css";

export default function FichaClase(props) {
  return (
    <div className="fichaClase">
      <img src={props.clase.linkImagen} alt="Imagen de Fondo" />
      <p className="nombre_clase">
        <i className="fa-solid fa-dice"></i>
        {props.clase.nombre}
      </p>
      <p className="profesor_clase">
        <i className="fa-solid fa-dragon"></i> {props.clase.profesor}
      </p>
      <button className="ir_clase">Ir a Clase</button>
    </div>
  );
}

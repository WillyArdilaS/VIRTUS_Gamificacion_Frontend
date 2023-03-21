import "./FichaMatricularClase.css";

export default function FichaMatricularClase(props) {

  const postMatricular = async(objectMatricular) => {
    const urlBD = 'http://localhost:8080/api/clasesEstudiante';
    const response = await fetch(`${urlBD}`,
      {
        method: 'POST',
        body: JSON.stringify(objectMatricular),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const data = await response.json();
    console.log(data);
    return data;
  }

  //Evento onClick
  const eventMatricular = async(claseID, estudianteID,e) => {
    e.preventDefault();
    
    let objectMatricular = {
      usuarioEstudianteFK: estudianteID,
      claseFK: claseID
    };
    const response = await postMatricular(objectMatricular);
    alert("Te uniste a la clase");
    props.getMisClases(estudianteID);
  }

  return (
    <div className="fichaClase">
      <img src="https://img.freepik.com/free-vector/cartoon-night-nature-landscape-full-moon-shining-sky-with-stars-field-with-pond-conifer-trees-rocks-dark-heaven-with-moonlight-romantic-fantasy-background-midnight-twilight-vector-view_107791-10119.jpg?w=900&t=st=1658165596~exp=1658166196~hmac=14c534a8cd8afdae2e7ac64724ec9ed3696e2465ceebf8c6f26d15390ed41efd" alt="Imagen de Fondo" />
      <p className="nombre_clase">
        <i className="fa-solid fa-dice"></i>
        {props.clase.nombre}
      </p>
      <p className="profesor_clase">
        <i className="fa-solid fa-dragon"></i> {props.clase.descripcion}
      </p>
      <button className="ir_clase" onClick={(e)=>eventMatricular(props.clase._id, props.estudiante.usuario._id,e)}>Inscribirse</button>
    </div>
  );
}

import './mapaActividades.css'
import { useNavigate } from 'react-router-dom'
//import { useEffect, useState } from "react";
// import '../../utils/dist/rpgui.min.css'


export default function MapaActividades({actividades, setActualActivity, setUrl}) {
  const navigate = useNavigate(),
  showActivity = (i) => {
    let url = "http://localhost:8001/Estudiante/ClaseIndividualEstudiante/sopa-letras?id=" + i;
    setUrl(url);
    navigate("/Estudiante/ClaseIndividualEstudiante/sopa-letras?id=" + i);
  }
  return (
    <div >
      <h1>MapaActividades</h1>
      <hr></hr>
      <div className="containerMapa">

        <div className="imagenMapa">
          <img alt='MapaActividades' src="https://images.creativemarket.com/0.1.0/ps/1049560/1600/1200/m1/fpnw/wm0/fl1_200_04_final-.jpg?1457008440&s=01f3a321e869e1db4231986e78921f6e"></img>
        </div>

        <div className="containerBtn">
          {
            actividades.map((actividad, index) => {
              let classButton = `rpgui-button posicion${index+1} btn_actividad`
              let idButton = `button${index+1}`
              //antes no se tenian posiciones, se agregan unas de ejemplo.
              let posicion = {
                "grid-column-start": index,
                "grid-row-start": "4"
              }
              return(<button key={index} onClick={() => showActivity(index) } style={posicion} className={classButton} type="button" alt='boton' id={idButton}><p>{index+1}</p></button>)
            })
          }

        </div>
      </div>
    </div>
  )
}

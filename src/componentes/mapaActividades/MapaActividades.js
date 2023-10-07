import './mapaActividades.css'
//import { useEffect, useState } from "react";
// import '../../utils/dist/rpgui.min.css'


export default function MapaActividades({actividades, setActualActivity}) {
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
                "grid-column-start": "5",
                "grid-row-start": "4"
              }
              return(<button key={index} onClick={() => setActualActivity(actividad)} style={posicion} className={classButton} type="button" alt='boton' id={idButton}><p>{index+1}</p></button>)
            })
          }

        </div>
      </div>
    </div>
  )
}

import './mapaActividades.css'
// import '../../utils/dist/rpgui.min.css'


export default function MapaActividades({actividades}) {
  return (
    <div >
      <h1>MapaActividades</h1>
      <hr></hr>
      <div className="containerMapa">
      <img className="imgMapa" alt='MapaActividades' src="https://images.creativemarket.com/0.1.0/ps/1049560/1600/1200/m1/fpnw/wm0/fl1_200_04_final-.jpg?1457008440&s=01f3a321e869e1db4231986e78921f6e"></img>
      
      {
        actividades.map((actividad, index) => {
          let classButton = `rpgui-button posicion${index+1} absolute`
          let idButton = `button${index+1}`
          return(<button className={classButton} type="button" alt='boton' id={idButton}><p>{index+1}</p></button>)
        })
      }
      </div>
    </div>



  )
}

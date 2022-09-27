import './pregunta.css';

export default function Preguntas({pregunta,respuesta}) {

    const animation =(e)=>{
        e.currentTarget.classList.toggle('activa')
        const respuesta = e.currentTarget.querySelector('.respuesta')
        
        if(!respuesta.style.maxHeight){
            respuesta.style.maxHeight=respuesta.scrollHeight +'px';
        }else{
            respuesta.style.maxHeight=null;
        }

    }

    return(
            <div>
                <div className="contenedor_pregunta" onClick={animation}>
                    <p className='pregunta'>{pregunta} <i className="fa-solid fa-caret-down"></i></p>
                    <p className='respuesta'>{respuesta}</p>
                </div>
            </div>
    )

}
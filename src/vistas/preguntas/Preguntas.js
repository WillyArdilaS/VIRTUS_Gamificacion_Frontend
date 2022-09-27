import './preguntas.css';
import Pregunta from '../../componentes/pregunta/Pregunta';
import data from '../../data_prueba/faq.json';
import { useEffect } from 'react';
import Aos from 'aos';


export default function Preguntas(props) {

    useEffect(() => {
        Aos.init({duration : 1000});
      }, []);
    
    return(
        <div data-aos = "fade-in" data-aos-once="true">
            <div className="pr_title" >
                <h1>FAQ</h1>
                <p>¿Tienes alguna duda? Aquí se encuentran las preguntas más 
                recurrentes que puedes tener</p>
            </div>
            <div className='faq'>
                {data.map(data=>{
                    return <Pregunta  key={data.pregunta}  pregunta={data.pregunta} respuesta={data.respuesta}/>
                })}
            </div>
        </div>
    )
}
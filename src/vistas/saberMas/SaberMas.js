import './saberMas.css';
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function SaberMas(props) {

    useEffect(() => {
      Aos.init({duration : 1500});
    }, []);

    return(
        <div>
            <div className='sm_title' data-aos = "fade-in" data-aos-once="true">
                <div>
                    <h1> Promueve la motivación <br/>en el aprendizaje.</h1>
                </div>
                <div>
                    <p>
                    La motivación es el aspecto vital del por qué iniciamos,<br/> 
                    continuamos y terminamos nuestros compromisos y<br/>
                    proyectos.
                    </p>
                </div>
            </div>
            <div className='saberMas_contenedor'>
                <div className="sm_text" data-aos = "fade-right" data-aos-once="true">

                    <h1>Crea un aula divertida para tus alumnos</h1>
                    <p>Promueve el compromiso de los alumnos a través de retos, niveles y puntos.  
                    Genera expectativas y objetivos que fomenten sus capacidades.</p>
                </div>
                <div  className="sm_img" data-aos = "fade-right" data-aos-once="true">
                    <img 
                        alt='Img de presenatcion' 
                        src='https://img.freepik.com/free-photo/video-maker-editor-working-digital-montage-creating-graphic-effects-computer-using-post-production-software-creativity-studio-agency-creator-editing-movie-footage-remote-work_482257-37969.jpg?t=st=1657051825~exp=1657052425~hmac=3d5185c138cd051dd71cc26b0e1e465fa9bf5ffe3c0b096d3ffac7b8b647b060&w=740'/>
                </div>
                <div className="sm_text" data-aos = "fade-left" data-aos-once="true">
                    <h1>Elige un personaje e inicia una experiencia alternativa de aprendizaje</h1>
                    <p>Crea un personaje con habilidades únicas que te ayudarán en el 
                        cumplimiento de los retos. Consigue puntos de experiencia para fortalecer
                        a tu personaje y realizar retos más desafiantes.</p>
                </div>
                <div  className="sm_img" data-aos = "fade-left" data-aos-once="true">
                    <img alt='Img de presenatcion' 
                        src='https://img.freepik.com/free-photo/back-view-woman-winning-video-games-while-playing-late-night-she-has-powerful-pc-with-neon-fans-front_482257-29624.jpg?w=996&t=st=1657052753~exp=1657053353~hmac=0daad2c71bf8230d0fb0ec9cb74b4291ea5a01d8bed7c0bd0c7083d03ab77be6'/>
                </div>
            </div>
        </div>
    )
}
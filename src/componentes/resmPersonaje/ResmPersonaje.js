import './resmPersonaje.css';
import * as React from "react";

export default function ResmPersonaje({resPersonaje}){

    const vida=resPersonaje.vida;
    const barraVida=vida+"%";
    const experiencia=resPersonaje.experiencia;
    const barraExperiencia=experiencia+"%";
    const nivel=resPersonaje.nivel;
    const imagen='/clases/'+resPersonaje.tipo+'.JPG';

    
    return(
            <div className='resmPersonaje'>
                <div className='resmPersonaje_img'>
                    <img  src={imagen} alt='personaje' />
                </div>
                <p className='resmPersonaje_vida'>Vida <i className="fa-solid fa-heart-pulse"></i></p>
                <div className='resmPersonaje_vida_barra'>
                    <div style={{
                            backgroundColor:"rgb(255, 60, 60)",
                            width:barraVida,
                            height:"20px",
                            borderRadius: "5px",
                            display:"flex",
                            justifyContent: vida>40?'center':'flex-start',
                            color:"white"}}>
                            {vida}/100
                    </div>
                </div>
                <p className='resmPersonaje_experiencia'>Experiencia (nivel. {nivel}) 
                            <i className="fa-solid fa-medal"></i> 
                </p>
                <div className='resmPersonaje_experiencia_barra'>
                    <div style={{
                            backgroundColor:"rgb(205, 235, 96)",
                            width:barraExperiencia,
                            height:"20px",
                            borderRadius: "5px",
                            display:"flex",
                            justifyContent:experiencia>40?'center':'flex-start',
                            color:"white"}}>
                            {experiencia}/100
                    </div>
                </div>
                <p className='resmPersonaje_habilidades'>Habilidades 
                            <i className="fa-brands fa-superpowers"></i>
                </p>
                <div className='resmPersonaje_habilidades_barra'></div>
            </div>
    )

}

import * as React from "react";
import './clasesEst.css';

import data from '../../data_prueba/clases.json'
import FichaClase from '../../componentes/fichaClase/FichaClase'
import ResmPersonaje from '../../componentes/resmPersonaje/ResmPersonaje';


export default function ClasesEst(props){

     const [resPersonaje, setResPersonaje] = React.useState({
          tipo:"base",
          vida:"100",
          experiencia:"100",
          nivel:0
     });


     function cambioTarjeta(e){
          data.map(item=>{

               if(e.currentTarget.id===item.id){
                    setResPersonaje({
                         tipo:item.personaje,
                         vida:item.vida,
                         experiencia:item.experiencia,
                         nivel:item.nivel
                    })
               }
               return true;
          })
     }

    return( <div className='clasesEst'>
               <h1> Mis Clases</h1>
               <hr></hr>
               <div className='resumenClases'>     
                    <div className="misClases">
                         {data.map(item => { return <div id={item.id} onMouseOver={cambioTarjeta}><FichaClase key={item.id} clase={item}/></div>})}
                    </div>
                    <ResmPersonaje resPersonaje={resPersonaje} />
               </div>
               <div className="ingresarClase">
                    <h1>Matricularme en una clase</h1>
                    <hr></hr>
               </div>
            </div>)
 
}

import * as React from "react";
import { useEffect, useState } from "react";
import './clasesEst.css';

import data from '../../data_prueba/clases.json'
import FichaClase from '../../componentes/fichaClase/FichaClase'
import ResmPersonaje from '../../componentes/resmPersonaje/ResmPersonaje';

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Button } from "@mui/material";
import FichaMatricularClase from "../../componentes/fichaMatricularClase/FichaMatricularClase";
/* Estilos del boton "Entrar" */
const ColorButton = styled(Button)(({ theme }) => ({
     color: theme.palette.getContrastText(purple[500]),
     width: "144px",
     height: "44px",
     borderRadius: "10px",
     backgroundColor: "#008080",
     margin: "auto",
     marginTop: "45px",
     display: "flex",
     justifyContent: "center",
     fontFamily: "Sarabun, sans-serif",
     "&:hover": {
          backgroundColor: "#218c8c",
     },
}));


export default function ClasesEst(props) {
     let dataClases;


     useEffect(() => {
          getClases();
     }, [])


     const [clasesEst, setclasesEst] = useState([]);

     const [resPersonaje, setResPersonaje] = React.useState({
          tipo: "base",
          vida: "100",
          experiencia: "100",
          nivel: 0
     });


     function cambioTarjeta(e) {
          data.map(item => {

               if (e.currentTarget.id === item.id) {
                    setResPersonaje({
                         tipo: item.personaje,
                         vida: item.vida,
                         experiencia: item.experiencia,
                         nivel: item.nivel
                    })
               }
               return true;
          })
     }



     //Obtener todas las posibles clases
     const getClases = async () => {
          const urlBD = 'http://localhost:8080/api/clases/';

          const response = await fetch(`${urlBD}`);
          const data = await response.json();
          const { clasesBD } = data;
          dataClases = clasesBD;
          console.log(dataClases);
          setclasesEst(dataClases);
          
          // mapearClases();
          // return clasesBD;
     }

     const mapearClases = async () => {
          let clases = dataClases.map(item => { return <div id={item.id} ><FichaMatricularClase key={item.id} clase={item} /></div> })
          let containerClases = document.getElementById("misClasesUnirse");
          console.log(clases);
          // containerClases.innerHTML = clases;
     }

     const refreshClases = async () => {
          let contenedor = document.getElementsByClassName("misClasesUnirse");
          console.log(contenedor);
          await getClases();
          let test;
          test += dataClases.map(item => { return <div id={item.id} ><FichaMatricularClase key={item.id} clase={item} /></div> });
          console.log(test);

     }

     const test = () => {
          console.log(clasesEst);
     }


     return (<div className='clasesEst'>
          <h1> Mis Clases</h1>
          <hr></hr>
          <div className='resumenClases'>
               <div className="misClases">
                    {data.map(item => { return <div id={item.id} onMouseOver={cambioTarjeta}><FichaClase key={item.id} clase={item} /></div> })}
               </div>
               <ResmPersonaje resPersonaje={resPersonaje} />
          </div>
          <div className="ingresarClase">
               <h1>Matricularme en una clase</h1>
               <hr></hr>
               <div className="misClasesUnirse">
                    {clasesEst.map(item => { return <div id={item.id} ><FichaMatricularClase key={item.id} clase={item} /></div> })}

               </div>

               {/* <ColorButton variant="contained" type="submit" onClick={test}>
                    Actualizar clases
               </ColorButton> */}
          </div>
     </div>)

}
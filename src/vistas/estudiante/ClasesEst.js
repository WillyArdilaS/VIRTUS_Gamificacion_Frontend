
import * as React from "react";
import { useEffect, useState } from "react";
import './clasesEst.css';

import data from '../../data_prueba/clases.json'
import FichaMisClasesEst from '../../componentes/fichaMisClasesEst/FichaMisClasesEst'
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
          getClasesMatricular();
          getMisClases(props.data.usuario._id);
     }, [])


     const [misClases, setMisClases] = useState([]);
     const [clasesEstMatricular, setclasesEstMatricular] = useState([]);

     /*
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
     */

     //Obtener las clases a las que pertenece un estudiante
     const getMisClases = async (idEstudiante) => {
          const urlBD = 'http://localhost:8080/api/clasesEstudiante/claseEstudianteGET';
          const objectID = {
               idEstudiante: idEstudiante
          };

          const response = await fetch(`${urlBD}`, {
               method: 'POST',
               body: JSON.stringify(objectID),
               headers: {
                    'Content-Type': 'application/json'
               },
               redirect: 'follow'
          });
          const data = await response.json();
          const { infoClasesBD } = data;

          setMisClases(infoClasesBD);

     }

     //Obtener todas las posibles clases a las que un estudiante se puede matricular
     const getClasesMatricular = async () => {
          const urlBD = 'http://localhost:8080/api/clases/';

          const response = await fetch(`${urlBD}`);
          const data = await response.json();
          const { clasesBD } = data;
          dataClases = clasesBD;
          setclasesEstMatricular(dataClases);

     }




     return (<div className='clasesEst'>
          <div>
               <h1> Mis Clases</h1>
               <hr></hr>
               <div className="misClasesGrid">
                    {misClases.map(item => {
                         return <div id={item.id} ><FichaMisClasesEst key={item.id} clase={item}/></div>
                    })}
               </div>
          </div>

          {/* NO BORRAR AÚN */}
          {/* <div className='resumenClases'>
               <div className="misClases">
                    {data.map(item => { return <div id={item.id} onMouseOver={cambioTarjeta}><FichaClase key={item.id} clase={item} /></div> })}
               </div>
               <ResmPersonaje resPersonaje={resPersonaje} />
          </div> */}
          <div className="ingresarClase">
               <h1>Matricularme en una clase</h1>
               <hr></hr>
               <div className="misClasesUnirse">
                    {clasesEstMatricular.map(item => { return <div id={item.id} ><FichaMatricularClase key={item.id} clase={item} estudiante={props.data} /></div> })}

               </div>

          </div>
     </div>)

}
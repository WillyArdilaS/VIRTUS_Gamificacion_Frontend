
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
import { convertLength } from "@mui/material/styles/cssUtils";
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
     const [misClases, setMisClases] = useState([]);
     const [clasesEstMatricular, setclasesEstMatricular] = useState([]);
     const [textoBusqueda, setTextoBusqueda] = useState("");

     useEffect(() => {
          sessionStorage.removeItem("EstudianteClaseActual");
          getMisClases(JSON.parse(sessionStorage.getItem("usuario")).usuario._id);
     }, [])

     useEffect(() => {
          getClasesMatricular("");
     }, [misClases])

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
     const getClasesMatricular = async (filtro) => {
          const urlBD = 'http://localhost:8080/api/clases/';
          const response = await fetch(`${urlBD}`);
          const data = await response.json();
          const { clasesBD } = data;
          let arrayClases = []
          dataClases = clasesBD;

          if(filtro != "") {
               dataClases = clasesBD.filter((clase) => {
                    return(
                         clase.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
                         // clase.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
                         // clase.dificultad.toLowerCase().includes(filtro.toLowerCase()) ||
                         clase.descripcion.toLowerCase().includes(filtro.toLowerCase())
                    );
               });
          }

          dataClases.map((clase) => {
               if(!JSON.stringify(misClases).includes(JSON.stringify(clase))) {
                    if(!arrayClases.includes(clase)) {
                         arrayClases.push(clase)
                    }
               }
          }) 
          setclasesEstMatricular(arrayClases);
     }

     // Funcionamiento del buscador
     const handleChange = (e) => {
          setTextoBusqueda(e.target.value);

          getClasesMatricular(e.target.value);
     }
     
     return (<div className='clasesEst'>
          <div>
               <h1> Mis Clases</h1>
               <div className="misClasesGrid">
                    {misClases.map(item => {
                         return <div key={item._id} id={item._id} ><FichaMisClasesEst clase={item} funcionClaseIndividual={props.funcionClaseIndividual}/></div>
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
               <div className="buscador">
                    <input 
                         type="text"
                         value={textoBusqueda}
                         placeholder="Filtrar por nombre, código, descripción o dificultad..."
                         onChange={handleChange}
                    ></input>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
               </div>

               <div className="misClasesUnirse">
                    {clasesEstMatricular.map(item => { return <div key={item._id} id={item._id} ><FichaMatricularClase clase={item} estudiante={JSON.parse(sessionStorage.getItem("usuario"))} 
                    getMisClases={getMisClases}/></div> })}
               </div>
          </div>
     </div>)

}
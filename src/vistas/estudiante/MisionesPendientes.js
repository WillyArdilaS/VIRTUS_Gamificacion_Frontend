
import * as React from "react";
import { useEffect, useState } from "react";
import './MisionesPendientes.css';

import FichaMisClasesEst from '../../componentes/fichaMisClasesEst/FichaMisClasesEst'


export default function MisionesPendientes(props) {
     const [misClases, setMisClases] = useState([]);
     const [misActividades, setMisActividades] = useState([]);


     useEffect(() => {
          sessionStorage.removeItem("EstudianteClaseActual");
          getMisActividades();
          getMisClases(JSON.parse(sessionStorage.getItem("usuario")).usuario._id);
     }, [])

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

     const getMisActividades = async () => {
        const urlBD = 'http://localhost:8080/api/actividad';
     
        const response = await fetch(`${urlBD}`);
        const { actividadesBD } = await response.json();

        setMisActividades(actividadesBD);
   }

     return (
          <div className="main-view">
               <h1>Misiones Pendientes</h1>

               <div className="container-clases">
                    {misClases.map(item => {
                         return <div key={item._id} className="clases" >
                            <div >
                                <h2>{item.nombre}</h2>
                                <h3>{item.codigoGrupo}</h3>

                            </div>


                            <div className="container-actividades"> 
                                {misActividades.map((activity)=> {if(activity.claseFK === item._id){
                                    return  <div className="actividad" key={activity._id}><FichaMisClasesEst clase={activity} funcionClaseIndividual={props.funcionClaseIndividual}/></div>
                                }else{
                                    return null
                                }
                            })

                                }
                                <div> 

                                </div>
                            </div>
                        </div>
                    })}
               </div>
          </div>

      
     )

}
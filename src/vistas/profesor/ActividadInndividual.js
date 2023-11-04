import './actividadIndividual.css';
import { useEffect, useState } from "react";
import FichaNota from "../../componentes/fichaNota/FichaNota";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Button } from "@mui/material";

/* Estilos del boton "Entrar" */
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    width: "184px",
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



export default function PerfilProf(props) {
 
    
    const [notas, setNotas] = useState([]); //Notas indivuduales del get
    const [actividad, setActividad] = useState([]); //Actividad de la pagina anterior

    const [crearActivity, setCrearActivity] = useState({ //datos formulario actulizacion
        nameForm: "",
        recompensaForm: "",
        castigoForm: "",
        descripcionForm: "",
        dificultadForm: "",
        fechaVencimientoForm: ""
    })

    const handleChange = (e) => {
        setCrearActivity({
            ...crearActivity,
            [e.target.name]: e.target.value,
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        let aux = actividad;
        let count=0;

        //verificacion si hay algun cambio----------------------------------------
        if(crearActivity.nameForm !== "" ){
            aux.nombre = crearActivity.nameForm;
            count++;
        }
        if(crearActivity.recompensaForm !== "" ){
            aux.recompensa= crearActivity.recompensaForm;
            count++;
        }
        if(crearActivity.castigoForm !== "" ){
            aux.castigo= crearActivity.castigoForm;
            count++;
        }
        if(crearActivity.descripcionForm !== "" ){
            aux.descripcion= crearActivity.descripcionForm;
            count++;
        }
        if(crearActivity.dificultadForm !== "" ){
            
            if(crearActivity.dificultadForm == "facil" || crearActivity.dificultadForm =="medio" || crearActivity.dificultadForm =="dificil"){
                aux.descripcion= crearActivity.dificultadForm;
                count++;
            }else{
                alert("Valor no valido de dificultad")
            }
            
        }
        if(crearActivity.fechaVencimientoForm !== "" ){
            aux.fechaVencimiento= crearActivity.fechaVencimientoForm;
            count++;
        }



        //se manda el post con la actividad y sus datos actulizados su hay algun cambio
        if(count==0){
            alert("No hay cambios")
            console.log(aux)
        }else{
            alert("Cambios realizados")
            //se reliza el post y actuliza el dato actual ---------------------------------------------------
            //eventPostActivity(aux);
            setActividad(aux)
        }
        
    }


    //carga inicial de datos
    useEffect(() => {
        setActividad(JSON.parse(localStorage.getItem("actividad")))
        getNotas(JSON.parse(localStorage.getItem("actividad"))._id);
    }, [])


    //Peticiones
    const getNotas = async (filtro) => {
        const urlBD = "http://localhost:8080/api/nota/obtenerNotasPorActividad?idActividad="+ filtro;
        const response = await fetch(`${urlBD}`);
        const notasBD= await response.json();
        setNotas(notasBD.notas);
    }

    //animacino del formulaio
    const animation =(e)=>{
        const respuesta = e.currentTarget.querySelector('.formularioEdid')
        
        console.log(respuesta)

        if(!respuesta.style.maxHeight){
            respuesta.style.maxHeight=' 300px';
            respuesta.style.opacity='1';
        }


    }
    

    return (
        <div className="infoClase">
            <h1>Reporte de la actividad</h1>
            <p>Estado: {actividad.disponible ? "Disponible":"No disponible"}</p>
            <p>Nombre: {actividad.nombre}</p>
            <p>Fecha limite: {actividad.fechaVencimiento}</p>
            <p>Castigo: {actividad.castigo}</p>
            <p>Recompensa: {actividad.recompensa}</p>
            <p>Descripcion: {actividad.descripcion}</p>
            <hr></hr>
            <h1>Notas</h1>
            <div className='fichasNotas'>
                {notas.map(item => {
                return(<FichaNota key={item._id} value={item}></FichaNota>)
            })}
            </div>
            
            <hr></hr>
         
            <div className="formularioActividad" onClick={animation}>
                <button className='editSelec'> Editar Actividad </button>
                    <div className='formularioEdid'>
                        <form onSubmit={handleSubmit}>
                            <p>Nombre</p>
                            <input
                                type="text"
                                name="nameForm"
                                value={crearActivity.nameForm}
                                onChange={handleChange}
                                placeholder= {actividad.nombre}
                            ></input>
                            <p>Descripcion</p>
                            <input
                                type="text"
                                name="descripcionForm"
                                value={crearActivity.descripcionForm}
                                onChange={handleChange}
                                placeholder= {actividad.descripcion}
                            ></input>
                            <p>Dificultad (facil, medio, dificil)</p>
                            <input
                                type="text"
                                name="dificultadForm"
                                value={crearActivity.dificultadForm}
                                onChange={handleChange}
                                placeholder= {actividad.dificultad}>
                            </input>
                            <p>Puntos de experiencia - Recompensa</p>
                            <input
                                type="number"
                                name="recompensaForm"
                                value={crearActivity.recompensaForm}
                                onChange={handleChange}
                                placeholder= {actividad.recompensa}
                            ></input>
                            <p>Daño por fallar la actividad - Castigo</p>
                            <input
                                type="number"
                                name="castigoForm"
                                value={crearActivity.castigoForm}
                                onChange={handleChange}
                                placeholder= {actividad.castigo}
                            ></input>
                            <p>Fecha de vencimiento: {actividad.fechaVencimiento}</p>
                            <input
                                type="date"
                                name="fechaVencimientoForm"
                                min={new Date().toISOString().split('T')[0]}
                                value={crearActivity.fechaVencimientoForm}
                                onChange={handleChange}
                            ></input>

                            <ColorButton variant="contained" type="submit">
                                Crear Actividad
                            </ColorButton>
                        </form>
                    </div>
                </div>

            
        </div>)
}
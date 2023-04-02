import './claseIndividualProfesor.css';
import { useEffect, useState } from "react";


import FichaActividad from '../../componentes/fichaActividad/FichaActividad'

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Button, cardHeaderClasses, Link } from "@mui/material";
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



export default function ClaseIndividualProfesor(props) {

    useEffect(() => {
        getActivity(props.clase._id);
    }, [])



    const [activity, setActivity] = useState([]); //Actividades individuales
    const [crearActivity, setCrearActivity] = useState({ //Form
        recompensaForm: "",
        castigoForm: "",
        descripcionForm: "",
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
        eventPostActivity();
    }

    //Peticiones
    const getActivity = async (filtro) => {
        const urlBD = "http://localhost:8080/api/actividad";
        const response = await fetch(`${urlBD}`);
        const { actividadesBD } = await response.json();


        let actividadesFiltradas = actividadesBD.filter(actividad => actividad.claseFK == filtro);
        setActivity(actividadesFiltradas);
        // console.log(actividadesFiltradas);
    }

    const postActivity = async (objectActivity) => {
        const urlBD = 'http://localhost:8080/api/actividad';
        const response = await fetch(`${urlBD}`,
            {
                method: 'POST',
                body: JSON.stringify(objectActivity),
                headers: {
                    'Content-Type': 'application/json',
                    'TokenRol': JSON.parse(sessionStorage.getItem("usuario")).token,
                }
            });
        const data = await response.json();
        console.log(data);
        return data;
    }

    const eventPostActivity = async () => {
        const objectActivity = {
            fechaVencimiento: crearActivity.fechaVencimientoForm,
            recompensa: crearActivity.recompensaForm,
            castigo: crearActivity.castigoForm,
            descripcion: crearActivity.descripcionForm,
            claseFK: props.clase._id
        }

        const response = await postActivity(objectActivity);
        alert("Actividad Creada");
        setCrearActivity({
            recompensaForm: "",
            castigoForm: "",
            descripcionForm: "",
            fechaVencimientoForm: ""
        })
    }

    return (
        <div className="infoClase">
            <h1>Información de la clase</h1>
            <p>Nombre clase: {props.clase.nombre}</p>
            <p>Descripción {props.clase.descripcion}</p>
            <hr></hr>

            <div className="infoActividades">
                <h1>Actividades de clase</h1>
                <div className="contenidoInfoActividades">
                    {/* <FichaActividad actividad={activity}/> */}
                    {activity.map(actividad => { return <div id={actividad._id}> <FichaActividad actividad={actividad}></FichaActividad> </div> })}

                </div>
            </div>

            {/* FORM PROVISIONAL */}
            <div className="crearClase">
                <h1>Crear actividad</h1>
                <hr></hr>

                <div>
                    <div className="formularioActividad">
                        <h1 className="login_titleProfesor">Ingrese los datos de la actividad</h1>
                        <form onSubmit={handleSubmit}>
                            <p>Puntos de experiencia - Recompensa</p>
                            <input
                                type="number"
                                name="recompensaForm"
                                value={crearActivity.recompensaForm}
                                onChange={handleChange}
                                required
                            ></input>
                            <p>Daño por fallar la actividad - Castigo</p>
                            <input
                                type="number"
                                name="castigoForm"
                                value={crearActivity.castigoForm}
                                onChange={handleChange}
                                required
                            ></input>
                            <p>Descripcion</p>
                            <input
                                type="text"
                                name="descripcionForm"
                                value={crearActivity.descripcionForm}
                                onChange={handleChange}
                                required
                            ></input>
                            <p>Fecha de vencimiento</p>
                            <input
                                type="date"
                                name="fechaVencimientoForm"
                                value={crearActivity.fechaVencimientoForm}
                                onChange={handleChange}
                                required
                            ></input>

                            <ColorButton variant="contained" type="submit">
                                Crear Actividad
                            </ColorButton>
                        </form>
                    </div>
                </div>


            </div>
        </div>)

}
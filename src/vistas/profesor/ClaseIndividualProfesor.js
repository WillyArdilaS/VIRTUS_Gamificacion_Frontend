import './claseIndividualProfesor.css';
import { useEffect, useState } from "react";


import FichaActividad from '../../componentes/fichaActividad/FichaActividad'

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

export default function ClaseIndividualProfesor() {

    useEffect(() => {
        getActivity(JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id);
    }, [])


    const [activity, setActivity] = useState([]); //Actividades individuales
    const [crearActivity, setCrearActivity] = useState({ //Form
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
        eventPostActivity();
    }

    //Peticiones
    const getActivity = async (filtro) => {
        const urlBD = "http://localhost:8080/api/actividad";
        const response = await fetch(`${urlBD}`);
        const { actividadesBD } = await response.json();
        let actividadesFiltradas = actividadesBD.filter(actividad => actividad.claseFK == filtro);
        setActivity(actividadesFiltradas);
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
  
        return data;
    }

    const eventPostActivity = async () => {
        const objectActivity = {
            nombre: crearActivity.nameForm,
            fechaVencimiento: crearActivity.fechaVencimientoForm,
            recompensa: crearActivity.recompensaForm,
            castigo: crearActivity.castigoForm,
            descripcion: crearActivity.descripcionForm,
            dificultad: crearActivity.dificultadForm,
            claseFK: JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id
        }

        const response = await postActivity(objectActivity);
        alert("Actividad Creada");
        setCrearActivity({
            nameForm: "",
            recompensaForm: "",
            castigoForm: "",
            descripcionForm: "",
            dificultadForm: "",
            fechaVencimientoForm: ""
        })
        getActivity(JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id)
    }

    return (
        <div className="infoClase">
            <h1>Información de la clase</h1>
            <p>Nombre clase: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).nombre}</p>
            <p>Codigo del grupo: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).codigoGrupo}</p>
            <p>Descripción: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).descripcion}</p>
            <p>Dificultad: {JSON.parse(sessionStorage.getItem("ProfesorClaseActual")).dificultad}</p>
            <hr></hr>

            <div className="infoActividades">
                <h1>Actividades de clase</h1>
                <div className="contenidoInfoActividades">
                    {/* <FichaActividad actividad={activity}/> */}
                    {activity.map(actividad => { return <div key={actividad._id} id={actividad._id}> <FichaActividad actividad={actividad}></FichaActividad> </div> })}

                </div>
            </div>

            <div className="crearClase">
                <h1>Crear actividad</h1>
                <hr></hr>

                <div>
                    <div className="formularioActividad">
                        <h1 className="login_titleProfesor">Ingrese los datos de la actividad</h1>
                        <form onSubmit={handleSubmit}>
                            <p>Nombre</p>
                            <input
                                type="text"
                                name="nameForm"
                                value={crearActivity.nameForm}
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
                            <p>Dificultad (facil, medio, dificil)</p>
                            <input
                                type="text"
                                name="dificultadForm"
                                value={crearActivity.dificultadForm}
                                onChange={handleChange}
                                required>
                            </input>
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
                            <p>Fecha de vencimiento</p>
                            <input
                                type="date"
                                name="fechaVencimientoForm"
                                min={new Date().toISOString().split('T')[0]}
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
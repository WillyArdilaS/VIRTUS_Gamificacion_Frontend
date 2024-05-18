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
        localStorage.clear()
    }, [])


    const [activity, setActivity] = useState([]); //Actividades individuales
    const [crearActivity, setCrearActivity] = useState({ //Form
        nameForm: "",
        recompensaForm: "",
        castigoForm: "",
        descripcionForm: "",
        dificultadForm: "",
        tipoJuegoForm: "",
        filasSopaLetras: "",
        columnasSopaLetras: "",
        palabrasSopaLetras: Array(10).fill(""),
        fechaVencimientoForm: ""
    })

    const handleChange = (e) => {
        setCrearActivity({
            ...crearActivity,
            [e.target.name]: e.target.value,
        });
    };

    const postCrucigrama = async (e) => {
        e.preventDefault();
        let $form = e.target, values = Object.fromEntries(new FormData($form)),
            filas = parseInt(values.filasSopaLetras),
            columnas = parseInt(values.columnasSopaLetras),
            matriz = Array(filas).fill([]);
        matriz = matriz.map(() => Array(columnas).fill(""));
        console.log(values);
        for (let i = 0; i < filas; i++)
            for (let j = 0; j < columnas; j++)
                matriz[i][j] = values[`${i},${j}`];
        console.log(matriz);

        let res = await fetch('http://localhost:8080/api/juego', {
            method: 'POST',
            body: JSON.stringify({
                titulo: crearActivity.nameForm,
                tipo: crearActivity.tipoJuegoForm,
                matriz: matriz,
            }),
            headers: {
                'Content-Type': 'application/json',
                'TokenRol': JSON.parse(sessionStorage.getItem("usuario")).token,
            }
        })
        let data = await res.json();

        const objectActivity = {
            nombre: crearActivity.nameForm,
            fechaVencimiento: crearActivity.fechaVencimientoForm,
            recompensa: crearActivity.recompensaForm,
            castigo: crearActivity.castigoForm,
            descripcion: crearActivity.descripcionForm,
            dificultad: crearActivity.dificultadForm,
            claseFK: JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id,
            juegoFK: data.juego._id
        }

        let $matriz = document.getElementById("matrix");
        $matriz.innerHTML = "";
        const response = await postActivity(objectActivity);

        alert("Actividad Creada");
        setCrearActivity({
            nameForm: "",
            recompensaForm: "",
            castigoForm: "",
            descripcionForm: "",
            dificultadForm: "",
            tipoJuegoForm: "",
            filasSopaLetras: "",
            columnasSopaLetras: "",
            palabrasSopaLetras: Array(10).fill(""),
            fechaVencimientoForm: ""
        });
        getActivity(JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id);
    }

    function handleSubmit(event) {
        event.preventDefault();
        crearActivity.tipoJuegoForm === "crucigrama" ? postCrucigrama(event) :
            eventPostActivity();
    }

    //Peticiones
    const getActivity = async (filtro) => {
        const urlBD = "http://localhost:8080/api/actividad";
        const response = await fetch(`${urlBD}`);
        const { actividadesBD } = await response.json();
        let actividadesFiltradas = actividadesBD.filter(actividad => actividad.claseFK === filtro);
        setActivity(actividadesFiltradas);
    }

    const postJuego = async (juegoData) => {
        const urlJuego = 'http://localhost:8080/api/juego';
        const response = await fetch(`${urlJuego}`,
            {
                method: 'POST',
                body: JSON.stringify(juegoData),
                headers: {
                    'Content-Type': 'application/json',
                    'TokenRol': JSON.parse(sessionStorage.getItem("usuario")).token,
                },
            });
        const data = await response.json();
        return data.juego._id;
    };

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
        let juegoId;
        try {

            if (crearActivity.tipoJuegoForm === "sopa-letras") {
                const palabrasTransformadas = crearActivity.palabrasSopaLetras
                    .filter(palabra => palabra)
                    .map(palabra => ({ palabra: palabra }));

                const juegoData = {
                    titulo: crearActivity.nameForm,
                    tipo: crearActivity.tipoJuegoForm,
                    filas: crearActivity.filasSopaLetras,
                    columnas: crearActivity.columnasSopaLetras,
                    palabras: palabrasTransformadas,
                }

                juegoId = await postJuego(juegoData);
            }

            const objectActivity = {
                nombre: crearActivity.nameForm,
                fechaVencimiento: crearActivity.fechaVencimientoForm,
                recompensa: crearActivity.recompensaForm,
                castigo: crearActivity.castigoForm,
                descripcion: crearActivity.descripcionForm,
                dificultad: crearActivity.dificultadForm,
                claseFK: JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id,
                juegoFK: juegoId
            }

            const response = await postActivity(objectActivity);
            alert("Actividad Creada");

            setCrearActivity({
                nameForm: "",
                recompensaForm: "",
                castigoForm: "",
                descripcionForm: "",
                dificultadForm: "",
                tipoJuegoForm: "",
                filasSopaLetras: "",
                columnasSopaLetras: "",
                palabrasSopaLetras: Array(10).fill(""),
                fechaVencimientoForm: ""
            });

            getActivity(JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id);
        } catch (error) {
            console.error("Error al crear actividad")
        }
    }

    const drawMatrix = (e) => {
        e.preventDefault();
        let $form = e.target.closest("form"),
            filas = $form.filasSopaLetras.value,
            columnas = $form.columnasSopaLetras.value;
        if (filas && columnas) {
            let matriz = document.getElementById("matrix");
            matriz.innerHTML = "";
            for (let i = 0; i < filas; i++) {
                let row = document.createElement("div");
                row.className = "row";
                for (let j = 0; j < columnas; j++) {
                    let input = document.createElement("input");
                    input.type = "text";
                    input.maxLength = "1";
                    input.name = `${i},${j}`;
                    input.style.width = "30px";
                    row.appendChild(input);
                }
                matriz.appendChild(row);
            }
        }
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
                            <p>Dificultad</p>
                            <select
                                name="dificultadForm"
                                value={crearActivity.dificultadForm}
                                onChange={handleChange}
                                required>
                                <option value="">Seleccionar dificultad</option>
                                <option value="facil">Fácil</option>
                                <option value="medio">Medio</option>
                                <option value="dificil">Dificil</option>
                            </select>
                            <p>Tipo de Juego</p>
                            <select
                                name="tipoJuegoForm"
                                value={crearActivity.tipoJuegoForm}
                                onChange={handleChange}
                                required>
                                <option value="">Seleccionar tipo de juego</option>
                                <option value="sopa-letras">Sopa de Letras</option>
                                <option value="crucigrama">Crucigrama</option>
                                <option value="preguntas">Preguntas</option>
                            </select>
                            {crearActivity.tipoJuegoForm === 'sopa-letras' && (
                                <>
                                    <p>Filas</p>
                                    <input
                                        type="number"
                                        name="filasSopaLetras"
                                        value={crearActivity.filasSopaLetras}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        required
                                    />
                                    <p>Columnas</p>
                                    <input
                                        type="number"
                                        name="columnasSopaLetras"
                                        value={crearActivity.columnasSopaLetras}
                                        onChange={handleChange}
                                        min="1"
                                        max="10"
                                        required
                                    />
                                    <p>Palabras (máximo 10)</p>
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            name={`palabra${index}`}
                                            value={crearActivity.palabrasSopaLetras[index]}
                                            onChange={(e) => {
                                                const nuevasPalabras = [...crearActivity.palabrasSopaLetras];
                                                nuevasPalabras[index] = e.target.value;
                                                handleChange({
                                                    target: {
                                                        name: "palabrasSopaLetras",
                                                        value: nuevasPalabras,
                                                    },
                                                });
                                            }}
                                            required={index < 5}
                                        />
                                    ))}
                                </>
                            )}
                            {crearActivity.tipoJuegoForm === 'crucigrama' && (
                                <>
                                    <p>Filas</p>
                                    <input
                                        type="number"
                                        name="filasSopaLetras"
                                        value={crearActivity.filasSopaLetras}
                                        onChange={handleChange}
                                        min="1"
                                        max="15"
                                        required
                                    />
                                    <p>Columnas</p>
                                    <input
                                        type="number"
                                        name="columnasSopaLetras"
                                        value={crearActivity.columnasSopaLetras}
                                        onChange={handleChange}
                                        min="1"
                                        max="15"
                                        required
                                    />
                                    <button style={{ display: "block", marginTop: "1rem" }} onClick={(e) => drawMatrix(e)}>Dibujar</button>
                                </>
                            )}
                            <div id="matrix"></div>
                            <p>Puntos de experiencia - Recompensa</p>
                            <input
                                type="number"
                                name="recompensaForm"
                                min="0"
                                value={crearActivity.recompensaForm}
                                onChange={handleChange}
                                required
                            ></input>
                            <p>Daño por fallar la actividad - Castigo</p>
                            <input
                                type="number"
                                name="castigoForm"
                                min="0"
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
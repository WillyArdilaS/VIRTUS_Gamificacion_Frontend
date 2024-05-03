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


    const [nuevaPreguntaUnica, setNuevaPreguntaUnica] = useState({
        pregunta: "",
        tiempo: "",
        respuesta: ""
    });

// 2. Crear funciones para manejar los cambios en los campos de la nueva pregunta.
    const handleQuestionChangeUnica = (event) => {
        setNuevaPreguntaUnica({ ...nuevaPreguntaUnica, pregunta: event.target.value });
    };

    const handleAnswerChangeUnica = (event) => {
        setNuevaPreguntaUnica({ ...nuevaPreguntaUnica, respuesta: event.target.value });
    };

    const handleTimeChangeUnica = (event) => {
        setNuevaPreguntaUnica({ ...nuevaPreguntaUnica, tiempo: event.target.value });
    };

// 3. Crear una función para agregar la nueva pregunta al estado de las preguntas existentes.
    const handleAddQuestionUnica = () => {
        setLocalPreguntas(prevPreguntas => [...prevPreguntas, nuevaPreguntaUnica]);
        setNuevaPreguntaUnica({
            pregunta: "",
            tiempo: "",
            respuesta: ""
        });
    };

    useEffect(() => {
        getActivity(JSON.parse(sessionStorage.getItem("ProfesorClaseActual"))._id);
        localStorage.clear()
    }, [])

    const [localPreguntas, setLocalPreguntas] = useState([]);
    const [nuevaPregunta, setNuevaPregunta] = useState({
        pregunta: "",
        opciones: [],
        tiempo: "",
        respuesta: ""
    });

    const handleAddQuestion = () => {
        setLocalPreguntas(prevPreguntas => [...prevPreguntas, nuevaPregunta]);
        setNuevaPregunta({
            pregunta: "",
            opciones: [],
            tiempo: "",
            respuesta: ""
        });
    };

    const handleQuestionChange = (event) => {
        setNuevaPregunta({ ...nuevaPregunta, pregunta: event.target.value });
    };

    const handleAnswerChange = (event) => {
        setNuevaPregunta({ ...nuevaPregunta, respuesta: event.target.value });
    };

    const handleTimeChange = (event) => {
        setNuevaPregunta({ ...nuevaPregunta, tiempo: event.target.value });
    };

    const [nuevaPreguntaMultiple, setNuevaPreguntaMultiple] = useState({
        pregunta: "",
        tiempo: "",
        opciones: [],
        respuesta: []
    });

    const handleQuestionChangeMultiple = (event) => {
        setNuevaPreguntaMultiple({ ...nuevaPreguntaMultiple, pregunta: event.target.value });
    };

    const handleOptionChangeMultiple = (index) => (event) => {
        const newOptions = [...nuevaPreguntaMultiple.opciones];
        newOptions[index] = event.target.value;
        setNuevaPreguntaMultiple({ ...nuevaPreguntaMultiple, opciones: newOptions });
    };

    const handleAnswerChangeMultiple = (index) => (event) => {
        let newAnswers;
        if (event.target.checked) {
            newAnswers = [...nuevaPreguntaMultiple.respuesta, index];
        } else {
            newAnswers = nuevaPreguntaMultiple.respuesta.filter(answerIndex => answerIndex !== index);
        }
        setNuevaPreguntaMultiple({ ...nuevaPreguntaMultiple, respuesta: newAnswers });
    };

    const handleTimeChangeMultiple = (event) => {
        setNuevaPreguntaMultiple({ ...nuevaPreguntaMultiple, tiempo: event.target.value });
    };

    const handleAddQuestionMultiple = () => {
        setLocalPreguntas(prevPreguntas => [...prevPreguntas, nuevaPreguntaMultiple]);
        setNuevaPreguntaMultiple({
            pregunta: "",
            tiempo: "",
            opciones: [],
            respuesta: []
        });
    };

    const [preguntas, setPreguntas] = useState([]);
    const [activity, setActivity] = useState([]); //Actividades individuales
    const [crearActivity, setCrearActivity] = useState({ //Form
        nameForm: "",
        recompensaForm: "",
        castigoForm: "",
        descripcionForm: "",
        dificultadForm: "",
        tipoJuegoForm: "",
        tipoPreguntaForm: "",
        filasSopaLetras: "",
        columnasSopaLetras: "",
        palabrasSopaLetras: Array(10).fill(""),
        enunciadoPreguntas: "",
        textoOpcionA: "",
        textoOpcionB: "",
        textoOpcionC: "",
        textoOpcionD: "",
        tiempoPregunta: "",
        fechaVencimientoForm: "",
        preguntas: []
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
            } else if(crearActivity.tipoJuegoForm === "preguntas"){
                const juegoData = {
                    titulo: crearActivity.nameForm,
                    tipo: crearActivity.tipoJuegoForm,
                    preguntas: localPreguntas.map(pregunta => ({
                        ...pregunta,
                        opciones: crearActivity.tipoPreguntaForm === 'verdadero-falso' ? ['verdadero', 'falso'] : pregunta.opciones
                    }))
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
                            {crearActivity.tipoJuegoForm === 'preguntas' && (
                                <>
                                    <p>TipoPregunta</p>
                                    <select name='tipoPreguntaForm'
                                        value={crearActivity.tipoPreguntaForm}
                                        onChange={handleChange}>
                                        <option value="">Seleccionar tipo de pregunta</option>
                                        <option value="unica-respuesta">Única respuesta</option>
                                        <option value="multiple-respuesta">Multiple respuesta</option>
                                        <option value="verdadero-falso">Verdadero - Falso</option>
                                    </select>
                                    {crearActivity.tipoPreguntaForm === 'unica-respuesta' && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Pregunta"
                                                value={nuevaPreguntaUnica.pregunta}
                                                onChange={handleQuestionChangeUnica}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Respuesta"
                                                value={nuevaPreguntaUnica.respuesta}
                                                onChange={handleAnswerChangeUnica}
                                            />
                                            <input
                                                type="number"
                                                placeholder="Tiempo"
                                                value={nuevaPreguntaUnica.tiempo}
                                                onChange={handleTimeChangeUnica}
                                            />
                                            <button onClick={handleAddQuestionUnica}>Agregar pregunta</button>
                                            {localPreguntas.map((pregunta, index) => (
                                                <div key={index}>
                                                    <p>Pregunta: {pregunta.pregunta}</p>
                                                    <p>Respuesta: {pregunta.respuesta}</p>
                                                    <p>Tiempo: {pregunta.tiempo}</p>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {crearActivity.tipoPreguntaForm === 'multiple-respuesta' && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Pregunta"
                                                value={nuevaPreguntaMultiple.pregunta}
                                                onChange={handleQuestionChangeMultiple}
                                            />
                                            {Array.from({ length: 4 }).map((_, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="text"
                                                        placeholder={`Opción ${index + 1}`}
                                                        value={nuevaPreguntaMultiple.opciones[index] || ''}
                                                        onChange={handleOptionChangeMultiple(index)}
                                                    />
                                                    <input
                                                        type="checkbox"
                                                        checked={nuevaPreguntaMultiple.respuesta.includes(index)}
                                                        onChange={handleAnswerChangeMultiple(index)}
                                                    />
                                                </div>
                                            ))}
                                            <input
                                                type="number"
                                                placeholder="Tiempo"
                                                value={nuevaPreguntaMultiple.tiempo}
                                                onChange={handleTimeChangeMultiple}
                                            />
                                            <button onClick={handleAddQuestionMultiple}>Agregar pregunta</button>
                                            {localPreguntas.map((pregunta, index) => (
                                                <div key={index}>
                                                    <p>Pregunta: {pregunta.pregunta}</p>
                                                    <p>Opciones: {pregunta.opciones.join(', ')}</p>
                                                    <p>Respuestas: {pregunta.respuesta.map(answerIndex => pregunta.opciones[answerIndex]).join(', ')}</p>
                                                    <p>Tiempo: {pregunta.tiempo}</p>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                    {crearActivity.tipoPreguntaForm === 'verdadero-falso' && (
                                        <>
                                            <div>
                                                {localPreguntas.map((pregunta, index) => (
                                                    <div key={index}>
                                                        <p>Pregunta: {pregunta.pregunta}</p>
                                                        <p>Respuesta: {pregunta.respuesta}</p>
                                                        <p>Tiempo: {pregunta.tiempo}</p>
                                                    </div>
                                                ))}
                                                <input
                                                    type="text"
                                                    placeholder="Pregunta"
                                                    value={nuevaPregunta.pregunta}
                                                    onChange={handleQuestionChange}
                                                />
                                                <select
                                                    value={nuevaPregunta.respuesta}
                                                    onChange={handleAnswerChange}
                                                >
                                                    <option value="">Seleccionar respuesta</option>
                                                    <option value="verdadero">Verdadero</option>
                                                    <option value="falso">Falso</option>
                                                </select>
                                                <input
                                                    type="number"
                                                    placeholder="Tiempo"
                                                    value={nuevaPregunta.tiempo}
                                                    onChange={handleTimeChange}
                                                />
                                                <button onClick={handleAddQuestion}>Agregar pregunta</button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
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
import * as React from "react";
import './clasesProfesor.css';
import clasesTDB from '../../data_prueba/clasesTDB.json';
import { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Button, cardHeaderClasses, Link } from "@mui/material";
import FichaMatricularClase from "../../componentes/fichaMatricularClase/FichaMatricularClase";
import FichaClase from "../../componentes/fichaClase/FichaClase";
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


export default function ClasesProfesor(props) {

    useEffect(() => {
        sessionStorage.removeItem("ProfesorClaseActual");
        getClases(JSON.parse(sessionStorage.getItem("usuario")).usuario._id);
    }, [])


    const [clase, setClase] = useState({
        id: 0,
        nomClase: "",
        codigo: "",
        descripcion: "",
        dificultad: ""
    });

    const [clasesProf, setclasesProf] = useState([]);

    const handleChange = (e) => {
        if(e.target.name == "nomClase") {
            const selectedNombre = e.target.value;
            const selectedClase = clasesTDB.find(item => item.nombre === selectedNombre);
            setClase({
              ...clase,
              id: selectedClase.id,
              [e.target.name]: selectedNombre,
            });  
        } else{
            setClase({
                ...clase,
                [e.target.name]: e.target.value,
              });  
        }
    };

    function handleSubmit(event) {
        event.preventDefault();
        crearClase();
    }

    const sendClass = async (objectClass) => {
        const urlBD = 'http://localhost:8080/api/clases/';
        const response = await fetch(`${urlBD}`,
            {
                method: 'POST',
                body: JSON.stringify(objectClass),
                headers: {
                    'Content-Type': 'application/json',
                    'TokenRol': JSON.parse(sessionStorage.getItem("usuario")).token,
                }
            });
        const data = await response.json();
        // console.log(data);
        return data;
    }

    const crearClase = async () => {
        const objectClass = {
            id: clase.id,
            nombre: clase.nomClase,
            codigo: clase.codigo,
            descripcion: clase.descripcion,
            dificultad: clase.dificultad,
            usuarioProfesorFK: JSON.parse(sessionStorage.getItem("usuario")).usuario._id
        }

        const response = await sendClass(objectClass);
        alert("Clase Creada");
        setClase({
            id: 0,
            nomClase: "",
            codigo: "",
            descripcion: "",
            dificultad: ""
        })
        getClases(JSON.parse(sessionStorage.getItem("usuario")).usuario._id)
    }


    const getClases = async (filtro) => {
        const urlBD = 'http://localhost:8080/api/clases/';

        const response = await fetch(`${urlBD}`);
        const data = await response.json();
        const { clasesBD } = data;
        let clasesFiltradas = clasesBD.filter(clase => clase.usuarioProfesorFK == filtro);
        // console.log(clasesBD);
        // console.log(clasesFiltradas);

        setclasesProf(clasesFiltradas);
    }


    return (<div className='clasesProfesor'>
        <div className="crearClase">
            <h1>Crear una clase</h1>
            <hr></hr>

            <div>
                <div className="formulario">
                    <h1 className="login_titleProfesor">Ingrese los datos de la clase</h1>
                    <form onSubmit={handleSubmit}>
                        <p>Nombre de la clase</p>
                        <select name="nomClase" value={clase.nomClase} onChange={handleChange} required>
                            <option value="" disabled hidden></option>
                            {clasesTDB.map(item => {
                                return(<option key={item.id} value={item.nombre}> {item.nombre} </option>)
                            })}
                        </select>

                        <p>Código del grupo</p>
                        <input
                            type="text"
                            name="codigo"
                            value={clase.codigo}
                            onChange={handleChange}
                            required
                        ></input>

                        <p>Descripción</p>
                        <input
                            type="text"
                            name="descripcion"
                            value={clase.descripcion}
                            onChange={handleChange}
                            required
                        ></input>

                        <p>Dificultad</p>
                        <select name="dificultad" value={clase.dificultad} onChange={handleChange} required>
                            <option value="" disabled hidden></option>
                            <option value="facil"> Fácil </option>
                            <option value="medio"> Medio </option>
                            <option value="dificil"> Díficil </option>
                        </select>

                        <ColorButton variant="contained" type="submit">
                            Crear Clase
                        </ColorButton>
                    </form>
                </div>
            </div>


        </div>
        <h1> Mis Clases</h1>
        <hr></hr>
        <div className="misClasesUnirse">
            {clasesProf.map(item => {
                return <div id={item.id}><FichaClase key={item.id} clase={item} funcionClaseIndividual={props.funcionClaseIndividual} /></div>
            })}
        </div>
    </div>)
}
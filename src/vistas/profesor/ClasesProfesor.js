import * as React from "react";
import './clasesProfesor.css';
import { useState } from "react";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Button, Link } from "@mui/material";
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

    const [clase, setClase] = useState({
        nomClase: "",
        descripcion: "",
    });

    const handleChange = (e) => {
        setClase({
            ...clase,
            [e.target.name]: e.target.value,
        });
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(clase);
    }


    return (<div className='clasesProfesor'>
        <div className="crearClase">
            <h1>Crear una clase</h1>
            <hr></hr>
            {/* AQUI IRA EL FORM */}


            <div data-aos="fade-down" data-aos-once="true">
                <div className="formulario">
                    <h1 className="login_titleProfesor">Ingrese los datos de la clase</h1>
                    <form onSubmit={handleSubmit}>
                        <p>Nombre de la clase</p>
                        <input
                            type="text"
                            name="nomClase"
                            value={clase.nomClase}
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

                        <ColorButton variant="contained" type="submit">
                            Crear Clase
                        </ColorButton>
                    </form>
                </div>
            </div>


        </div>
        <h1> Mis Clases</h1>
        <hr></hr>
        {/* <div className='resumenClases'>
            <div className="misClases">
                {data.map(item => { return <div id={item.id} onMouseOver={cambioTarjeta}><FichaClase key={item.id} clase={item} /></div> })}
            </div>
            <ResmPersonaje resPersonaje={resPersonaje} />
        </div> */}

    </div>)

}
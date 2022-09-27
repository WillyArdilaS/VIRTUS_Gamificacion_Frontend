import React from "react";
import "./registro.css";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Button, Link } from "@mui/material";

/* Estilos del boton "Inscríbete" */
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

export default function Registro(props) {
  const navigate = useNavigate();

  const [usuario, setusuario] = useState({
    nombre: "",
    apellido:"",
    rol: "estudiante",
    correo: "",
    password: "",
    fechaNacimiento: "",
    estado: true,
  });

  const handleChange = (e) => {
    setusuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    comprobar();
  }

  const sendRegister = async(objectRegister)=> {
    const urlBD = 'http://localhost:8080/api/users/';
    const response = await fetch(`${urlBD}`,
      {
        method: 'POST',
        body: JSON.stringify(objectRegister),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const data = await response.json();
    // console.log(data);
    return data;
  }

  const comprobar = async() => {
    console.log(usuario);

    const userRegister = await sendRegister(usuario);
    console.log(userRegister);


    // navigateToStudentView();
  };

  function navigateToStudentView() {
    navigate("/Estudiante");
  }

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="fade-down" data-aos-once="true">
      <div className="formulario">
        <h1 className="registro_title">Inscríbete</h1>
        <form onSubmit={handleSubmit}>
          <p>Nombre</p>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          ></input>
          <p>Apellido</p>
          <input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={handleChange}
            required
          ></input>
          {/* <p>Institucion Educativa</p>
          <input
            type="text"
            name="institucion"
            value={usuario.institucion}
            onChange={handleChange}
            required
          ></input> */}
          <p>Rol</p>
          <input
            className="radio_input"
            type="radio"
            id="estudiante"
            name="rol"
            value="estudiante"
            onChange={handleChange}
            checked />
          <label htmlFor="estudiante">Estudiante</label>
          <input
            className="radio_input"
            type="radio"
            id="maestro"
            name="rol"
            value="maestro"
            onChange={handleChange} />
          <label htmlFor="maestro">Maestro</label>
          <p>Email</p>
          <input
            type="email"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            required
          ></input>
          <p>Contraseña</p>
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            required
          ></input>
          <p>Fecha de nacimiento</p>
          <input
            type="date"
            name="fechaNacimiento"
            value={usuario.fechaNacimiento}
            onChange={handleChange}
            required
          ></input>
          <p className="crear">
            ¿Ya tienes una cuenta?
            <Link
              to="/login"
              underline="hover"
              component={RouterLink}
              sx={{ fontFamily: ["Sarabun", "sans-serif"].join(",") }}
            >
              inicia sesión
            </Link>
          </p>
          <ColorButton variant="contained" type="submit">
            Inscríbete
          </ColorButton>
        </form>
      </div>
    </div>
  );
}

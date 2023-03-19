import React from "react";
import "./login.css";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";

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

export default function Login(props) {

  const navigate = useNavigate();

  const [usuario, setusurio] = useState({
    correo: "",
    password: "",
  });

  const handleChange = (e) => {
    setusurio({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    comprobar();
  }

  //Función para login
  const sendLogin = async (objectLogin) => {
    const urlBD = 'http://localhost:8080/api/auth/login';
    const response = await fetch(`${urlBD}`,
      {
        method: 'POST',
        body: JSON.stringify(objectLogin),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const data = await response.json();
    // console.log(data);
    return data;
  }

  const comprobar = async () => {
    // console.log(usuario);

    //Antes de entrar deberia comprobar el usuario y determinar a donde debe navegar
    const userLogeado = await sendLogin(usuario);
    console.log(userLogeado);
    console.log(usuario)

    if (!userLogeado.token) {
      return window.alert("Datos incorrectos");
    };

    //Las credenciales son correctas
    props.sesion(userLogeado);
    props.setSesionIniciada(true);

    //Aqui va a dirigir a una pagina o otra dependiendo del rol
    //Vista estudiante
    if (userLogeado.usuario.rol === "estudiante") {
      navigateToStudentView();
    };

    //Vista profesor
    if (userLogeado.usuario.rol === "maestro") {
      navigateToTeacherView();
    };


  };

  function navigateToStudentView() {
    navigate("/Estudiante/Micuenta");
    
  }

  function navigateToTeacherView() {
    navigate("/Profesor/Micuenta");
    /*document
      .getElementById('Micuenta')
      .setAttribute('style', 'background-color: rgb(117, 245, 136)')*/
  }

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="fade-down" data-aos-once="true">
      <div className="formulario">
        <h1 className="login_title">Inicia sesión</h1>
        <form onSubmit={handleSubmit}>
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
          <p className="crear">
            ¿No has creado una cuenta?
            <Link
              to="/registro"
              underline="hover"
              component={RouterLink}
              sx={{ fontFamily: ["Sarabun", "sans-serif"].join(",") }}
            >
              regístrate aquí
            </Link>
          </p>
          <ColorButton variant="contained" type="submit">
            Entrar
          </ColorButton>
        </form>
      </div>
    </div>
  );
}

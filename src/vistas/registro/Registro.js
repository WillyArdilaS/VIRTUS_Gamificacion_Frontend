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
    apellido: "",
    rol: "",
    correo: "",
    password: "",
    fechaNacimiento: "",
    estado: true,
  });

  const [personaje, setPersonaje] = useState({
    clase: "",
    imgUrl:"",
    usuarioFK: ""
  })

  const [clases, setClases] = useState([
    { nombre: "Caballero/a", value: "caballero"},
    { nombre: "Arquero/a", value: "arquero" },
    { nombre: "Hechicero/a", value: "hechicero" }
  ]);

  useEffect(() => {
    if (usuario.rol === "estudiante") {
      setClases([
        { nombre: "Caballero/a", value: "caballero" },
        { nombre: "Arquero/a", value: "arquero" },
        { nombre: "Hechicero/a", value: "hechicero" }
      ]);
    } else {
      setClases([]);
    }
  }, [usuario.rol]);
  

  const handleChange = (e) => {
    setusuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const handlePersonaje = (e) => {
    setPersonaje({
      ...personaje,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    comprobar();
  }

  const sendRegister = async (objectRegister) => {
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

    if(data.usuario.rol == "estudiante") {
      await personajeForUser(data.usuario._id); 
    }

    return data;
  }

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

  const personajeForUser = async (fkUsuario) => {
    personaje.imgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8rPmqH32BZqdGkUi5IC5IY1_HYlKl3BYB-HUeldshOuUE1p88JBUss8S10inGALHdv-M&usqp=CAU";
    personaje.usuarioFK = fkUsuario; /*los valores para nivel, experiencia, vida y estado se inician por default en el back */

    const urlBD = 'http://localhost:8080/api/personajes/';
    const response = await fetch(urlBD, {
      method: 'POST',
      body: JSON.stringify(personaje),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    //console.log(data);
    return data
  }

  const comprobar = async () => {

    await sendRegister(usuario);

    //Antes de entrar deberia comprobar el usuario y determinar a donde debe navegar
    const userLogeado = await sendLogin({
      correo: usuario.correo,
      password: usuario.password,
    });
    
    if (!userLogeado.token) {
      return window.alert("Datos incorrectos");
    };

    //Las credenciales son correctas
    props.sesion(userLogeado);
    props.setSesionIniciada(true);
    sessionStorage.setItem("sesionIniciada", true)

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
            required
            />
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
          {clases.length > 0 && (
            <div>
              <p>Clase</p>
              <select
                name="clase"
                value={personaje.clase}
                onChange={handlePersonaje}
              >
                {clases.map((clase) => (
                  <option key={clase.value} value={clase.value}>
                    {clase.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
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
          <ColorButton variant="contained" type="submit" style={{marginBottom: "30%"}}>
            Inscríbete
          </ColorButton>
        </form>
      </div>
    </div>
  );
}

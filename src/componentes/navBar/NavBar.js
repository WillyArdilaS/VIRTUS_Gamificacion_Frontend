import React from "react";
import "./navBar.css";
import { useNavigate, NavLink } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Avatar, Tooltip } from "@mui/material";

const pagesVistaCompleta = [
  { nombre: "Saber Mas", enlace: "/SaberMas" },
  { nombre: "Preguntas", enlace: "/Preguntas" },
];
const pagesVistaReducida = [
  ...pagesVistaCompleta,
  { nombre: "Inicia Sesion", enlace: "/login" },
  { nombre: "Inscribete", enlace: "/registro" },
];

const theme = createTheme({
  palette: {
    login: {
      main: "#007233",
      dark: "#309672",
      contrastText: "#fff",
    },
    signup: {
      main: "#35331a",
      dark: "#5a5732",
      contrastText: "#fff",
    },
  },
});

export default function NavBar() {
  var opciones = [];

  if(sessionStorage.getItem("usuario") != null) {
    if(JSON.parse(sessionStorage.getItem("usuario")).usuario.rol == "maestro") {
      opciones = [
        { nombre: "Mi cuenta", funcion:()=>{loadFunctionNavigateUsuario("Micuenta")} },
        { nombre: "Clases", funcion: ()=>{loadFunctionNavigateUsuario("Clases")}},
        { nombre: "Cerrar Sesion", funcion: logOut }
      ];
    } else {
      opciones = [
        { nombre: "Mi cuenta", funcion:()=>{loadFunctionNavigateUsuario("Micuenta")} },
        { nombre: "Clases", funcion: ()=>{loadFunctionNavigateUsuario("Clases")}},
        { nombre: "Misiones Pendientes", funcion: ()=>{loadFunctionNavigateUsuario("MisionesPendientes")}},
        { nombre: "Cerrar Sesion", funcion: logOut }
      ];
    }
  }

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function navigateToLogin() {
    navigate("/login");
  }

  function navigateToSignup() {
    navigate("/registro");
  }

  function loadFunctionNavigateUsuario(opcion){
    const op = document.querySelectorAll(".opciones");
    op.forEach((item) => {
      item.classList.remove("activa");
    });
    document.getElementById(opcion).classList.add("activa")
    navigate(JSON.parse(sessionStorage.getItem("usuario")).usuario.rol + "/" + opcion);
  }

  function logOut(){
    sessionStorage.removeItem("sesionIniciada");
    sessionStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <div>
      <AppBar position="relative" sx={{ backgroundColor: "#7db952" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {(JSON.parse(sessionStorage.getItem("sesionIniciada")) == false || JSON.parse(sessionStorage.getItem("sesionIniciada")) == null) && (
              <>
                <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />{/* Icono Barra de navegacion */}
                <NavLink className="link" to="/">
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: ["Maven Pro", "cursive"].join(","),
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    APP GAMIFICACION
                  </Typography>
                </NavLink>{/* Nombre y Link del Titulo Principal*/}
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>{/* Icono Menu Hamburguesa en Vista Reducida*/}
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                    display: { xs: "block", md: "none" },
                    }}
                >
                    {pagesVistaReducida.map((page) => {
                    return (
                        <MenuItem
                        key={page.nombre}
                        onClick={handleCloseNavMenu}
                        className="navigationOptions"
                        >
                        <NavLink className="link" to={page.enlace}>
                            <Typography
                            textAlign="center"
                            sx={{
                                fontFamily: ["Maven Pro", "cursive"].join(","),
                            }}
                            >
                            {" "}
                            {page.nombre}{" "}
                            </Typography>
                        </NavLink>
                        </MenuItem>
                    );
                    })}
                </Menu>{/* Barra de navegacion en Vista Reducida*/}
                </Box>
                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                <NavLink className="link" to="/">
                  <Typography
                      variant="h5"
                      noWrap
                      href=""
                      sx={{
                      mr: 2,
                      display: { xs: "flex", md: "none" },
                      flexGrow: 1,
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                      }}
                  >
                      LOGO
                  </Typography>
                </NavLink>{" "}{/* Display en Vista pequeña del titulo y logo */}
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pagesVistaCompleta.map((page) => {
                    return (
                      <div className="nav">
                        <NavLink key={page.nombre} 
                        to={page.enlace}
                        className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                          {page.nombre}
                        </NavLink>
                      </div>
                    );
                  })}
                </Box>{/* Barra de Navegacion en vista completa */}
                <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                    <ThemeProvider theme={theme}>
                    <Button
                        sx={{
                        fontFamily: ["Maven Pro", "cursive"].join(","),
                        marginRight: "1em",
                        }}
                        variant="contained"
                        color="login"
                        onClick={navigateToLogin}
                    >
                        Inicia sesión
                    </Button>
                    <Button
                        sx={{ fontFamily: ["Maven Pro", "cursive"].join(",") }}
                        variant="contained"
                        color="signup"
                        onClick={navigateToSignup}
                    >
                        Inscríbete
                    </Button>
                    </ThemeProvider>
                </Box>{/* Botones de Inicio de sesion y de Registro */}</>
            )}{/* VISTA DE LA BARRA DE NAVEGACION SIN SESION INICIADA */}
            {(JSON.parse(sessionStorage.getItem("sesionIniciada")) == true) && ( 
              <>
              <Box sx={{ display: 'flex'}}>
                <Typography
                    variant="h7"
                    sx={{
                      fontFamily: ["Maven Pro", "cursive"].join(","),
                      letterSpacing: ".2rem"
                    }}
                > {JSON.parse(sessionStorage.getItem("usuario")).usuario.nombre} | {JSON.parse(sessionStorage.getItem("usuario")).usuario.rol}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' , justifyContent: 'flex-end', flexGrow: 1}}>
                <Tooltip title="Abrir Opciones">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://marketplace.canva.com/EAEkB8aSmJU/1/0/1600w/canva-rosa-y-amarillo-gato-moderno-dibujado-a-mano-abstracto-imagen-de-perfil-de-twitch-R-0ekToDIBE.jpg"
                      sx={{
                        height: '43px',
                        width: '43px'
                      }}
                    />
                  </IconButton>
                </Tooltip>{/* Avatar de Usuario */}
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {opciones.map((opcion) => {
                    return (
                      <MenuItem key={opcion.nombre} onClick={handleCloseUserMenu}>
                        <Button onClick={opcion.funcion} sx={{ fontFamily: ["Maven Pro", "cursive"].join(","), color: "inherit", 
                        fontSize : '12px', justifyContent: "flex-start" }} fullWidth={true}> 
                          {opcion.nombre}
                        </Button>
                      </MenuItem>
                    );
                  })}
                </Menu>{/* Opciones de Usuario */}
              </Box></>
            )}{/* VISTA DE LA BARRA DE NAVEGACION CON SESION INICIADA */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

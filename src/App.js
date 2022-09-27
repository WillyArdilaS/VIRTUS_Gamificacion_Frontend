import "./App.css";
import * as React from "react";
import NavBar from "./componentes/navBar/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preguntas from "./vistas/preguntas/Preguntas";
import Home from "./vistas/home/Home";
import SaberMas from "./vistas/saberMas/SaberMas";
import Login from "./vistas/login/Login";
import Footer1 from "./componentes/footer1/Footer1";
import Estudiante from "./vistas/estudiante/Estudiante";
import PerfilEst from "./vistas/estudiante/PerfilEst";
import ClasesEst from "./vistas/estudiante/ClasesEst";
import Registro from "./vistas/registro/Registro";

//const pages = ['Saber Mas', 'Preguntas'];

function App() {

  const [usuario, setUsuario] = React.useState(null);

  const [sesionIniciada, setSesionIniciada] = React.useState(false);

  const sesion= (persona)=> {
    setUsuario(persona)
    //pages.push(persona[0].tipo)
  }

  return (
    <BrowserRouter>
      <NavBar sesionIniciada = {sesionIniciada} usuario = {usuario} setSesionIniciada = {setSesionIniciada} /* pages={pages} *//>
      <div className = "mainContenido">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/Preguntas" element={<Preguntas />} />
          <Route path="/SaberMas" element={<SaberMas />} />
          <Route path="/login"  element={<Login sesion={sesion} setSesionIniciada = {setSesionIniciada}/>} />
          <Route path="/registro" element={<Registro setSesionIniciada = {setSesionIniciada}/>} />
          <Route  path='/Estudiante/*' element={<Estudiante  data={usuario} />}>
            <Route path="Micuenta" element={<PerfilEst />} />
            <Route path="Clases" element={<ClasesEst />} />
          </Route>
          <Route path="*" element={<h1> pagina no encontrada</h1>} />
        </Routes>
      </div>
      <footer>
        <Footer1 />
      </footer>
    </BrowserRouter>
  );
}

export default App;

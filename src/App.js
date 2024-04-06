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
import ActividadIndividual from "./vistas/profesor/ActividadInndividual";
import MisionesPendientes from "./vistas/estudiante/MisionesPendientes";
import Registro from "./vistas/registro/Registro";
import Profesor from "./vistas/profesor/Profesor";
import ClasesProfesor from "./vistas/profesor/ClasesProfesor";
import ClaseIndividualProfesor from "./vistas/profesor/ClaseIndividualProfesor";
import ClaseIndividualEstudiante from './vistas/estudiante/ClaseIndividualEstudiante';
import PerfilProf from "./vistas/profesor/PerfilProf"
import MapaActividades from './componentes/mapaActividades/MapaActividades'

//const pages = ['Saber Mas', 'Preguntas'];

function App() {
  const [claseIndividual, setClaseIndividual] = React.useState(null);
  const [claseIndividualEstudiante, setClaseIndividualEstudiante] = React.useState(null);

  const sesion = (persona) => {
    sessionStorage.setItem("usuario", JSON.stringify(persona))
  }
  
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="mainContenido">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/Preguntas" element={<Preguntas />} />
          <Route path="/SaberMas" element={<SaberMas />} />
          <Route path="/login" element={<Login sesion={sesion}/>} />
          <Route path="/registro" element={<Registro sesion={sesion}/>} />
          <Route path='/Estudiante/*' element={<Estudiante />}>
            <Route path="Micuenta" element={<PerfilEst />} />
            <Route path="Clases" element={<ClasesEst funcionClaseIndividual={setClaseIndividualEstudiante}/>} />
            <Route path="ClaseIndividualEstudiante" element={<ClaseIndividualEstudiante />}/>
            <Route path="ClaseIndividualEstudiante/:tipo" element={<ClaseIndividualEstudiante />}/>
            <Route path="MisionesPendientes" element={<MisionesPendientes />} />
          </Route>
          <Route path="/MapaActividades" element={<MapaActividades />} />
          <Route path='/Maestro/*' element={<Profesor />}>
            <Route path="Micuenta" element={<PerfilProf />} />
            <Route path="Clases" element={<ClasesProfesor funcionClaseIndividual={setClaseIndividual} />} />
            <Route path="ClaseIndidivual" element={<ClaseIndividualProfesor clase={claseIndividual} />} />
            <Route path="Actividad" element={<ActividadIndividual />} />
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

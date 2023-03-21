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
import Profesor from "./vistas/profesor/Profesor";
import ClasesProfesor from "./vistas/profesor/ClasesProfesor";
import ClaseIndividualProfesor from "./vistas/profesor/ClaseIndividualProfesor";
import ClaseIndividualEstudiante from './vistas/estudiante/ClaseIndividualEstudiante';
import PerfilProf from "./vistas/profesor/PerfilProf"
import MapaActividades from './componentes/mapaActividades/MapaActividades'

//const pages = ['Saber Mas', 'Preguntas'];

function App() {

  const [usuario, setUsuario] = React.useState(null);
  const [claseIndividual, setClaseIndividual] = React.useState(null);
  const [claseIndividualEstudiante, setClaseIndividualEstudiante] = React.useState(null);

  const [sesionIniciada, setSesionIniciada] = React.useState(false);

  React.useEffect(() => {
    if(sessionStorage.getItem("sesionIniciada") == null) {
      sessionStorage.setItem("sesionIniciada", false);
    }
  }, [])

  const sesion = (persona) => {
    setUsuario(persona)
    sessionStorage.setItem("usuario", JSON.stringify(persona))
  }
  
  return (
    <BrowserRouter>
      <NavBar sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada} /* pages={pages} */ />
      <div className="mainContenido">
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/Preguntas" element={<Preguntas />} />
          <Route path="/SaberMas" element={<SaberMas />} />
          <Route path="/login" element={<Login sesion={sesion} setSesionIniciada={setSesionIniciada} />} />
          <Route path="/registro" element={<Registro sesion={sesion} setSesionIniciada={setSesionIniciada} />} />
          <Route path='/Estudiante/*' element={<Estudiante />}>
            <Route path="Micuenta" element={<PerfilEst />} />
            <Route path="Clases" element={<ClasesEst funcionClaseIndividual={setClaseIndividualEstudiante}/>} />
            <Route path="ClaseIndividualEstudiante" element={<ClaseIndividualEstudiante clase={claseIndividualEstudiante}/>}/>
          </Route>
          <Route path="/MapaActividades" element={<MapaActividades />} />
          <Route path='/Maestro/*' element={<Profesor />}>
            <Route path="Micuenta" element={<PerfilProf />} />
            <Route path="Clases" element={<ClasesProfesor funcionClaseIndividual={setClaseIndividual} />} />
            <Route path="ClaseIndidivual" element={<ClaseIndividualProfesor clase={claseIndividual} />} />
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

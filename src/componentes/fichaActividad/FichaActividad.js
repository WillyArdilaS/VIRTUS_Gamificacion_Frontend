import './fichaActividad.css';
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { Button } from "@mui/material";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    width: "184px",
    height: "44px",
    borderRadius: "10px",
    backgroundColor: "#008080",
    margin: "auto",
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Sarabun, sans-serif",
    "&:hover": {
        backgroundColor: "#218c8c",
    },
}));

export default function FichaActividad(props) {
    const navigate = useNavigate();

    function navigateToActivityView() {

        //por el momento el la localstorage , toca pasarlo a la sessionstorage
        localStorage.setItem('actividad', JSON.stringify(props.actividad))
        navigate(`/Maestro/Actividad`);
      }

    return (
        <div className="cardClase">
            <img className="imgCardClase" src="https://cdn.pixabay.com/photo/2016/12/25/22/32/gladiator-1931077_960_720.jpg"></img>
            <div className="informacionClase">
                <div className="indicadoresClase">
                    <p>{props.actividad.nombre}</p>
                </div>

                <div className="indicadoresClase">
                    <img src="https://cdn-icons-png.flaticon.com/512/1162/1162281.png" className="imgIcon"></img>
                    <p>Descripción:</p>
                </div>

                <div className="indicadoresClase">
                    <p>{props.actividad.descripcion}</p>
                </div>

                <div className="indicadoresClase">
                    <img src="https://cdn-icons-png.flaticon.com/512/5219/5219258.png" className="imgIcon"></img>
                    <p>Recompensa: </p>
                    <p>{props.actividad.recompensa}</p>
                </div>

                <div className="indicadoresClase">
                    <img src="https://img.favpng.com/2/15/13/the-icons-computer-icons-skull-png-favpng-MADHvngC4cqTQ4KtHKvPeURcp.jpg" className="imgIcon"></img>
                    <p>Castigo: </p>
                    <p>{props.actividad.castigo}</p>
                </div>
            </div>
            
            <ColorButton variant="contained" onClick={navigateToActivityView}>
                Ver Actividad
            </ColorButton>
        </div>
    )
}

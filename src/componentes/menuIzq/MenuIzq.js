import { Link } from "react-router-dom";
import "./menuIzq.css";

export default function MenuIzq({ opciones }) {
  function eleccion(e) {
    const op = document.querySelectorAll(".opciones");

    op.forEach((item) => {
      item.classList.remove("activa");
    });

    e.currentTarget.classList.toggle("activa");
  }

  return (
    <div>
      <div className="contenedor_menu">
        <div className="menu_izt">
          <div className="resm_perfil">
            <div className="img_perf">
              <img
                src="https://marketplace.canva.com/EAEkB8aSmJU/1/0/1600w/canva-rosa-y-amarillo-gato-moderno-dibujado-a-mano-abstracto-imagen-de-perfil-de-twitch-R-0ekToDIBE.jpg"
                alt="imagen de perfil"
              />
            </div>
            <p>{JSON.parse(sessionStorage.getItem("usuario")).usuario.nombre}</p>
            <p>{JSON.parse(sessionStorage.getItem("usuario")).usuario.rol}</p>
          </div>
          {opciones.map((op) => {
            const dir = op.replace(/ /g, "");
            return (
              <div key={op} id={dir} className="opciones" onClick={eleccion}>
                {<Link className="link" to={dir}>
                  {op}
                </Link>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';

async function obtenerJuego(juegoId) {
  const url = `http://localhost:8080/api/juego/${juegoId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.juego;
}

function JuegoPreguntas({ activity, url }) {
  const [juego, setJuego] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({});
  const [respuestasMultiplesSeleccionadas, setRespuestasMultiplesSeleccionadas] = useState({});


    const params = new URL(url).searchParams;
  let id = params.get('id');
  console.log("actividad ")
  console.log(Number(id) + 1);
  console.log(activity[id].juegoFK);

  useEffect(() => {
    obtenerJuego(activity[id].juegoFK)
        .then(juego => {
          setJuego(juego);
        })
        .catch(error => console.error(error));
  }, [activity, url]);


    const manejarRespuesta = () => {
        let puntuacion = 0;
        juego.preguntas.forEach((pregunta, index) => {
            if (pregunta.opciones.length === 0) {
                if (pregunta.respuesta && respuestasSeleccionadas[index] === pregunta.respuesta) {
                    puntuacion += 1;
                }
            } else if (typeof pregunta.respuesta === 'string') {
                if (respuestasSeleccionadas[index] === pregunta.respuesta) {
                    puntuacion += 1;
                }
            } else if (Array.isArray(pregunta.respuesta)) {
                const respuestasCorrectas = pregunta.respuesta.map(i => pregunta.opciones[i]);
                if (JSON.stringify(respuestasMultiplesSeleccionadas[index].sort()) === JSON.stringify(respuestasCorrectas.sort())) {
                    puntuacion += 1;
                }
            }
        });
        setPuntuacion(puntuacion);
        alert(`Juego terminado! Tuviste ${puntuacion} correctas de ${juego.preguntas.length} preguntas.`);
    };

    return (
        <div>
            {juego && (
                <>
                    <h2>{juego.titulo}</h2>
                    {juego.preguntas.map((pregunta, preguntaIndex) => (
                        <div key={preguntaIndex}>
                            <h3>{pregunta.pregunta}</h3>
                            {pregunta.opciones.length === 0 ? (
                                <input
                                    type="text"
                                    id={`respuesta-${preguntaIndex}`}
                                    onChange={(e) => setRespuestasSeleccionadas({
                                        ...respuestasSeleccionadas,
                                        [preguntaIndex]: e.target.value
                                    })}
                                />
                            ) : typeof pregunta.respuesta === 'string' ? (
                                pregunta.opciones.map((opcion, opcionIndex) => (
                                    <div key={opcionIndex}>
                                        <input
                                            type="radio"
                                            id={`opcion-${preguntaIndex}-${opcionIndex}`}
                                            name={`respuesta-${preguntaIndex}`}
                                            value={opcion}
                                            onChange={(e) => setRespuestasSeleccionadas({
                                                ...respuestasSeleccionadas,
                                                [preguntaIndex]: e.target.value
                                            })}
                                        />
                                        <label htmlFor={`opcion-${preguntaIndex}-${opcionIndex}`}>{opcion}</label>
                                    </div>
                                ))
                            ) : (
                                pregunta.opciones.map((opcion, opcionIndex) => (
                                    <div key={opcionIndex}>
                                        <input
                                            type="checkbox"
                                            id={`opcion-${preguntaIndex}-${opcionIndex}`}
                                            name={`respuesta-${preguntaIndex}`}
                                            value={opcion}
                                            onChange={(e) => {
                                                const checked = e.target.checked;
                                                setRespuestasMultiplesSeleccionadas(prevState => {
                                                    const prevAnswers = prevState[preguntaIndex] || [];
                                                    if (checked) {
                                                        return { ...prevState, [preguntaIndex]: [...prevAnswers, opcion] };
                                                    } else {
                                                        return { ...prevState, [preguntaIndex]: prevAnswers.filter(answer => answer !== opcion) };
                                                    }
                                                });
                                            }}
                                        />
                                        <label htmlFor={`opcion-${preguntaIndex}-${opcionIndex}`}>{opcion}</label>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                    <button onClick={manejarRespuesta}>Enviar respuestas</button>
                </>
            )}
        </div>
    );
}

export default JuegoPreguntas;
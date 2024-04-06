import "./sopaLetras.css"
import React from 'react'
import { useState, useEffect, useRef } from 'react'

async function fetchData(id) {
    const response = await fetch(`http://localhost:8080/api/juego/sopa-letras/${id}`);
    const data = await response.json();
    return data;
};

function SopaLetras({ id }) {
    let x1, x2, y1, y2, r1, r2, c1, c2;
    const [sopaLetras, setSopaLetras] = useState([]),
        [palabras, setPalabras] = useState([]),
        [dim, setDim] = useState([]),
        stylePuzzle = {
            gridTemplateColumns: `repeat(${dim[0]}, 40px)`,
            gridTemplateRows: `repeat(${dim[1]}, 40px)`,
            position: 'relative'
        },
        [find, setFind] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        fetchData(id).then(data => {
            setSopaLetras(data.tab);
            setPalabras(data.words);
            setDim(data.dim);
            setFind(Object.keys(data.words).length);
            console.log(data.words);
        });
    }, [id]);

    let panelMouseDown = (e) => {
        let panel = e.target;
        let cont = panel.parentElement;
        while (!cont.matches("#cont"))
            cont = cont.parentElement;
        let tab = cont.querySelector('.puzzle');
        let x = e.clientX;
        let y = e.clientY;
        let letters = tab.querySelectorAll('.letter');
        letters.forEach(letter => {
            let letterRect = letter.getBoundingClientRect();
            if (x >= letterRect.left && x <= letterRect.right &&
                y >= letterRect.top && y <= letterRect.bottom) {
                let p = letter.getBoundingClientRect();
                x1 = (p.left + p.right) / 2;
                y1 = (p.bottom + p.top) / 2;
                r1 = letter.getAttribute('data-x');
                c1 = letter.getAttribute('data-y');
            }
        });
    },
        drawLine = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let p = canvas.getBoundingClientRect();
            const scaleX = canvas.width / p.width;
            const scaleY = canvas.height / p.height;
            let color = (Math.floor(Math.random() * 2 ** 24)).toString(16)
            while (color.length < 6) color = "0" + color;
            x1 = (x1 - p.left) * scaleX;
            y1 = (y1 - p.top) * scaleY;
            x2 = (x2 - p.left) * scaleX;
            y2 = (y2 - p.top) * scaleY;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "#" + color + "80";
            ctx.lineWidth = 15;
            ctx.lineCap = "round";
            ctx.stroke();
            console.log(ctx);
        },
        panelMouseUp = (e) => {
            let panel = e.target;
            let cont = panel.parentElement;
            while (!cont.matches("#cont"))
                cont = cont.parentElement;
            let tab = cont.querySelector('.puzzle');
            let x = e.clientX;
            let y = e.clientY;
            let letters = tab.querySelectorAll('.letter');
            letters.forEach(letter => {
                let letterRect = letter.getBoundingClientRect();
                if (x >= letterRect.left && x <= letterRect.right &&
                    y >= letterRect.top && y <= letterRect.bottom) {
                    let p = letter.getBoundingClientRect();
                    x2 = (p.left + p.right) / 2;
                    y2 = (p.bottom + p.top) / 2;
                    r2 = letter.getAttribute('data-x');
                    c2 = letter.getAttribute('data-y');
                    let words = { ...palabras };
                    for (let word in words) {
                        let w = words[word];
                        if (!w.selected) {
                            // eslint-disable-next-line eqeqeq
                            if ((r1 == w.p1[0] && c1 == w.p1[1] && r2 == w.p2[0] && c2 == w.p2[1]) || (r1 == w.p2[0] && c1 == w.p2[1] && r2 == w.p1[0] && c2 == w.p1[1])) {
                                w.selected = true;
                                setPalabras(words);
                                drawLine();
                                setFind(find - 1);
                                break;
                            }
                        }
                    }
                }
            });
        };


    return (
        <div className="wrapper">
            <h2>Actividad Sopa de Letras</h2>
            <div className="game">
                <div id="cont" style={{ position: 'relative' }}>
                    <div className="puzzle" style={stylePuzzle}>
                        {sopaLetras && sopaLetras.map((row, i) => (
                            row.map((letter, j) => (
                                <div key={i + "" + j} className="letter" data-x={i} data-y={j}>{letter.toUpperCase()}</div>
                            ))
                        ))}
                    </div>
                    <div className="panel" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        <canvas
                            ref={canvasRef}
                            onMouseDown={panelMouseDown}
                            onMouseUp={panelMouseUp}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
                <div className="words">
                    <span>Palabras:</span>
                    <ul>
                        {palabras && Object.keys(palabras).map((palabra, index) => (
                            palabras[palabra].selected
                                ? <li key={index} style={{ textDecoration: 'line-through' }}>{palabra}</li>
                                : <li key={index}>{palabra}</li>
                        ))}
                    </ul>
                </div>
            </div>
            {find === 0 && <h3 style={{textAlign: "center"}}>¡Felicidades! Has encontrado todas las palabras</h3>}
        </div>
    )
}

export default SopaLetras

import React, { useState, useEffect } from 'react';

async function fetchData(id) {
    const response = await fetch(`http://localhost:8080/api/juego/sopa-letras/${id}`);
    const data = await response.json();
    return data;
}

const Crucigrama = ({ activity, url }) => {
    const [crucigrama, setCrucigrama] = useState([]);
    const [input, setInput] = useState([]);
    const [solve, setSolve] = useState(false);

    useEffect(() => {
        const params = new URL(url).searchParams;
        let id = params.get('id');

        fetchData(activity[id].juegoFK).then(data => {
            setCrucigrama(data.tab);
            setInput([...Array(data.dim[0])].map(() => Array(data.dim[1]).fill('')));
            console.log(data.tab);
        });
    }, [activity, url]);

    const handleInputChange = (e, i, j) => {
        const newValue = e.target.value.toUpperCase();
        setInput(prevInput => {
            const newInput = [...prevInput];
            newInput[i][j] = newValue;
            return newInput;
        });
    };

    const handleKeyUp = (e, i, j) => {
        const allLettersMatch = crucigrama.every((row, rowIndex) =>
            row.every((cell, cellIndex) =>
                (input[rowIndex][cellIndex] === "" && cell.charCodeAt(0) <= 90) || cell.toLowerCase() === input[rowIndex][cellIndex].toLowerCase()
            )
        );
        allLettersMatch && setSolve(true);
    }

    return (
        <div className="crucigrama">
            <h2>Crucigrama</h2>
            <div className="grid" style={{boxShadow: '0 0 24px 12px #7db952dd', padding:'30px', border:"solid black 1px"}}>
                {crucigrama.length > 0 && crucigrama[0].length > 0 && input.length > 0 && input[0].length > 0 && crucigrama.map((row, i) => (
                    <div key={i} className="row">
                        {row.map((cell, j) => (
                            <input
                                key={j}
                                type="text"
                                maxLength="1"
                                value={input[i][j]}
                                onChange={e => handleInputChange(e, i, j)}
                                onKeyUp={e => handleKeyUp(e, i, j)}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    textAlign: 'center',
                                    border: cell.charCodeAt(0) > 90 ? '1px solid #aaa' : '1px solid #eee',
                                    pointerEvents: cell.charCodeAt(0) > 90 ? 'auto' : 'none',
                                    backgroundColor: cell.charCodeAt(0) > 90 ? '#fff' : '#eee'
                                }}
                                readOnly={cell.charCodeAt(0) <= 90}
                            />
                        ))}
                    </div>
                ))}
            </div>
            {solve && <h3>¡Felicidades! Has resuelto el crucigrama.</h3>}
        </div>
    );
};

export default Crucigrama;

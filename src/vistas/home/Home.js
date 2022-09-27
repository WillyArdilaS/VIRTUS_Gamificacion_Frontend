import { useEffect } from 'react';
import './home.css';

import Aos from 'aos';

export default function Home(){

    useEffect(() => {
        Aos.init({duration : 1500});
    }, []);
    

    return(
        <div className="contenedor" data-aos = "fade-right" data-aos-once="true">
            <div className="text" >
                <h1>Una nueva manera de conectar con alumnos</h1>
                <button className='bt_home'>Unete</button>
            </div>
            <div  className="imagen">
            <img alt='Img de presentacion' src='https://img.freepik.com/free-photo/group-kids-studying-school_1303-26838.jpg?w=740&t=st=1657052818~exp=1657053418~hmac=7295393361990f325bd686921840fd9dd0429d7ab26e6450a3e6ebd86c239991'/>
            </div>
        </div>
    )
}
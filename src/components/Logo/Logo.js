import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logoPic from './Logo.png';

const Logo = () => {
    return (
        <div className="ma4" style={{display: 'flex', justifyContent: 'center', height: '60vh', alignItems: 'center'}}>
        <Tilt className="Tilt br2 shadow-2" options={{ max : 65 }} style={{ maxHeight: '75%', maxWidth: '75%' }} >
            <div className="Tilt-inner"><img style={{width: '50%', height: '50%', verticalAlign: "middle"}} src={logoPic} alt=""/></div>
        </Tilt>
        </div>
    )
}

export default Logo;
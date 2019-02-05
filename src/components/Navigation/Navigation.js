import React from 'react';
import 'tachyons';

const Navigation = ({onClick, navContent}) => {
    const route = (navContent === "Sign Up") ? "Register" : "SignIn";

    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end', height: '1vh', width: '100%'}}>
            <p className="f4 link dim black underline pa3 pointer" onClick={() => onClick(route)} >{navContent}</p>
        </nav>
    )
}

export default Navigation;
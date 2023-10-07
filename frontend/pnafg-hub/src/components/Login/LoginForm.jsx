import React from 'react'
import { useState } from "react";
import 'D:/Github/projeto-discord-fifa-filmes/frontend/pnafg-hub/src/css/LoginFormStyles.css'
import logo from 'D:/Github/projeto-discord-fifa-filmes/frontend/pnafg-hub/assets/gifPNAFG.gif'

const LoginForm = (props) => {

    const [usernameInserted, setUsernameInserted] = useState("");
    const [passwordInserted, setPasswordInserted] = useState("");

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            props.func(usernameInserted, passwordInserted)
        }
    }

    return (
            <div className='loginBox'>
                <img className='logo' src={logo}></img>
                <p>Sign In</p>

                <div className="txt_field">
                    <input className='inputBox' placeholder='Username...' type='text' onChange={(e) => {
                        setUsernameInserted(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                   ></input>
                </div>

                <div className="txt_field">
                    <input className='inputBox' placeholder='Password...' type='password' onChange={(e) => {
                        setPasswordInserted(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                    ></input>
                </div>
                <div className="buttonBox">
                    <button id='loginButton' onClick={(e) =>  {
                        props.func(usernameInserted, passwordInserted)
                    }}>Login</button>
                </div>
                
        </div>
    )
}

export default LoginForm
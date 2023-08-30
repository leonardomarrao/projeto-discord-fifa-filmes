import React from 'react'
import { useState } from "react";
const LoginForm = (props) => {

    const [usernameInserted, setUsernameInserted] = useState("");
    const [passwordInserted, setPasswordInserted] = useState("");

    return (
            <div>
            <p>Login</p>
            <input placeholder='Username...' type='text' onChange={(e) => {
                setUsernameInserted(e.target.value)
            }}
            ></input>
            <input placeholder='Password...' type='text' onChange={(e) => {
                setPasswordInserted(e.target.value)
            }}
            ></input>
            <button onClick={(e) =>  {
                props.func(usernameInserted, passwordInserted)
            }}>Sign In</button>
        </div>
    )
}

export default LoginForm
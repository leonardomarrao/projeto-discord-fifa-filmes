import React from 'react'
import LoginForm from '../components/LoginForm'
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    if(user.user != null && user.refresh_token != null && user.access_token != null) {
        navigate('/');
    }
  },[])
  
  const loginFunc = (username, password) => {
    Axios.post("http://localhost:3000/api/auth/login", {
      username: username,
      password: password
    })
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate("/")
    })
    .catch((err) => {
      //modal dizendo o erro
      console.log(err);
    });
}

  return (
    <div>
        <LoginForm func={loginFunc}></LoginForm>
    </div>
  )
}

export default Login
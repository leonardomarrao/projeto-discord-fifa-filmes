import React from 'react'
import LoginForm from '../components/Login/LoginForm.jsx'
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../css/LoginStyles.css'
import video from 'D:/Github/projeto-discord-fifa-filmes/frontend/pnafg-hub/assets/videoLogin.mp4'


const Login = () => {
  let navigate = useNavigate();

  const user = JSON.stringify(localStorage.getItem("user"));
  const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  
  useEffect(() => {
    if(user != null) {
      if(user != null && access_token != null && refresh_token != null) {
        navigate('/');
      }
    }
  },[])
  
  const loginFunc = (username, password) => {
    Axios.post("http://localhost:3000/api/auth/login", {
      username: username,
      password: password
    })
    .then((res) => {
      console.log(res.data.refresh_token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('refresh_token', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
      
      navigate("/movies")
    })
    .catch((err) => {
      //modal dizendo o erro
      console.log(err);
    });
}

  return (
    <div className="page">
      <div className='loginPage'>
          <div className="leftside">
            <video src={video} autoPlay loop muted />
          </div>
          <div className="rightside">
            
            <LoginForm func={loginFunc}></LoginForm>
          </div>
      </div>
    </div>
    
  )
}

export default Login
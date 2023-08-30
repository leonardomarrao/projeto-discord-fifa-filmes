import React from 'react'
import LoginForm from '../components/LoginForm'
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const loginFunc = (username, password) => {
    Axios.post("http://localhost:3000/api/auth/login", {
      username: username,
      password: password
    })
    .then((res) => {
      //console.log(res.data)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('refresh_token', JSON.stringify(res.data.refresh_token))
      localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
      console.log(JSON.parse(localStorage.getItem("user")))
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
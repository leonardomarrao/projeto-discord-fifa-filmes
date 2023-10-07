import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {

  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const refresh_token = localStorage.getItem("refresh_token");
  const access_token = localStorage.getItem("access_token");
  const [movies, setMovies] = useState([]);

  useEffect(() => { 
      if(user == null || access_token == null || refresh_token == null) {
          navigate('/login');
      }
      else {
        
      }
      
  },[])

  return (
    <div>
        <p>Home</p>
    </div>
  )
}

export default Home
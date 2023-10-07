import React, { useState } from 'react'
import MovieCard from '../components/Movies/MovieCard.jsx'
import MovieInsert from '../components/Movies/MovieInsert.jsx';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

const Movie = () => {
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
        getMovies();
      }
      
  },[])

  const getMovies = () => {
    Axios({
      method: 'get',
      url: 'http://localhost:3000/api/filme/',
      headers: {
          Authorization: 'Bearer ' + access_token.replaceAll('"', ''),
          refreshtoken: refresh_token.replaceAll('"', '')
      }
  }).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
      setMovies(res.data.filmes)
  })
  .catch((err) => {
      localStorage.setItem('user', null)
      localStorage.setItem('access_token', null)
      navigate('/login');
      console.log(err);
    })
  }

  const movieIns = (movie) => {
    console.log(movie)
    Axios({
      method: 'post',
      url: 'http://localhost:3000/api/filme/',
      headers: {
        Authorization: 'Bearer ' + access_token.replaceAll('"', ''),
        refreshtoken: refresh_token.replaceAll('"', '')
    },
      data: {
        nome: movie.title,
        data_lancamento: movie.releaseDate,
        data_vista: movie.dataSeen,
        nota: movie.grade,
        sinopse: movie.description,
        genero: movie.genre,
        poster: movie.image
      }
    })
    .then((res) => {
      console.log(res)
      //localStorage.setItem('user', JSON.stringify(res.data.user))
      //localStorage.setItem('refresh_token', JSON.stringify(res.data.refresh_token))
      //localStorage.setItem('access_token', JSON.stringify(res.data.access_token))
      
      movies.push(movie);
    })
    .catch((err) => {
      //modal dizendo o erro
      console.log(err);
    });
  }
  
  return (
    <div>Movie
      <MovieCard movies={movies}/>
      <MovieInsert func={movieIns}></MovieInsert>
    </div>
  )
}

export default Movie
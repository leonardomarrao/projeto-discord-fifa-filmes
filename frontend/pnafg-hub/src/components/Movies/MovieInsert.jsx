import React from 'react'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers'
import 'D:/Github/projeto-discord-fifa-filmes/frontend/pnafg-hub/src/css/MovieInsertStyles.css'
const MovieInsert = (props) => {

    const [image, setImage] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [dateSeen, setDateSeen] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [grade, setGrade] = useState('')
    const [genre, setGenre] = useState('')
    const genres = ['Genre','Action', 'Adventure', 'Comedy', 'Documentary', 'Drama','Fantasy', ' Horror', 'Musical', 'Romance', 'Thriller', 'Science Fiction', 'Western']

    function handleImage(e) {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
          }
    }
    
    function handleDateSeen(e) {
        let mes = e.$M + 1
        setDateSeen(mes.toString() + '-' + e.$D + '-' + e.$y)
    }

    function handleDateReleased(e) {
        let mes = e.$M + 1
        setReleaseDate(mes.toString() + '-' + e.$D + '-' + e.$y)
    }

    function AddMovie() {
        let movie = {
            title: title,
            description: description,
            genre: genre,
            grade: grade,
            data_vista: dateSeen,
            data_lancamento: releaseDate,
            poster: image
        }
        props.func(movie)
    }

    return (
        <div className="movieInsertContainer">
            <h1>Criar Filme</h1>
            
            <input type="text" placeholder='title' onChange={e => setTitle(e.target.value)}/>
            <input type="number" placeholder='grade' onChange={e => setGrade(e.target.value)}/>
            <input type="text" placeholder='description' onChange={e => setDescription(e.target.value)}/>

            <select value={genre} onChange={e=>setGenre(e.target.value)}>
                {genres.map(x =>(<option>{x}</option>))}
            </select>

            <DatePicker onChange={handleDateReleased}></DatePicker>
            <DatePicker onChange={handleDateSeen}></DatePicker>

            <input type="file" name='file' onChange={handleImage}/>
            <img src={image}></img>

            <button onClick={AddMovie}>Add Movie</button>
        </div>
    )
}


export default MovieInsert
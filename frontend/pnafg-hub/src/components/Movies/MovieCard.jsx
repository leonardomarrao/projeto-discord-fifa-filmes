import React from 'react'
import 'D:/Github/projeto-discord-fifa-filmes/frontend/pnafg-hub/src/css/MovieCardStyles.css'
const MovieCard = (props) => {
    const movies = props.movies

    return (
        <div>
            {movies.map(mov => {
                return (
                    <div className="movieCardContainer">
                        <div className="img">
                            
                        </div>
                        <div className="movieInfo">
                                <p>{mov.nome}</p>
                            
                            <div className="rating-type">
                                <p>{mov.genero}</p>
                                <p>{mov.nota}</p>
                            </div>

                            <div className="description">
                                <p>{mov.sinopse}</p>
                            </div>

                            <div className="dateWatched">
                                <p>{mov.data_vista}</p>
                            </div>
                            
                            <div className="userAdd">
                                <p>{mov.id_user_add}</p>
                            </div>

                        </div>
                        <div className="movieButton">

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieCard
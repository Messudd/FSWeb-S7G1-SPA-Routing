import React from 'react';
import {Link} from 'react-router-dom';

export default function FilmListesi(props) {
  const {detayGit, movies} = props;
  return (
    <div className="movie-list">
        {movies.map(movie => (
          <FilmDetayları key={movie.id} movie={movie} detayGit = {detayGit} />
        ))}
    </div>
  );
  }

function FilmDetayları(props) {
  const {movie, detayGit} = props;
  const { title, director, metascore } = movie;

  return (
   

        <div onClick={() => {detayGit(props.movie.id)}} className="movie-card">
            <h2>{title}</h2>
            <div className="movie-director">
              Director: <em>{director}</em>
            </div>
            <div className="movie-metascore">
              Metascore: <strong>{metascore}</strong>
            </div>
            <Link to= {`/filmler/:` + props.movie.id}><button style={{fontWeight:'bold',letterSpacing:'0.1rem',backgroundColor:'darkblue',color:'whitesmoke',marginTop:'8px',padding:'3px 10px'}}>inclele</button></Link> 
        </div>
  );
}

 
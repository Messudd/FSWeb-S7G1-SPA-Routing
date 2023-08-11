import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Film(props) {
  const {idnum , ekleFunc} = props;
  const [movie, setMovie] = useState();


  const idFilmInfo = async(param) => {

    const data = await axios
    .get(`http://localhost:5001/api/filmler/${param}`) 
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error(error);
    });
    setMovie(data);
   }


  useEffect(() => {
    idFilmInfo(idnum);
  },[idnum])

  console.log('movie_Info : ',movie);


  if (!movie) {
    return <div>Film bilgisi yükleniyor...</div>;
  }

  const { title, director, metascore, stars} = movie;

  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div style={{cursor:'pointer'}} onClick={() => {ekleFunc(movie)}} className="save-button">Kaydet</div>
    </div>
  );
}
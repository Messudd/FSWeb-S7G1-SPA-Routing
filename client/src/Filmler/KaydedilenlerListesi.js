import React from 'react';

export default function KaydedilenlerListesi(props) {
  return (
    <div className="saved-list">
      <h3>Kaydedilen Filmler:</h3>
      {props.list.map(movie => (
        <span className="saved-movie">{movie.title}</span>
      ))}
      <div onClick={() => {props.mainGo()}} className="home-button">Anasayfa</div>
    </div>
  );
}

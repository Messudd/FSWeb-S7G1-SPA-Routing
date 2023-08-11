import React, { useState, useEffect } from 'react';
import {Switch,Route,useHistory} from 'react-router-dom';
import axios from 'axios';
import KaydedilenlerListesi from './Filmler/KaydedilenlerListesi';
import FilmListesi from './Filmler/FilmListesi';
import Film from './Filmler/Film';

export default function App () {
  const [saved, setSaved] = useState([]); 
  const [idnum, setIdNum] = useState(null);
  const [movieList, setMovieList] = useState([]);

  const mainPage = useHistory();
 
const FilmleriAl = async() => {
     const veri =  await axios
        .get('http://localhost:5001/api/filmler') 
        .then(response => {
          return response.data;
        })
        .catch(error => console.error('Sunucu Hatası :( ',error));

        setMovieList(veri);
    }

    const detayGit = (ID) => {
      setIdNum(ID);
    }

  const mainGo = () => {
    mainPage.push('/');
  }


  const KaydedilenlerListesineEkle = (film) => {

    if([...saved].filter((item) => item.id === film.id).length>0){
       alert('Bu film zaten kaydedilenler listesinde :( ');
       mainPage.push('/');
     }
     else{
       setSaved([...saved,film]);
       mainPage.push('/');
     }
  };

  useEffect(() => {
    FilmleriAl();
  },[])

  console.log('movies : ',movieList);


    // if([...saved].length===0) {
    //   setSaved([...saved,film]);
    // }
    // else {
    //   const idList = [...saved].map((item) => {
    //     return item.id;
    //   })
    //     if(idList.includes(film.id)){
    //       alert('Bu film zaten kaydedilenlerde mevcut :( ');
    //     }
    //     else{
    //       setSaved([...saved,film]);
    //     }
    // }



  console.log('kayıtlı liste : ',saved);
  return (
    <>
      <Switch>
          <Route path='/' exact> 
              <div>
                  <KaydedilenlerListesi list={saved} mainGo ={mainGo} />  
              </div>
              <div className="film_list">
                    <FilmListesi movies = {movieList} detayGit = {detayGit} ></FilmListesi>
              </div> 
          </Route>
          <Route path='/filmler/:id'>
              <Film idnum = {idnum} ekleFunc = {KaydedilenlerListesineEkle} ></Film> 
          </Route>
        
          <Route path='/filmler'>
                  <div>
                    <KaydedilenlerListesi list={saved} mainGo ={mainGo} />  
                  </div>
                  <div className="film_list">
                    <FilmListesi movies = {movieList} detayGit = {detayGit} ></FilmListesi>
                  </div> 
          </Route>
     </Switch>
    
    </>

  );
}

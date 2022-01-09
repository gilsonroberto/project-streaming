import React, { useEffect, useState } from 'react';
import './App.css'
import tmdb from './tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await tmdb.getHomeList();
      setMovieList(list);
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo)
      console.log(chosen);
      console.log(chosenInfo);
    }

    loadAll();
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 10 ? setBlackHeader(true) : setBlackHeader(false)
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  })

  return (
    <div className='page'>
      <Header black={blackHeader} />
      {featureData &&
        <FeaturedMovie item={featureData} />
      }
      <section className='lists'>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Criando com React <span role='img' aria-label='heart'></span><br />
        Criando com React <span role='img' aria-label='heart'></span><br />
        Criando com React <span role='img' aria-label='heart'></span><br />
      </footer>
      {movieList.length <= 0 &&
        <div className='loading'>
          <img src='https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_960,c_limit/Netflix_LoadTime.gif ' alt='Carregando' />
        </div>
      }
    </div>
  );
}
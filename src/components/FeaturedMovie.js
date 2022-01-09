import React from 'react';
import './FeaturedMovie.css';
import useWindowSize from './WindowCheck';

export default ({item}) => {

    const isMobile = useWindowSize().width < 768;

    let firstDate = new Date(item.first_air_date)
    let genres = [];
    for(let i in item.genres) {
        genres.push( item.genres[i].name );
    }

    let description = item.overview; // eslint-disable-next-line 
    (isMobile && description.length > 50 ? ( 
        description = description.substring(0, 100) + '...'        
    ) : (
        ''
    ))

    return (
        <section 
            className='featured'
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
            }}
        >
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>{item.name}</div>
                    <div className='featured--info'>
                        <div className='featured--points'>{item.vote_average} pontos</div>
                        <div className='featured--year'>{firstDate.getFullYear()}</div>
                        <div className='featured--seasons'>{item.number_of_seasons} temporada{item.number_of_seasons > 1 ? 's' : ''}</div>
                    </div>
                    <div className='featured--description'>{description}</div>
                    <div className='featured--buttons'>
                        <a href={`/watch/${item.id}`} className='featured--watchbutton' >&#9658; Assistir</a>
                        <a href={`/list/add/${item.id}`} className='featured--mylistbutton' >+ Minha Lista</a>
                    </div>
                    <div className='featured--genres'><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
        </section>
    );
}
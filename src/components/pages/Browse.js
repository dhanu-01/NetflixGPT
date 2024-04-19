import Header from './Header'
import React, { useEffect, useState } from 'react'
import Preview from './Preview';
import { options } from '../../utils/functions/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies,movieTrailer } from '../../Redux/movieSlices';
import MoviesList from './MoviesList';

        
const Browse = () => {
  const [trailerKey, setTrailerKey] = useState();
  const [currentMovie, setCurrentMovie] = useState();
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);
  const nowPlayingMoviesUrl = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

  const getNowPlayingMovies = async () => {
    setLoading(true);
    const response = await fetch(nowPlayingMoviesUrl,options);
    const json = await response.json();
    setCurrentMovie(json.results[0]);
    const currentMovieId = json.results[0].id
    const movieTrailerUrl =  `https://api.themoviedb.org/3/movie/${currentMovieId}/videos?language=en-US`
    const trailerResponse = await fetch(movieTrailerUrl,options);
    const trailerJson = await trailerResponse.json();
    setTrailerKey(trailerJson.results[0].key); 
    dispatch(addNowPlayingMovies(json.results));
    setLoading(false);
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
  

  return (
    <div>
       {loading ? 
             <>  
                <div>Loading...</div>  
             </>
             : 
            (
            <>
              <Header/> 
               {currentMovie && trailerKey && <Preview currentMovie={currentMovie} trailerKey={trailerKey} />}
              <MoviesList/>
            </>
       )}
      
    </div>
  )
}

export default Browse
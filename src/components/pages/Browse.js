import Header from './Header'
import React, { useEffect, useState } from 'react'
import Preview from './Preview';
import { options } from '../../utils/functions/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies,movieTrailer } from '../../Redux/movieSlices';

        
const Browse = () => {
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);
  const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';

  const getNowPlayingMovies = async () => {
    setLoading(true);
    const response = await fetch(url,options);
    const json = await response.json();
    dispatch(addNowPlayingMovies(json.results[0]));
    console.log(json,'json')
    setLoading(false);
    
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
  

  return (
    <div>
       {loading ? 
            <div>Loading...</div> : 
            (
            <>
              <Header/> 
              <Preview/>
            </>
       )}
      
    </div>
  )
}

export default Browse
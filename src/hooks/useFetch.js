import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies,movieTrailer } from '../Redux/movieSlices';


const useFetch = (url,action) => {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const dispatch = useDispatch();

  const fetchData = () => {

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    };
    
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        switch (action) {
            case "addNowPlayingMovies":
                dispatch(addNowPlayingMovies(response));
              break;
            case "movieTrailer":
                dispatch(movieTrailer(response));
              break;
            case "DELETE_DATA":
                dispatch(addNowPlayingMovies(response));
              break;
            default:                
        }
      })
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchData();
  },[])

}

export default useFetch;
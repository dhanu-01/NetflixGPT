import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../uicomponents/Button";
import { options } from "../../utils/functions/constants";
import { movieTrailer } from "../../Redux/movieSlices";

const Preview = () => {
  const dispatch = useDispatch();
  const currentMovie = useSelector((state) => state.movies?.nowPlayingMovies);
  const [loading, setLoading] = useState(false);
  const [trailer,setTrailer] = useState();

  const title = currentMovie?.title;
  const overview = currentMovie?.overview;
  const id = currentMovie?.id;
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const getMovieTrailer = async () => {
     setLoading(true);
     const response = await fetch(url, options);
     const json = await response.json();
     console.log(json.results?.filter(video=>video.type == 'Trailer'),'preview')
     setTrailer(json.results?.filter(video=>video.type == 'Trailer'));
     dispatch(movieTrailer(json));
     setLoading(false);
  }

  useEffect(()=>{
    getMovieTrailer();
  },[])


  return (
    <div>
      {
        loading ? 
        <div> Loading... </div> : 
       <>
        <div className="bg-gradient-to-r from-black aspect-video pl-12 pt-[20%] absolute">
        <h1 className="text-white text-6xl font-bold">{title}</h1>
        <p className="text-white text-lg w-2/4">{overview}</p>
        <div className="flex mt-2">
          <Button
            text="play"
            className="text-black bg-white p-2 text-xl rounded px-12 mr-4 hover:bg-opacity-90"
          />
          <Button
            text="moreInfo"
            className="text-white  bg-[#6d6d6eb3] p-2 text-xl rounded px-12 hover:bg-opacity-90"
          />
        </div>
      </div>

      <div className="w-screen">
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailer[1]?.key}?autoplay=1&mute=1`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
       </>
      }
    </div>
  );
};

export default Preview;

import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies : null,
        movieTrailer: null,
    },
    reducers:{
        addNowPlayingMovies: (state,action)=>{
            state.nowPlayingMovies = action.payload
        },
        movieTrailer: (state,action)=>{
            state.movieTrailer = action.payload
        }
    }
});


export const {addNowPlayingMovies,movieTrailer} = movieSlice.actions;
export default movieSlice.reducer;
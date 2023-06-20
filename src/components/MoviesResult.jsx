import React from "react";
import { useContext } from "react";
import SearchContext from "../Context/SearchContext";
import MovieItem from "./MovieItem";

function MoviesResult() {
  const { state } = useContext(SearchContext);
  return (
    <div
      className="grid grid-cols-1 gap-8 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
      id="MovieResult"
    >
      {state.movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MoviesResult;

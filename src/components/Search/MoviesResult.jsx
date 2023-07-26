import React from "react";
import { useParams } from "react-router-dom";
import TvItem from "./SearchItemTv";
import MultiItem from "./SearchItem";
import MovieItem from "./SeachItemMovie";
import PeopleItem from "./SeatchItemPeople";

function MoviesResult({ data }) {
  console.log(data);
  const params = useParams();

  return (
    <div
      className="grid grid-cols-1 gap-8 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
      id="MovieResult"
    >
      {data.results.map((movie) => {
        if (params.type === "multi") {
          return <MultiItem key={movie.id} movie={movie} />;
        } else if (params.type === "tv") {
          return <TvItem key={movie.id} movie={movie} />;
        } else if (params.type === "movie") {
          return <MovieItem key={movie.id} movie={movie} />;
        } else if (params.type === "person") {
          return <PeopleItem key={movie.id} movie={movie} />;
        }
      })}
    </div>
  );
}

export default MoviesResult;

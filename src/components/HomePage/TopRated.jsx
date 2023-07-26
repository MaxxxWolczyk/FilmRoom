import React from "react";

import TopRatedItem from "./TopRatedItem";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function TopRated({ data, mode }) {
  const Arr = data.results;

  return (
    <div className="flex flex-col h-full ">
      <div className="flex justify-between items-center p-4">
        <h3 className=" uppercase font-bold text-lg md:text-4xl  text-accent-content">
          {mode === "movie" ? "Top Rated Movies" : "Top Rated Tv shows"}
        </h3>
        <Link to={`/${mode}/top-rated/1`}>
          <div className="flex items-center gap-1 text-accent-content uppercase font-semibold cursor-pointer border-2 rounded-xl p-2 border-accent-content transition hover:text-primary hover:bg-black">
            <p>See more</p>
            <FaArrowRight />
          </div>
        </Link>
      </div>
      <div className="flex overflow-x-scroll gap-4 p-2 pb-4">
        {mode === "movie"
          ? Arr.map((item) => (
              <TopRatedItem
                key={item.id}
                id={item.id}
                title={item.title}
                backdrop_path={item.backdrop_path}
                release_date={item.release_date}
                vote_average={item.vote_average}
                type={"movie"}
              />
            ))
          : Arr.map((item) => (
              <TopRatedItem
                key={item.id}
                id={item.id}
                title={item.name}
                backdrop_path={item.backdrop_path}
                release_date={item.first_air_date}
                vote_average={item.vote_average}
                type={"tv"}
              />
            ))}
      </div>
    </div>
  );
}

export default TopRated;

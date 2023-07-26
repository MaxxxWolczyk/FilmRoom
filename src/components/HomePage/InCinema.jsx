import React from "react";

import TopRatedItem from "./TopRatedItem";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function InCinema({ data }) {
  const Arr = data.results;

  return (
    <div className="flex flex-col pt-4 mb-10 shadow-xl">
      <div className="flex justify-between items-center p-4">
        <h3 className=" uppercase font-bold text-lg md:text-4xl  text-white">
          In theatres
        </h3>
      </div>
      <div className="flex overflow-x-scroll gap-4 p-2 pb-10">
        {Arr.map((item) => (
          <TopRatedItem
            key={item.id}
            id={item.id}
            title={item.title}
            backdrop_path={item.backdrop_path}
            release_date={item.release_date}
            vote_average={item.vote_average}
            type={"movie"}
          />
        ))}
      </div>
    </div>
  );
}

export default InCinema;

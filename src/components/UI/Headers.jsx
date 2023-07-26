import React from "react";
import Hero from "./Hero";
import SearchBox from "../Search/SearchBox";

function Headers({ title, description, fetchMovies }) {
  return (
    <div
      className="py-24 mb-8 bg-gray-800 shadow-xl"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(32, 37, 46,.9) 100%, rgba(32, 37, 46,.9) 100%) , url(https://fandomwire.com/wp-content/uploads/2018/08/Movies-background.png)",
      }}
    >
      <Hero title={title} description={description} />
      <div className="flex w-full items-center justify-center mt-10">
        <SearchBox fetchMovies={fetchMovies} />
      </div>
    </div>
  );
}

export default Headers;

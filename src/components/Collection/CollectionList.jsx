import React from "react";
import { Link } from "react-router-dom";

function CollectionList({ data }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  const { parts } = data;
  return (
    <div className="py-4 px-8 flex flex-col">
      <h3 className="font-bold text-3xl">Movies: </h3>
      <div className="flex flex-col gap-4 mt-8">
        {parts.map((movie) => (
          <div
            className="flex sm:shadow-xl overflow-hidden justify-center sm:rounded-lg flex-wrap sm:flex-nowrap"
            key={movie.id}
          >
            <img
              src={`${IMG_PATH}/w300${movie.poster_path}`}
              alt={`${movie.title}-poster`}
              loading="lazy"
              className="sm:w-[150px]"
            />
            <div className="flex flex-col gap-4 pl-4 pt-2 sm:border-y-[.5px] sm:border-r-[.5px] sm:rounded-r-lg w-full border-gray-700">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <Link to={`/movie/${movie.id}`}>
                    <h4 className="text-2xl font-bold hover:text-primary">
                      {movie.title}
                    </h4>
                  </Link>
                  <p className="text-xs">{movie.release_date}</p>
                </div>
                <div
                  className="radial-progress bg-primary-content text-accent border-8 border-primary-content mr-2 mt-2"
                  style={{
                    "--value": (movie.vote_average * 10).toFixed(),
                    "--size": "3rem",
                  }}
                >
                  <p className="text-white text-xs">
                    {(movie.vote_average * 10).toFixed()}%
                  </p>
                </div>
              </div>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollectionList;

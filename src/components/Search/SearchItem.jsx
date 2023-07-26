import React, { useLayoutEffect, useRef } from "react";
import { FaBeer } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";

function MultiItem({ movie }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  const itemRef = useRef();

  useLayoutEffect(() => {
    gsap.from(itemRef.current, { opacity: 0, translateX: 100 });
    gsap.to(itemRef.current, { opacity: 1, translateX: 0, duration: 0.5 });
  }, []);

  return (
    <div className="indicator">
      <span className="indicator-item badge badge-primary translate-y-2 translate-x-1">
        {movie.media_type === "tv" && "Tv show"}
        {movie.media_type === "movie" && "Movie"}
        {movie.media_type === "person" && "Person"}
      </span>
      <div>
        <div
          className="card card-side bg-base-300 shadow-xl h-[200px] w-[300px]"
          key={movie.id}
          ref={itemRef}
        >
          <figure>
            {movie.media_type === "person" &&
              (movie.profile_path ? (
                <div
                  className="w-[150px]"
                  style={{
                    backgroundImage: `url(${IMG_PATH}/w500${movie.profile_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className="w-[150px] flex items-center justify-center bg-black opacity-30">
                  <FaBeer /> <p className="pl-4">Filmroom</p>
                </div>
              ))}

            {(movie.media_type === "movie" || movie.media_type === "tv") &&
              (movie.poster_path ? (
                <div
                  className="w-[150px]"
                  style={{
                    backgroundImage: `url(${IMG_PATH}/w500${movie.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className="w-[150px] flex items-center justify-center bg-black opacity-30">
                  <FaBeer /> <p className="pl-4">Filmroom</p>
                </div>
              ))}
          </figure>
          <div className="card-body w-[100px] ">
            {(movie.media_type === "tv" || movie.media_type === "person") && (
              <h2 className="card-title text-sm pt-1">
                {movie.name.length > 20
                  ? `${movie.name.slice(0, 20)}...`
                  : movie.name}
              </h2>
            )}
            {movie.media_type === "movie" && (
              <h2 className="card-title text-sm pt-1">
                {movie.title.length > 20
                  ? `${movie.title.slice(0, 25)}...`
                  : movie.title}
              </h2>
            )}
            {/* { && (
              <h2 className="card-title text-sm">
                {movie.name.length > 20
                  ? `${movie.name.slice(0, 25)}...`
                  : movie.name}
              </h2>
            )} */}

            <p className="text-sm">
              {movie.media_type === "tv"
                ? movie.first_air_date
                : movie.release_date}
            </p>
            {movie.media_type === "tv" && (
              <Link to={`/tv/${movie.id}`} className="btn btn-primary">
                Info
              </Link>
            )}
            {movie.media_type === "movie" && (
              <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                Info
              </Link>
            )}
            {movie.media_type === "person" && (
              <Link to={`/person/${movie.id}`} className="btn btn-primary">
                Info
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiItem;

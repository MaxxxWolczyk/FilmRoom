import React, { useLayoutEffect, useRef } from "react";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

function MovieItem({ movie }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  const itemRef = useRef();

  useLayoutEffect(() => {
    // console.log(item);
    gsap.from(itemRef.current, { opacity: 0, translateY: 100 });
    gsap.to(itemRef.current, { opacity: 1, translateY: 0, duration: 1 });
  }, []);

  return (
    <div
      className="card card-side bg-base-300 shadow-xl h-[270px] w-[340px]"
      key={movie.id}
      ref={itemRef}
    >
      <figure>
        {movie.poster_path ? (
          <div
            className="w-[250px]"
            style={{
              backgroundImage: `url(${IMG_PATH}/w500${movie.poster_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <div className="w-[250px] flex items-center justify-center bg-black opacity-30">
            <FaBeer /> <p className="pl-4">Movie Finder</p>
          </div>
        )}
      </figure>
      <div className="card-body w-[200px]">
        <h2 className="card-title text-base">
          {movie.title.length > 40
            ? `${movie.title.slice(0, 30)}...`
            : movie.title}
        </h2>
        <p>{movie.release_date}</p>
        <Link to={`/movie/${movie.id}`} className="btn btn-primary">
          Info
        </Link>
      </div>
    </div>
  );
}

export default MovieItem;

import React, { useLayoutEffect, useRef } from "react";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

function PeopleItem({ movie }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  const itemRef = useRef();

  useLayoutEffect(() => {
    gsap.from(itemRef.current, { opacity: 0, translateX: 100 });
    gsap.to(itemRef.current, { opacity: 1, translateX: 0, duration: 0.5 });
  }, []);

  return (
    <div className="indicator">
      <span className="indicator-item badge badge-primary translate-y-2 translate-x-1">
        People
      </span>
      <div>
        <div
          className="card card-side bg-base-300 shadow-xl h-[200px] w-[300px]"
          key={movie.id}
          ref={itemRef}
        >
          <figure>
            {movie.profile_path ? (
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
            )}
          </figure>
          <div className="card-body w-[100px]">
            <div className="mb-14 h-4">
              <h2 className="card-title text-sm ">
                {movie.name.length > 20
                  ? `${movie.name.slice(0, 20)}...`
                  : movie.name}
              </h2>
            </div>
            <Link to={`/person/${movie.id}`} className="btn btn-primary mt-4">
              Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeopleItem;

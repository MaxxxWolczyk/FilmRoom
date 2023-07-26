import React from "react";
import { Link } from "react-router-dom";

function TopRatedItem({
  id,
  title,
  backdrop_path,
  release_date,
  vote_average,
  type,
}) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  return (
    <div className="flex flex-col w-[300px] flex-shrink-0 bg-base-100  rounded-lg overflow-hidden shadow-xl transition hover:scale-105">
      <Link to={`/${type}/${id}`}>
        <img
          src={`${IMG_PATH}/w300${backdrop_path}`}
          alt={`${title}`}
          loading="lazy"
        />
        <div className="p-2 flex justify-between">
          <div className="w-2/3">
            <p className="font-bold ">
              {title.length > 40 ? `${title.slice(0, 40)}...` : title}
            </p>
            <p className="font-normal">{release_date}</p>
          </div>
          <div
            className="radial-progress bg-primary-content text-accent border-8 border-primary-content mr-2 mt-2"
            style={{ "--value": vote_average * 10, "--size": "3rem" }}
          >
            <p className="text-white text-xs">{vote_average * 10}%</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TopRatedItem;

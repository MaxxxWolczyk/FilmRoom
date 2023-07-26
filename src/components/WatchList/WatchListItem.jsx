import React from "react";
import { Link } from "react-router-dom";
import { FaInfo, FaTimes } from "react-icons/fa";

function WatchListItem({ data, type, onDelete }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;

  const { poster, title, release, id } = data;
  return (
    <div className="flex border-2 border-primary rounded-lg overflow-hidden bg-zinc-900">
      <img src={`${IMG_PATH}/w300${poster}`} alt="" className="w-[125px]" />
      <div className="flex flex-col px-2 py-2 w-[130px]">
        <p className="font-bold">
          {title.length > 20 ? `${title.slice(0, 30)}...` : title}
        </p>
        <p className="text-xs flex-grow">{release}</p>
        <div className="flex gap-2 justify-end">
          <button className=" p-2 rounded-lg btn-primary">
            <Link to={`${type}/${id}`}>
              <FaInfo />
            </Link>
          </button>
          <button
            className="p-2 rounded-lg btn-error"
            onClick={() => {
              onDelete(id);
            }}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchListItem;

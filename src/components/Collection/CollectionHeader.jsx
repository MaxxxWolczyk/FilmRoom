import React from "react";

function CollectionHeader({ data }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  const { name, backdrop_path, overview, poster_path } = data;
  return (
    <div
      className="flex p-10 flex-wrap md:flex-nowrap gap-3"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(10.5, 52.5, 73.5, .8) 100%, rgba(9,9,121,0) 100%) ,url(${IMG_PATH}/original${backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={`${IMG_PATH}/w300${poster_path}`}
        alt={`${name}-poster`}
        loading="lazy"
        className="rounded-lg w-[200px]"
      />
      <div className="flex flex-col gap-4 justify-evenly">
        <h2 className="font-bold text-5xl">{name}</h2>
        <div>
          <p className="text-lg">{overview}</p>

          <p className="mt-4">
            Number of movies:{" "}
            <span className="font-bold">{data.parts.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CollectionHeader;

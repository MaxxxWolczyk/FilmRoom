import React from "react";
const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function DescriptionTV({ data }) {
  const { adult, genres, overview, poster_path, vote_average, created_by } =
    data;

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-5">
      <div className="flex items-center justify-center">
        <img
          src={`${IMG_PATH}/original${poster_path}`}
          alt="poster"
          loading="lazy"
          className="w-1/2 md:w-auto shadow-lg min-w-[200px] max-w-[250px]"
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-lg text-white mb-auto ">{overview}</p>
        <div className="flex gap-3 flex-col py-3">
          <p className="">
            Created by:{" "}
            <span className="text-white">
              {[...created_by.map((item) => item.name)].join(", ")}
            </span>
          </p>
          <p className="">
            Genre:{" "}
            <span className="text-white">
              {[...genres.map((genre) => genre.name)].join(", ")}
            </span>
          </p>
          <p className="">
            Rating:{" "}
            <span className="text-white">{`${vote_average.toFixed(
              1
            )} / 10`}</span>
          </p>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default DescriptionTV;

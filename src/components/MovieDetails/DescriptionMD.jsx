import React from "react";
const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function DescriptionMD({ data }) {
  const { genres, overview, poster_path, vote_average, credits } = data;

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-5">
      <div className="flex items-center justify-center">
        <img
          src={`${IMG_PATH}/original${poster_path}`}
          alt="Movie-poster"
          loading="lazy"
          className="w-1/2 md:w-auto shadow-lg min-w-[200px] max-w-[250px]"
          onLoad={() => {
            console.log("siema siema");
          }}
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-lg text-white mb-auto ">{overview}</p>
        <div className="flex gap-3 flex-col py-3">
          <p className="font-bold text-white">
            Director:{" "}
            <span className="font-normal text-gray-400">
              {credits.crew.filter((item) => item.job === "Director").lenght !==
              0
                ? credits.crew.find((item) => item.job === "Director").name
                : "No information"}
            </span>
          </p>
          <p className="font-bold text-white">
            Genre:{" "}
            <span className="font-normal text-gray-400">
              {[...genres.map((genre) => genre.name)].join(", ")}
            </span>
          </p>
          <p className="font-bold text-white">
            Rating:{" "}
            {vote_average.toFixed(1) === "0.0" ? (
              <span className="font-normal text-gray-400">No reviews yet.</span>
            ) : (
              <span className="text-gray-400 font-normal">{`${vote_average.toFixed(
                1
              )} / 10`}</span>
            )}
          </p>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

export default DescriptionMD;

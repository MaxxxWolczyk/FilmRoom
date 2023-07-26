import React from "react";
import { Link } from "react-router-dom";
const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function SeasonList({ seasons, lastSeasonNumber }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {seasons.map((season, index) => (
          <div key={`season-${index}`}>
            {season.season_number !== 0 && (
              <div
                className="rounded-lg flex flex-col md:flex-row border-1 bg-zinc-900 shadow-xl overflow-hidden w-full items-center"
                key={season.id}
              >
                {season.poster_path ? (
                  <img
                    src={`${IMG_PATH}/w500${season.poster_path}`}
                    alt=""
                    className=" w-[250px] lg:w-[140px]"
                  ></img>
                ) : (
                  <div className="w-[250px] lg:w-[140px] aspect-square flex items-center justify-center bg-primary text-black font-bold">
                    FilmRoom
                  </div>
                )}

                <div className="flex flex-col ml-4 p-4">
                  <Link
                    to={`season/${season.season_number}/${lastSeasonNumber}`}
                  >
                    <p className="text-xl uppercase font-bold">
                      Season {season.season_number}
                    </p>
                  </Link>
                  <p className=" text-sm mb-1 md:mb-2 text-zinc-500">
                    {season.air_date}
                  </p>
                  <p>
                    {season.overview.length === 0
                      ? "Description not available..."
                      : season.overview}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default SeasonList;

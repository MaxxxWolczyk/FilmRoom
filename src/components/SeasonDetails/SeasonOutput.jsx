import React from "react";

function SeasonOutput({ episodes }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  return (
    <div className="flex flex-col gap-8 mb-8 px-4 w-full">
      {episodes.map((episode) => (
        <div
          className="flex flex-col sm:flex-row shadow-lg bg-zinc-900 "
          key={episode.id}
        >
          {episode.still_path ? (
            <img
              src={`${IMG_PATH}/w500${episode.still_path}`}
              alt="episode-photo"
              className="w-[300px] aspect-video"
              loading="lazy"
            />
          ) : (
            <div className="w-[300px] aspect-video bg-black flex items-center justify-center">
              <p className="text-2xl font-bold">FilmRoom</p>
            </div>
          )}
          <div className="flex flex-col gap-2 px-4 py-2 flex-grow justify-between">
            <div className="flex justify-between">
              <div>
                <p className="text-zinc-600">
                  episode {episode.episode_number}
                </p>
                <h3 className="text-lg font-bold">{episode.name}</h3>
              </div>
              <p className="text-zinc-600">{episode.air_date}</p>
            </div>
            {episode.overview ? (
              <p className="text-sm">{episode.overview}</p>
            ) : (
              <p>No description yet...</p>
            )}

            <div className="flex gap-2 bg-slate-600 rounded-lg items-center p-1 pl-4">
              {new Date(episode.air_date) - new Date() > 0 ? (
                <p>Not released yet...</p>
              ) : (
                <>
                  <p className="">Runtime: {episode.runtime} min</p>
                  <p className="">
                    Rating: {episode.vote_average.toFixed(1)} / 10
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeasonOutput;

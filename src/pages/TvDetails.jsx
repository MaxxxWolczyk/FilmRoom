import React, { useState } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import HeaderTV from "../components/TvDetails/HeaderTv";
import DescriptionTV from "../components/TvDetails/DescriptionTv";
import WatchProviders from "../components/Shared/WatchProviders";
import Cast from "../components/Shared/Cast";
import SeasonList from "../components/TvDetails/SeasonList";
import WatchList from "../components/Shared/WatchList";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ReviewsMD from "../components/MovieDetails/ReviewsMD";
import Slider from "../components/UI/Slider";

function TvDetails() {
  const deferData = useLoaderData();
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [showSeasons, setShowSeasons] = useState(true);

  const onShowSeasons = () => {
    setShowSeasons((prevState) => !prevState);
  };

  return (
    <React.Suspense
      fallback={
        <div className="h-screen">
          <Spinner />
        </div>
      }
    >
      <Await
        resolve={deferData.data}
        errorElement={<p>Could not fetch Movies</p>}
      >
        {(data) => (
          <div className="px-8 lg:px-40">
            <HeaderTV data={data} />
            {checkingStatus ? (
              <div className="w-full bg-black py-2 px-8 gap-4 flex items-center justify-end">
                <p className="uppercase font-bold">Loading...</p>
              </div>
            ) : loggedIn ? (
              <WatchList
                favData={{
                  id: data.id,
                  title: data.name,
                  poster: data.poster_path,
                  release: data.first_air_date,
                }}
              />
            ) : (
              <div className="w-full bg-black py-2 px-8 gap-4 flex items-center justify-end">
                <p className="uppercase font-bold">
                  You have to be Logged in to add movie to watch list
                </p>
              </div>
            )}

            <div className="divider"></div>
            <DescriptionTV data={data} />
            <div className="divider"></div>
            <WatchProviders
              watchProviders={data["watch/providers"].results.PL}
              id={data.id}
              elementType={"tv"}
            />
            <div className="divider">
              <div className="flex items-center justify-center gap-4">
                <p>Season List</p>
                {showSeasons ? (
                  <FaRegEyeSlash
                    className="cursor-pointer hover:text-primary"
                    onClick={onShowSeasons}
                  />
                ) : (
                  <FaRegEye
                    className="cursor-pointer hover:text-primary"
                    onClick={onShowSeasons}
                  />
                )}
              </div>{" "}
            </div>
            {showSeasons && (
              <>
                <SeasonList
                  seasons={data.seasons}
                  lastSeasonNumber={
                    data.seasons[data.seasons.length - 1].season_number
                  }
                />
              </>
            )}
            <div className="divider"></div>
            <Cast credits={data.aggregate_credits} />
            <div className="divider"></div>
            <ReviewsMD reviews={data.reviews} />
            <div className="divider">Recomendations</div>
            <div className="mb-8">
              <Slider dataArr={data.similar} path={"/tv"} />
            </div>
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}

export default TvDetails;

export const TvLoader = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/tv/${params.tvId}?&append_to_response=watch/providers,aggregate_credits,reviews,similar`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_API_TOKEN,
    },
  };

  const response = await fetch(url, options);
  window.scrollTo(0, 0);
  return defer({
    data: response.json(),
  });
};

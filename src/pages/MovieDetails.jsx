import React, { useEffect, useState } from "react";
import { Await, useLoaderData, useNavigation, defer } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import HeaderMD from "../components/MovieDetails/HeaderMD";
import DescriptionMD from "../components/MovieDetails/DescriptionMD";
import Cast from "../components/Shared/Cast";
import VideosMD from "../components/MovieDetails/VideosMD";
import ReviewsMD from "../components/MovieDetails/ReviewsMD";
import Slider from "../components/UI/Slider";
import WatchProviders from "../components/Shared/WatchProviders";
import WatchList from "../components/Shared/WatchList";
import { useAuthStatus } from "../hooks/useAuthStatus";
import CollectionMD from "../components/MovieDetails/CollectionMD";

function MovieDetails() {
  const deferData = useLoaderData();
  const { loggedIn, checkingStatus } = useAuthStatus();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <section className="min-h-screen flex flex-col">
            <div className="w-full  px-3 lg:px-40 ">
              <HeaderMD data={data} />
              {checkingStatus ? (
                <div className="w-full bg-black py-2 px-8 gap-4 flex items-center justify-end">
                  <p className="uppercase font-bold">Loading...</p>
                </div>
              ) : loggedIn ? (
                <WatchList
                  favData={{
                    id: data.id,
                    title: data.title,
                    poster: data.poster_path,
                    release: data.release_date,
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
              <DescriptionMD data={data} />
              <div className="divider">Streaming info</div>
              <WatchProviders
                watchProviders={data["watch/providers"].results.PL}
                id={data.id}
              />
              <div className="divider">Cast</div>
              <Cast credits={data.credits} />
              <div className="divider"></div>
              <VideosMD videos={data.videos} title={data.title} />
              {data.belongs_to_collection && (
                <>
                  <div className="divider"></div>
                  <CollectionMD collection={data.belongs_to_collection} />
                </>
              )}
              <div className="divider"></div>
              <ReviewsMD reviews={data.reviews} />
              <div className="divider">Recomendations</div>
              <div className="mb-8">
                <Slider dataArr={data.similar} path={"/movie"} />
              </div>
            </div>
          </section>
        )}
      </Await>
    </React.Suspense>
  );
}

export default MovieDetails;

export const MovieDetailsLoader = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?&append_to_response=watch/providers,videos,credits,reviews,similar`;
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

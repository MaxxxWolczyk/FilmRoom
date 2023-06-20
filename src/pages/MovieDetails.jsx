import React, { useEffect, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import HeaderMD from "../components/MovieDetails/HeaderMD";
import DescriptionMD from "../components/MovieDetails/DescriptionMD";
import WatchProvidersMD from "../components/MovieDetails/WatchProvidersMD";
import CastMD from "../components/MovieDetails/CastMD";
import VideosMD from "../components/MovieDetails/VideosMD";
import ReviewsMD from "../components/MovieDetails/ReviewsMD";
import Slider from "../components/UI/Slider";

function MovieDetails() {
  const data = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    id,
    title,
    videos,
    credits,
    reviews,
    ["watch/providers"]: providers,
    similar,
  } = data;

  const watchProviders = providers ? providers.results.PL : false;

  return (
    <React.Suspense fallback={<Spinner />}>
      <Await resolve={data} errorElement={<p>Could not fetch Movies</p>}>
        <section className="min-h-screen flex flex-col">
          <div className="w-full  px-3 lg:px-40 ">
            <HeaderMD data={data} />
            <div className="divider"></div>
            <DescriptionMD data={data} />
            <div className="divider">Streaming info</div>
            <WatchProvidersMD watchProviders={watchProviders} id={id} />
            <div className="divider">Cast</div>
            <CastMD credits={credits} />
            <div className="divider"></div>
            <VideosMD videos={videos} title={title} />
            <div className="divider"></div>
            <ReviewsMD reviews={reviews} />
            <div className="divider">Recomendations</div>
            <div className="mb-8">
              <Slider dataArr={similar} path={"/movie"} />
            </div>
          </div>
        </section>
      </Await>
    </React.Suspense>
  );
}

export default MovieDetails;

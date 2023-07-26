import React from "react";
import Headers from "../components/UI/Headers";
import Trending from "../components/UI/Trending";
import { defer, useLoaderData, Await } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import TopRated from "../components/HomePage/TopRated";
import InCinema from "../components/HomePage/InCinema";

function HomePage() {
  const deferData = useLoaderData();

  const errorElement = (
    <div className="h-14 text-error p-10 font-bold text-2xl uppercase flex items-center justify-center my-4">
      Could not get Data
    </div>
  );

  return (
    <div className="min-h-screen">
      <Headers
        title={"Film room"}
        description={
          "Millions of movies, TV shows and people to discover. Explore now."
        }
      />
      <div className="px-10">
        <React.Suspense fallback={<Spinner />}>
          <Await resolve={deferData.movieData} errorElement={errorElement}>
            {(data) => (
              <Trending contentType={"movies"} state={data} path={"/movie"} />
            )}
          </Await>
        </React.Suspense>
      </div>
      <div className="mb-8 bg-primary">
        <React.Suspense fallback={<Spinner />}>
          <Await
            resolve={deferData.topRatedMovieData}
            errorElement={errorElement}
          >
            {(data) => <TopRated data={data} mode={"movie"} />}
          </Await>
        </React.Suspense>
      </div>
      <div className="px-10">
        <React.Suspense fallback={<Spinner />}>
          <Await resolve={deferData.tvData} errorElement={errorElement}>
            {(data) => (
              <Trending contentType={"tv series"} state={data} path={"/tv"} />
            )}
          </Await>
        </React.Suspense>
      </div>
      <div className="mb-8 bg-primary">
        <React.Suspense fallback={<Spinner />}>
          <Await resolve={deferData.topRatedTvData} errorElement={errorElement}>
            {(data) => <TopRated data={data} mode={"tv"} />}
          </Await>
        </React.Suspense>
      </div>
      <div
        className=""
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.6) 100%, rgba(9,9,121,0) 100%), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <React.Suspense fallback={<Spinner />}>
          <Await resolve={deferData.nowPlayingData} errorElement={errorElement}>
            {(data) => <InCinema data={data} />}
          </Await>
        </React.Suspense>
      </div>
    </div>
  );
}

export default HomePage;

export const HomepageLoader = async () => {
  const urlMovies = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
  const urlTV = `https://api.themoviedb.org/3/trending/tv/day?language=en-US`;
  const urlMovieTopRated = "https://api.themoviedb.org/3/movie/top_rated";
  const urlTvTopRated = "https://api.themoviedb.org/3/tv/top_rated";
  const urlNowPlaying = "https://api.themoviedb.org/3/movie/now_playing";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_API_TOKEN,
    },
  };

  const responseMovie = await fetch(urlMovies, options);
  const responseMovieTopRated = await fetch(urlMovieTopRated, options);
  const responseTvTopRated = await fetch(urlTvTopRated, options);
  const responseTv = await fetch(urlTV, options);
  const responseNowPlaying = await fetch(urlNowPlaying, options);

  return defer({
    movieData: responseMovie.json(),
    topRatedMovieData: responseMovieTopRated.json(),
    topRatedTvData: responseTvTopRated.json(),
    tvData: responseTv.json(),
    nowPlayingData: responseNowPlaying.json(),
  });
};

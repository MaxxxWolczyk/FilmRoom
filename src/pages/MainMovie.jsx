import React, { useState } from "react";
import { useContext } from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

import SearchContext from "../Context/SearchContext";
import { searchMovies } from "../Context/SearchActions";

import SearchBox from "../components/SearchBox";
import Hero from "../components/Hero";
import MoviesResult from "../components/MoviesResult";
import Spinner from "../components/UI/Spinner";
import Trending from "../components/Trending";

function MainMovie() {
  const { state, dispatch } = useContext(SearchContext);

  const data = useLoaderData();

  const fetchMovies = async (value, page) => {
    const moviesData = await searchMovies(value, "pl", page);
    dispatch({
      type: "GET_MOVIES_PAGES",
      payload: { movies: moviesData.results, maxPages: moviesData.total_pages },
    });
    return moviesData.total_pages;
  };

  return (
    <div>
      <div
        className="py-24 mb-8 bg-gray-800 shadow-xl"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(32, 37, 46,.9) 100%, rgba(32, 37, 46,.9) 100%) , url(https://fandomwire.com/wp-content/uploads/2018/08/Movies-background.png)",
        }}
      >
        <Hero />
      </div>
      <div className="px-20 py-20">
        <React.Suspense fallback={<Spinner />}>
          <Await resolve={data} errorElement={<p>Could not fetch Movies</p>}>
            <>
              <Trending timeWindow={"day"} state={data} path={"/movie"} />
              <div className="divider"></div>
            </>
          </Await>
        </React.Suspense>
      </div>
      <div className="flex flex-col items-center sm:px-20 pb-10 gap-5">
        <div className="pb-10 flex justify-center items-center w-3/4">
          <SearchBox fetchMovies={fetchMovies} />
        </div>
        <div>{state.loading ? <Spinner /> : <MoviesResult />}</div>
        <div className="flex flex-col w-full items-center justify-center mt-10">
          {state.movies.length > 0 && (
            <>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (state.page === state.maxPages + 1 || state.maxPages === 1)
                    return;
                  console.log(state.page);
                  dispatch({ type: "INCREASE_PAGE" });
                  fetchMovies(state.input, state.page);
                }}
              >
                {state.page === state.maxPages + 1 || state.maxPages === 1
                  ? "All movies Loaded"
                  : "load more movies"}
              </button>
              <div className="flex mt-2">
                <p className="mr-2">Results:</p>
                <p>{`${state.page === 1 ? state.page : state.page - 1} / ${
                  state.maxPages
                }`}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainMovie;

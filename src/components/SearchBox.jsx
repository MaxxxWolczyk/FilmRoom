import React, { useRef, useContext } from "react";
import SearchContext from "../Context/SearchContext";

function SearchBox({ fetchMovies }) {
  const { state, dispatch } = useContext(SearchContext);
  const searchRef = useRef();

  return (
    <form
      className="form-control flex justify-center w-3/4"
      onSubmit={async (e) => {
        dispatch({ type: "SET_LOADING_TRUE" });
        e.preventDefault();
        dispatch({ type: "CLEAR_MOVIES_PAGE" });
        const pages = await fetchMovies(searchRef.current.value, 1);
        if (pages > 1) {
          dispatch({ type: "SET_PAGE", payload: 2 });
          // dispatch({ type: "SET_PAGE", payload: 1 });
        }
        dispatch({
          type: "SET_INPUT",
          payload: searchRef.current.value,
        });
        dispatch({ type: "SET_LOADING_FALSE" });
      }}
    >
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input w-10/12 input-bordered"
          ref={searchRef}
          // value={searchRef.current.value ? searchRef.current.value : ""}
        />
        <button className="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBox;

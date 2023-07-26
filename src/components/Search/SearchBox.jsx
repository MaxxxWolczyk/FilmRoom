import React, { useRef, useContext, useState } from "react";
import SearchContext from "../../Context/SearchContext";
import { useNavigate } from "react-router-dom";
import { searchAction } from "../../Context/SearchActions";

function SearchBox() {
  const { state, dispatch } = useContext(SearchContext);
  const searchRef = useRef();
  const naviagate = useNavigate();
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (searchRef.current.value.length < 3) {
      setError(true);
      return;
    }
    setError(false);
    naviagate(`/search/multi/${searchRef.current.value}/1`);
  };

  return (
    <form
      className="form-control flex justify-center  w-3/4 md:w-1/2 "
      onSubmit={onSubmit}
    >
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input w-full input-bordered"
          ref={searchRef}
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

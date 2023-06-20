import React, { useEffect, useState } from "react";
import Slider from "./UI/Slider";

function Trending({ state, path }) {
  const [trendings, setTrendings] = useState();
  const [activeTime, setActiveTime] = useState(true);

  useEffect(() => {
    setTrendings(state);
  }, []);

  const changeTrendings = async (timePeriod) => {
    const url = `https://api.themoviedb.org/3/trending/movie/${timePeriod}?language=en-US`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTY5NWM1ZTJjZGUyNGE1MjM4NTRkNjZjMDI3M2E1YiIsInN1YiI6IjY0NzYwYWE5Njc0M2ZhMDExOTdhYmVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DV_trq_u9uGPRLQphE4xfz2cUlzZlO4DWrDeqEAlzGE",
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();
    setTrendings(data);
  };

  return (
    <>
      {trendings && (
        <>
          <div className="flex gap-6 h-1/2">
            <button
              className="mb-10 pb-2  sm:text-2xl uppercase border-b-4 border-transparent"
              style={{ borderColor: activeTime ? "#C9710B" : "transparent" }}
              onClick={async (e) => {
                changeTrendings("day");
                setActiveTime(true);
              }}
            >
              Daily trendings
            </button>
            <button
              className="mb-10 pb-2 sm:text-2xl uppercase border-b-4 border-transparent active:border-b-4 active:border-primary"
              style={{ borderColor: !activeTime ? "#C9710B" : "transparent" }}
              onClick={async (e) => {
                changeTrendings("week");
                setActiveTime(false);
              }}
            >
              Weekly trendings
            </button>
          </div>
          <Slider dataArr={trendings} path={path} />
        </>
      )}
    </>
  );
}

export default Trending;

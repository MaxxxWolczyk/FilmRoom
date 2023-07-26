import React, { useEffect, useState } from "react";
import Slider from "./Slider";

function Trending({ contentType, state, path }) {
  const [trendings, setTrendings] = useState();
  const [activeTime, setActiveTime] = useState(true);

  useEffect(() => {
    setTrendings(state);
  }, []);

  const changeTrendings = async (timePeriod) => {
    const url = `https://api.themoviedb.org/3/trending/${path}/${timePeriod}?language=en-US`;

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
          <div className="flex gap-6 items-center  mb-8 sm:mb-4 flex-wrap justify-center sm:justify-start">
            <h1 className="text-2xl font-bold uppercase">
              Trending {contentType}
            </h1>
            <div className="border-2 rounded-full overflow-hidden">
              <button
                className="px-4  text-lg uppercase rounded-full transition font-bold"
                style={{
                  backgroundColor: activeTime ? "#C9710B" : "transparent",
                }}
                onClick={async (e) => {
                  changeTrendings("day");
                  setActiveTime(true);
                }}
              >
                Daily
              </button>
              <button
                className=" px-4 text-lg uppercase rounded-full transition font-bold"
                style={{
                  backgroundColor: activeTime ? "transparent" : "#C9710B",
                }}
                onClick={async (e) => {
                  changeTrendings("week");
                  setActiveTime(false);
                }}
              >
                Weekly
              </button>
            </div>
          </div>
          <Slider dataArr={trendings} path={path} />
        </>
      )}
    </>
  );
}

export default Trending;

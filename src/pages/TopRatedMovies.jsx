import React from "react";
import {
  defer,
  Await,
  useLoaderData,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import MovieItem from "../components/Search/SeachItemMovie";

function TopRatedMovies() {
  const deferData = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  return (
    <div>
      <h2 className="text-2xl font-bold uppercase mt-10 mb-10 pl-2">
        Top Rated Movies
      </h2>

      <React.Suspense fallback={<Spinner />}>
        <Await
          resolve={deferData.data}
          errorElement={<p>Could not fetch Movies</p>}
        >
          {(data) => (
            <div>
              <div className="flex flex-wrap gap-4 justify-center px-1">
                {data.results.map((item, index) => (
                  <div
                    key={item.id}
                    className="rounded-lg relative overflow-hidden pt-14"
                  >
                    <div className="absolute top-0 left-0 text-5xl font-bold z-40 p-2 min-w-[50px] text-center">
                      <p className="text-white">
                        {index +
                          1 +
                          (Number(params.page) === 2 &&
                            Number(params.page) * 10) +
                          (Number(params.page) > 2 &&
                            Number(params.page) * 20 - 20)}
                      </p>
                    </div>
                    <div className="">
                      <MovieItem movie={item} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 w-full flex justify-between mb-10 px-10">
                <button
                  className=" btn btn-primary"
                  onClick={() => {
                    if (Number(params.page) - 1 === 0) {
                      return;
                    }
                    navigate(`/${type}/top-rated/${Number(params.page) - 1}`);
                  }}
                >
                  {"<"}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (Number(params.page) === data.total_pages) {
                      return;
                    }
                    navigate(`/${type}/top-rated/${Number(params.page) + 1}`);
                  }}
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default TopRatedMovies;

export const TopRatedMoviesLoader = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?page=${params.page}`;
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

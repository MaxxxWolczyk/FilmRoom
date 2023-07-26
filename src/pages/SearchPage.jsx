import React from "react";
import SearchBox from "../components/Search/SearchBox";
import MoviesResult from "../components/Search/MoviesResult";
import Spinner from "../components/UI/Spinner";
import { defer } from "react-router-dom";
import {
  useLoaderData,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { Await } from "react-router-dom";
import {
  FaAngleRight,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
} from "react-icons/fa";

function SearchPage() {
  const params = useParams();
  const naviagate = useNavigate();

  const deferData = useLoaderData();

  return (
    <>
      <div className="p-10 flex flex-col items-center min-h-screen">
        <SearchBox />
        <div className="px-2 py-10 flex items-center gap-4">
          <button
            className={
              params.type === "multi"
                ? "border-b-4 border-primary  py-2"
                : "border-b-4 border-transparent  py-2"
            }
            onClick={() => {
              naviagate(`/search/multi/${params.query}/1`);
            }}
          >
            All
          </button>
          <button
            className={
              params.type === "movie"
                ? "border-b-4 border-primary  py-2"
                : "border-b-4 border-transparent  py-2"
            }
            onClick={() => {
              naviagate(`/search/movie/${params.query}/1`);
            }}
          >
            Movies
          </button>
          <button
            className={
              params.type === "tv"
                ? "border-b-4 border-primary  py-2"
                : "border-b-4 border-transparent  py-2"
            }
            onClick={() => {
              naviagate(`/search/tv/${params.query}/1`);
            }}
          >
            Tv series
          </button>
          <button
            className={
              params.type === "person"
                ? "border-b-4 border-primary  py-2"
                : "border-b-4 border-transparent  py-2"
            }
            onClick={() => {
              naviagate(`/search/person/${params.query}/1`);
            }}
          >
            Person
          </button>
        </div>
        <React.Suspense fallback={<Spinner />}>
          <Await
            resolve={deferData.data}
            errorElement={<Navigate to={"/not-found"} />}
          >
            {(data) => (
              <>
                <div className="mt-14">
                  {data.results.length === 0 ? (
                    <div className="text-3xl text-bold border-4 border-primary p-5 rounded-lg uppercase">
                      Nothing found
                    </div>
                  ) : (
                    <MoviesResult data={data} />
                  )}
                </div>
                <div className="flex flex-col w-full items-center justify-center mt-10">
                  {data.results.length > 0 && (
                    <div className="btn-group">
                      <button
                        className="join-item btn"
                        onClick={() => {
                          if (data.page === 1) return;
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                          naviagate(
                            `/search/${params.type}/${params.query}/${
                              params.page - 1
                            }`
                          );
                        }}
                      >
                        <FaAngleLeft />
                      </button>
                      <button
                        className="join-item btn"
                        onClick={() => {
                          if (data.page === 1) return;
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                          naviagate(
                            `/search/${params.type}/${params.query}/1
                          `
                          );
                        }}
                      >
                        <FaAngleDoubleLeft />
                      </button>
                      <button className="join-item btn">
                        {data.page} / {data.total_pages}
                      </button>
                      <button
                        className="join-item btn"
                        onClick={() => {
                          if (data.page === data.total_pages) return;
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                          naviagate(
                            `/search/${params.type}/${params.query}/${data.total_pages}`
                          );
                        }}
                      >
                        <FaAngleDoubleRight />
                      </button>
                      <button
                        className="join-item btn"
                        onClick={() => {
                          if (data.page === data.total_pages) return;
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          });
                          naviagate(
                            `/search/${params.type}/${params.query}/${
                              +params.page + 1
                            }`
                          );
                        }}
                      >
                        <FaAngleRight />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </Await>
        </React.Suspense>
      </div>
    </>
  );
}

export default SearchPage;

export const searchPageLoader = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/search/${params.type}?query=${params.query}&page=${params.page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_API_TOKEN,
    },
  };

  const response = await fetch(url, options);

  return defer({
    data: response.json(),
  });
};

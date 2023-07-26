import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  defer,
  Await,
  useLoaderData,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import SeasonOutput from "../components/SeasonDetails/SeasonOutput";

function SeasonDetails() {
  const deferData = useLoaderData();
  const navigate = useNavigate();
  const params = useParams();
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;

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
          <div className="flex flex-col items-center p-2">
            <div className="flex gap-4 w-full bg-primary rounded-lg mt-8 p-4 shadow-xl">
              <img
                src={`${IMG_PATH}/w300${data.poster_path}`}
                alt=""
                className="w-[75px] rounded-lg"
              />
              <div className="flex flex-col">
                <h2 className="text-sm md:text-3xl font-bold uppercase text-primary-content pl-2">
                  {data.name}
                </h2>
                <Link
                  to={`/tv/${params.tvId}`}
                  className=" text-xs sm:text-base font-bold flex items-center justify-center uppercase gap-1 text-primary-content transition p-2 rounded-lg hover:bg-black hover:text-white"
                >
                  <FaArrowLeft className="text-xs" /> Back to details page
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between w-full my-8">
              <button
                disabled={params.seasonNumber === "1" ? true : false}
                className="btn "
                onClick={() => {
                  if (params.seasonNumber === "1") return;
                  navigate(
                    `/tv/${params.tvId}/season/${
                      Number(params.seasonNumber) - 1
                    }/${params.seasonMax}`
                  );
                }}
              >
                Prev Season
              </button>
              <button
                className="btn "
                disabled={
                  params.seasonNumber === params.seasonMax ? true : false
                }
                onClick={() => {
                  if (params.seasonNumber === params.seasonMax) return;
                  navigate(
                    `/tv/${params.tvId}/season/${
                      Number(params.seasonNumber) + 1
                    }/${params.seasonMax}`
                  );
                }}
              >
                Next Season
              </button>
            </div>
            <SeasonOutput episodes={data.episodes} />
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}

export default SeasonDetails;

export const SeasonLoader = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/tv/${params.tvId}/season/${params.seasonNumber}`;
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

import React, { useEffect } from "react";
import { defer, useLoaderData, Navigate } from "react-router-dom";
import { Await } from "react-router-dom";
import Spinner from "../components/UI/Spinner";
import HeaderPD from "../components/PersonDetails/HeaderPD";
import KnowForPD from "../components/PersonDetails/KnowForPD";

function PeopleDetails() {
  const deferData = useLoaderData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        errorElement={<Navigate to={"/not-found"} />}
      >
        {(data) => (
          <section className=" md:px-20">
            <HeaderPD data={data} />
            <div className="divider">
              <p className="text-2xl uppercase">Biography</p>
            </div>
            <div className="w-full pt-8 pb-4 px-8">
              <p>{data.biography}</p>
            </div>
            <div className="divider">
              <p className="text-2xl uppercase">Combined Credits</p>
            </div>
            {data.combined_credits.cast.length > 0 && (
              <>
                <h2 className="text-2xl mt-14 pl-4">Actor</h2>
                <KnowForPD
                  movie_credits={data.combined_credits}
                  birthday={data.birthday}
                  type={"cast"}
                />
              </>
            )}
            {data.combined_credits.crew.length > 0 && (
              <>
                <h2 className="text-2xl mt-14 pl-4">Production</h2>
                <KnowForPD
                  movie_credits={data.combined_credits}
                  birthday={data.birthday}
                  type={"crew"}
                />
              </>
            )}
          </section>
        )}
      </Await>
    </React.Suspense>
  );
}

export default PeopleDetails;

export const PeopleDetailsLoader = async ({ params }) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_API_TOKEN,
    },
  };
  const url = `https://api.themoviedb.org/3/person/${params.peopleId}?append_to_response=images,combined_credits`;
  const response = await fetch(url, options);


  return defer({
    data: response.json(),
  });
};

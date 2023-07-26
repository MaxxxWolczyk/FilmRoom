import React from "react";
import { defer, Await, useLoaderData, Navigate } from "react-router-dom";
import CollectionHeader from "../components/Collection/CollectionHeader";
import Spinner from "../components/UI/Spinner";
import CollectionList from "../components/Collection/CollectionList";

function Collection() {
  const deferData = useLoaderData();

  return (
    <div className="min-h-screen">
      <React.Suspense fallback={<Spinner />}>
        <Await
          resolve={deferData.data}
          errorElement={<Navigate to={"/not-found"} />}
        >
          {(data) => (
            <>
              <CollectionHeader data={data} />
              <CollectionList data={data} />
            </>
          )}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default Collection;

export const CollectionLoader = async ({ params }) => {
  const url = `https://api.themoviedb.org/3/collection/${params.collectionId}`;
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

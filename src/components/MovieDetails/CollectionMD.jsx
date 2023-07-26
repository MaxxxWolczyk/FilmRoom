import React from "react";
import { Link } from "react-router-dom";

function CollectionMD({ collection }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  return (
    <div
      className="p-10 flex flex-col h-96 gap-8 justify-center"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(9,9,121,0.7) 100%, rgba(9,9,121,0) 100%) ,url(${IMG_PATH}/original${collection.backdrop_path}) `,
        backgroundSize: "cover",
      }}
    >
      <p className="text-3xl">
        Belongs to <span className="font-bold">{collection.name}</span>
      </p>
      <div>
        <Link to={`/collection/${collection.id}`} className="btn btn-primary">
          Show Collection
        </Link>
      </div>
    </div>
  );
}

export default CollectionMD;

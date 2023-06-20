import React from "react";
import { FaBeer } from "react-icons/fa";

const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function CastMD({ credits }) {
  return (
    <>
      {credits.cast.length > 0 ? (
        <div className="overflow-x-scroll gap-5 py-5 flex  ">
          {credits.cast.map((member) => (
            <div
              className="h-[300px] w-[150px] shrink-0 rounded-lg overflow-hidden bg-zinc-900 shadow-lg"
              key={member.id}
            >
              <figure className="h-2/3">
                {member.profile_path ? (
                  <img
                    src={`${IMG_PATH}/w500${member.profile_path}`}
                    alt={member.name}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <FaBeer />
                    <p className="pl-2">Movie Finder</p>
                  </div>
                )}
              </figure>
              <div className=" flex flex-col p-2 justify-between gap-2">
                <h2 className=" font-bold">{member.name}</h2>
                <p className="text-sm text-zinc-400">{member.character}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cast found</p>
      )}
    </>
  );
}

export default CastMD;

import React from "react";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";

const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function Cast({ credits }) {
  return (
    <>
      {credits.cast.length > 0 ? (
        <div className="overflow-x-scroll gap-5 py-5 flex  ">
          {credits.cast.map((member) => (
            <Link to={`/person/${member.id}`} key={member.id}>
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
                      <p className="pl-2">FilmRoom</p>
                    </div>
                  )}
                </figure>
                <div className=" flex flex-col p-2 justify-between gap-1">
                  <h2 className="font-bold">{member.name}</h2>
                  {member.character && (
                    <p className="text-sm text-zinc-400">{member.character}</p>
                  )}
                  {member.roles && (
                    <div
                      className="flex flex-col"
                      key={member.roles[0].credit_id}
                    >
                      <p className="text-sm">{member.roles[0].character}</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex p-4 items-center justify-center bg-black rounded-lg">
          <p className="text-2xl text-white">No Cast Found</p>
        </div>
      )}
    </>
  );
}

export default Cast;

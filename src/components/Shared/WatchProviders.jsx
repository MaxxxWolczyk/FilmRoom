import React from "react";
const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function WatchProviders({ watchProviders, id, elementType }) {
  const WatchProvidersComponent = ({ type }) => {
    return (
      <div className="flex gap-8 w-full flex-wrap">
        {watchProviders[type].map((item) => (
          <div key={item.logo_path}>
            <a
              href={
                elementType === "tv"
                  ? `https://www.themoviedb.org/tv/${id}/watch`
                  : `https://www.themoviedb.org/movie/${id}/watch`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${IMG_PATH}/w500${item.logo_path}`}
                alt=""
                className="w-[50px] h-[50px] mb-3 rounded-lg transition border-primary hover:border-4 hover:scale-125"
              />
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {watchProviders ? (
        <div>
          <div className="flex flex-col justify-evenly gap-5">
            {Object.keys(watchProviders)
              .filter((item) => item !== "link")
              .map((itemName) => (
                <div className="flex flex-col bg-zinc-900 p-5 gap-2 rounded-lg">
                  <h3 className="text-white font-semibold mb-2 text-xl">
                    {itemName.toUpperCase()}
                  </h3>
                  <div className="flex flex-shrink-0 justify-between">
                    <WatchProvidersComponent type={itemName} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="flex p-4 items-center justify-center bg-black rounded-lg">
          <p className="text-2xl text-white">No streaming Aviable</p>
        </div>
      )}
    </>
  );
}

export default WatchProviders;

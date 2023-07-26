import React from "react";

function VideosMD({ videos, title }) {
  const trailerKey = videos.results.find((item) => item.type === "Trailer");

  return (
    <>
      {trailerKey ? (
        <>
          <div className="flex flex-col justify-center gap-3 bg-zinc-900 rounded-lg px-10 py-10">
            <div className="w-full text-xl font-semibold">
              <p className="uppercase">{`videos for ${title}`}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <iframe
                className="border border-white/40 w-full sm:w-2/3 aspect-video"
                src={`https://www.youtube.com/embed/${trailerKey.key}`}
                title="YouTube video player"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

              {videos.results.length > 2 && (
                <div className="flex flex-row gap-2 sm:flex-col justify-center sm:justify-normal">
                  <iframe
                    className="border border-white/40 w-1/2 sm:w-auto aspect-video"
                    src={`https://www.youtube.com/embed/${videos.results[0].key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <iframe
                    className="border border-white/40 w-1/2 sm:w-auto aspect-video"
                    src={`https://www.youtube.com/embed/${videos.results[1].key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="flex p-4 items-center justify-center bg-black rounded-lg">
          <p className="text-2xl text-white">No Videos Aviable</p>
        </div>
      )}
    </>
  );
}

export default VideosMD;

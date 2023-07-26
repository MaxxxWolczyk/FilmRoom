import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function KnowForPD({ movie_credits, birthday, type }) {
  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  const birthYear = birthday === null ? 1999 : Number(birthday.slice(0, 4));
  const currentDate = new Date().getFullYear();
  const datesArr = [
    ...Array.from(
      { length: currentDate + 10 - birthYear },
      (_, i) => i + (1 + birthYear)
    ),
  ].reverse();

  const yearsArr = [
    ...datesArr.map((item) => {
      return { year: item, data: [] };
    }),
  ];

  (type === "cast" ? movie_credits.cast : movie_credits.crew).map((item) => {
    if (item.media_type === "movie") {
      if (!item.release_date) return;

      const index = yearsArr.findIndex(
        (element) => element.year === Number(item.release_date.slice(0, 4))
      );

      if (index < 0) return;

      yearsArr[index].data.push(item);
    } else if (item.media_type === "tv") {
      if (!item.first_air_date) return;

      const index = yearsArr.findIndex(
        (element) => element.year === Number(item.first_air_date.slice(0, 4))
      );
      if (index < 0) return;

      console.log(index);
      yearsArr[index].data.push(item);
    }
  });

  return (
    <div className="flex flex-col border-t-2 border-x-2 border-gray-600 rounded-lg shadow-2xl mb-8">
      {yearsArr.map((item) =>
        item.data.length === 0 ? null : (
          <div className="border-b-2 pt-4 border-gray-600 rounded-lg">
            {item.data.map((data) => (
              <div className="flex px-4 pb-4 gap-8 items-center">
                <p>{item.year}</p>
                <div className="dropdown dropdown-top dropdown-hover">
                  <label tabIndex={0}>
                    <FaSearch />
                  </label>
                  <div
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-slate-600 rounded-box w-[300px]"
                  >
                    <div className="flex gap-4 ">
                      <img
                        src={`${IMG_PATH}/w300/${data.poster_path}`}
                        alt=""
                        className="w-[100px] rounded-lg"
                      />
                      <p className="text-base">
                        {data.overview.slice(0, 100) + "..."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <Link
                    to={
                      data.media_type === "tv"
                        ? `/tv/${data.id}`
                        : `/movie/${data.id}`
                    }
                  >
                    <p className="font-bold">
                      {data.media_type === "tv" ? data.name : data.title}
                    </p>
                  </Link>

                  {(data.character || data.department) && (
                    <p className=" pl-2 text-gray-400">
                      {type === "cast"
                        ? `as ${data.character}`
                        : data.department}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default KnowForPD;

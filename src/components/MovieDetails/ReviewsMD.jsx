import React, { useState } from "react";
const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function ReviewsMD({ reviews }) {
  const reviewArray =
    reviews.results.length === 0
      ? null
      : reviews.results.length > 3
      ? [0, 1, 2]
      : [0];

  const getAvatarURL = (index, reviews) => {
    if (!reviews.results[index].author_details.avatar_path) return;
    if (reviews.results[index].author_details.avatar_path.startsWith("/http")) {
      return `${reviews.results[index].author_details.avatar_path.replace(
        "/",
        ""
      )}`;
    } else
      return `${IMG_PATH}/original${reviews.results[index].author_details.avatar_path}`;
  };

  const ReviewComponent = ({ item }) => {
    const [showText, setShowText] = useState(false);

    return (
      <div
        className="flex flex-col items-center border-2 border-primary pb-3 rounded-xl bg-zinc-900"
        key={`review-${item}`}
      >
        <div className="flex gap-3 items-center self-start px-5 py-3">
          <div className="avatar">
            <div className="w-12 rounded-full">
              {reviews.results[item].author_details.avatar_path ? (
                <img src={getAvatarURL(item, reviews)} />
              ) : (
                <div className="bg-primary w-full h-full"></div>
              )}
            </div>
          </div>
          {reviews.results[item].author_details && (
            <p className="font-semibold">
              {reviews.results[item].author_details.username}
            </p>
          )}
        </div>
        <div
          className={
            showText
              ? "w-full px-5 pb-5 rounded-lg h-auto overflow-y-hidden relative"
              : "w-full px-5 pb-5 rounded-lg max-h-28 overflow-y-hidden relative"
          }
        >
          {reviews.results[item].content}
          {reviews.results[item].content.length > 300 && (
            <div
              className={
                showText
                  ? "hidden"
                  : "absolute w-[95%] bg-gradient-to-t from-zinc-900 from-15% to-transparet h-1/2 bottom-0"
              }
            ></div>
          )}
        </div>
        {reviews.results[item].content.length > 300 && (
          <button
            className="btn btn-primary w-1/3 mt-4"
            onClick={() => {
              setShowText((prevState) => !prevState);
            }}
          >
            {showText ? "Hide review..." : "Read more..."}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="w-full  flex flex-col rounded-lg p-3 gap-3">
      {reviewArray ? (
        reviewArray.map((item) => {
          return <ReviewComponent item={item} />;
        })
      ) : (
        <p>No reviews aviable</p>
      )}
    </div>
  );
}

export default ReviewsMD;

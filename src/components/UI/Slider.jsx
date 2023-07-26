import React, { useLayoutEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";

function Slider({ dataArr, path }) {
  const sliderRef = useRef();

  useLayoutEffect(() => {
    gsap.from(sliderRef.current.children, { opacity: 0, duration: 2 });
    gsap.to(sliderRef.current.children, {
      opacity: 1,
      duration: 3,
    });
  }, [dataArr]);

  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      breakpoints={{
        450: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        600: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        850: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1000: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      }}
      ref={sliderRef}
    >
      {dataArr.results.map((movieData, index) => {
        return (
          <SwiperSlide key={movieData.id} className="p-4">
            <Link to={`${path}/${movieData.id}`}>
              <div className="indicator mt-4 w-full">
                <span className="indicator-item badge badge-secondary">
                  {index + 1}
                </span>
                <div className="grid place-items-center w-full rounded-lg">
                  {movieData.poster_path ? (
                    <img
                      className="rounded-lg min-h-[210px] "
                      src={`${IMG_PATH}/w500${movieData.poster_path}`}
                      alt="movie poster"
                      draggable="false"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[9/13.5] rounded-lg flex items-center justify-center bg-zinc-900">
                      <p className="text-center">Movie Finder</p>
                    </div>
                  )}
                  <div className="w-full flex flex-col items-center pt-4">
                    <progress
                      className="progress progress-accent w-2/3 mb-2 bg-slate-600"
                      value={Math.floor(movieData.vote_average * 10)}
                      max="100"
                    ></progress>
                    <div className="h-[48px] overflow-y-hidden">
                      <p className="text-center text-content">
                        {movieData.title ? movieData.title : movieData.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;

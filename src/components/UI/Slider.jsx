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
    console.log(sliderRef);
    gsap.from(sliderRef.current.children, { opacity: 0, translateY: 100 });
    gsap.to(sliderRef.current.children, {
      opacity: 1,
      duration: 1,
      translateY: 0,
    });
  }, [dataArr]);

  const IMG_PATH = process.env.REACT_APP_IMG_PATH;
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      centeredSlides={true}
      loop={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      breakpoints={{
        450: {
          slidesPerView: 2,
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
      {dataArr.results.map((movieData) => {
        return (
          <SwiperSlide key={movieData.id}>
            <Link to={`${path}/${movieData.id}`}>
              <div className="flex flex-col items-center pt-5 relative gap-3 bg-slate-200 p-2 rounded-lg shadow-lg min-h-[270px]">
                {movieData.poster_path ? (
                  <img
                    className="w-2/3 rounded-lg"
                    src={`${IMG_PATH}/w500${movieData.poster_path}`}
                    alt=""
                    draggable="false"
                  />
                ) : (
                  <div className="w-2/3 aspect-[9/13.5] rounded-lg flex items-center justify-center bg-zinc-900">
                    <p className="text-center">Movie Finder</p>
                  </div>
                )}
                <progress
                  className="progress progress-accent w-2/3"
                  value={Math.floor(movieData.vote_average * 10)}
                  max="100"
                ></progress>
                <div className="h-[48px] overflow-y-hidden">
                  <p className="text-center text-black">{movieData.title}</p>
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

import React from "react";

function Hero({ title, description }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="max-w-xl">
          <h1 className="text-5xl text-white font-bold">{title}</h1>
          <p className="pt-4 text-white">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;

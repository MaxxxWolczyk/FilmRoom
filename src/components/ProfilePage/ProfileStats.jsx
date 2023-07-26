import React from "react";
import { FaClock, FaFilm, FaComment } from "react-icons/fa";

function ProfileStats() {
  return (
    <div className="stats shadow bg-zinc-900">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaClock className="w-10 h-10" />
        </div>
        <div className="stat-title">Time watched</div>
        <div className="stat-value text-primary">25.6K</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaFilm className="w-10 h-10" />
        </div>
        <div className="stat-title">Titles to watch</div>
        <div className="stat-value text-primary">25.6K</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaComment className="w-10 h-10" />
        </div>
        <div className="stat-title">Reviews posted</div>
        <div className="stat-value text-primary">25.6K</div>
      </div>
    </div>
  );
}

export default ProfileStats;

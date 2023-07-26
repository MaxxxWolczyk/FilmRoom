import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimesCircle, FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import Spinner from "../UI/Spinner";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";

function WatchList({ favData }) {
  const [filmArr, setFilmArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const locationType = location.pathname.split("/");

  const { id, title, poster, release } = favData;

  useEffect(() => {
    const fetchFavouriteFilms = async () => {
      const filmRef = doc(db, "users", `${auth.currentUser.uid}`);
      const docSnap = await getDoc(filmRef);

      if (docSnap.exists()) {
        if (locationType[1] === "movie") {
          setFilmArr(docSnap.data().fav_movies);
        } else {
          setFilmArr(docSnap.data().fav_tv);
        }
        setLoading(false);
      }
    };

    try {
      fetchFavouriteFilms();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, []);

  const onAdd = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const CopyFilmArr = [...filmArr, { id, title, poster, release }];
      await updateDoc(docRef, {
        [`${locationType[1] === "movie" ? "fav_movies" : "fav_tv"}`]:
          CopyFilmArr,
      });

      setFilmArr(CopyFilmArr);
      toast.success("Movie added to watch list");
    } catch (error) {
      toast.error("Could not add movie to list");
    }
  };

  const onRemove = async () => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const CopyFilmArr = filmArr.filter((film) => film.id !== id);
      await updateDoc(docRef, {
        [`${locationType[1] === "movie" ? "fav_movies" : "fav_tv"}`]:
          CopyFilmArr,
      });
      setFilmArr(CopyFilmArr);
      toast.success("Movie removed from watch list");
    } catch (error) {
      toast.error("Could not add movie to list");
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-black py-2 px-8 gap-4 flex items-center justify-end">
        <p className="uppercase font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-black py-2 px-8 gap-4 flex items-center justify-end">
      <p className="uppercase font-bold">
        {filmArr.some((item) => item.id === id)
          ? "Added to watch List"
          : "Add to watch List"}
      </p>
      <div className="flex items-center gap-4">
        {filmArr.some((item) => item.id === id) ? (
          <FaCheckCircle fill="green" className="w-6 h-6" />
        ) : (
          <FaPlusCircle
            className="w-6 h-6 cursor-pointer hover:scale-125 hover:text-primary"
            onClick={onAdd}
          />
        )}

        {filmArr.some((item) => item.id === id) ? (
          <FaTimesCircle
            onClick={onRemove}
            fill="red"
            className="w-6 h-6 cursor-pointer hover:scale-125"
          />
        ) : (
          <FaTimesCircle className="w-6 h-6" />
        )}
      </div>
    </div>
  );
}

export default WatchList;

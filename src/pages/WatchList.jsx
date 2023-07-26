import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Spinner from "../components/UI/Spinner";
import WatchListItem from "../components/WatchList/WatchListItem";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function WatchList() {
  const [movieArray, setMovieArray] = useState();
  const [tvArray, setTvArray] = useState();
  const [loading, setLoading] = useState(true);
  const [showMovies, setShowMovies] = useState(true);
  const [showTv, setShowTv] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMovieArray(docSnap.data().fav_movies);
          setTvArray(docSnap.data().fav_tv);
          setLoading(false);
        }
      } catch (error) {}
    };

    fetchMovies();
  }, []);

  const onDeleteMovie = async (id) => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const CopyFilmArr = movieArray.filter((film) => film.id !== id);
      await updateDoc(docRef, {
        ["fav_movies"]: CopyFilmArr,
      });
      setMovieArray(CopyFilmArr);
      toast.success("Movie removed from watch list");
    } catch (error) {
      toast.error("Could not delete");
    }
  };

  const onDeletetv = async (id) => {
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const CopyFilmArr = tvArray.filter((tv) => tv.id !== id);
      await updateDoc(docRef, {
        ["fav_tv"]: CopyFilmArr,
      });
      setTvArray(CopyFilmArr);
      toast.success("Tv removed from watch list");
    } catch (error) {
      toast.error("Could not delete");
    }
  };

  return (
    <div className="py-4 px-4 md:px-24 min-h-screen">
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-4xl uppercase font-bold my-4">Watch List</h2>
          <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg">
            <p className="text-2xl">Movies</p>
            <div className="flex items-center gap-4">
              <div className="bg-primary text-zinc-900 p-2 flex gap-4 rounded-lg">
                <p>
                  total titles: <span>{movieArray.length}</span>
                </p>
              </div>
              <p
                className="cursor-pointer hover:text-primary"
                onClick={() => {
                  setShowMovies((prevState) => !prevState);
                }}
              >
                {showMovies ? <FaRegEyeSlash /> : <FaRegEye />}
              </p>
            </div>
          </div>
          {showMovies && (
            <div className="w-full flex flex-wrap gap-3 p-4 justify-center md:justify-start">
              {movieArray.length > 0 ? (
                movieArray.map((item) => (
                  <WatchListItem
                    key={item.id}
                    data={item}
                    type={"/movie"}
                    onDelete={onDeleteMovie}
                  />
                ))
              ) : (
                <div>
                  <p className="uppercase">Nothing found</p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg mt-8">
            <p className="text-2xl">Tv show</p>
            <div className="flex items-center gap-4">
              <div className="bg-primary text-zinc-900 p-2 flex gap-4 rounded-lg">
                <p>
                  total titles: <span>{tvArray.length}</span>
                </p>
              </div>
              <p
                className="cursor-pointer hover:text-primary"
                onClick={() => {
                  setShowTv((prevState) => !prevState);
                }}
              >
                {showTv ? <FaRegEyeSlash /> : <FaRegEye />}
              </p>
            </div>
          </div>
          {showTv && (
            <div className="w-full flex  flex-wrap gap-3  p-4">
              {tvArray.length > 0 ? (
                tvArray.map((item) => (
                  <WatchListItem
                    key={item.id}
                    data={item}
                    type={"/tv"}
                    onDelete={onDeletetv}
                  />
                ))
              ) : (
                <div>
                  <p className="uppercase">Nothing found</p>
                </div>
              )}
              {}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default WatchList;

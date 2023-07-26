import React from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { toast } from "react-toastify";

function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  const onFacebookAuth = async () => {
    try {
      const providerFacebook = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, providerFacebook);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          fav_movies: [],
          fav_tv: [],
          avatar_url: "",
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Could not log with Facebook");
    }
  };
  const onGoogleAuth = async () => {
    try {
      const providerGoogle = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, providerGoogle);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          fav_movies: [],
          fav_tv: [],
          avatar_url: "",
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Could not log with Google");
    }
  };

  return (
    <div className="w-full flex flex-wrap mt-8 justify-evenly">
      <h2 className="w-full text-center mb-4 uppercase">
        or sign {location.pathname === "/sign-in" ? "in" : "up"} with:
      </h2>
      <div className="p-2 rounded-full">
        <FaFacebook
          className="h-10 w-10 hover:text-primary cursor-pointer"
          onClick={onFacebookAuth}
        />
      </div>
      <div className="p-2">
        <FaGoogle
          className="h-10 w-10 hover:text-primary cursor-pointer"
          onClick={onGoogleAuth}
        />
      </div>
    </div>
  );
}

export default OAuth;

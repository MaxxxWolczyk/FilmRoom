import React, { useEffect, useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaTimes,
  FaRegEye,
  FaRegEyeSlash,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/Shared/OAuth";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [submitActive, setSubmitActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [bigLetterPassword, setBigLetterPassword] = useState(false);
  const [numberPassword, setNumberPassword] = useState(false);
  const [lengthPassword, setLengthPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      updateProfile(auth.currentUser, { displayName: name });
      const formDataCopy = {
        ...formData,
        fav_movies: [],
        fav_tv: [],
        avatar_url: "",
        timestamp: serverTimestamp(),
      };
      delete formDataCopy.password;

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong try again later");
    }
  };

  const onChange = (e) => {
    if (e.target.id === "password") {
      //Password includes capital letter
      if (/[A-Z]/.test(e.target.value)) {
        setBigLetterPassword(true);
      } else {
        setBigLetterPassword(false);
      }
      //Password includes number
      if (/[0-9]/.test(e.target.value)) {
        setNumberPassword(true);
      } else {
        setNumberPassword(false);
      }
      //Password length greater than 6
      if (e.target.value.length > 6) {
        setLengthPassword(true);
      } else {
        setLengthPassword(false);
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

    if (bigLetterPassword && numberPassword && lengthPassword) {
      setSubmitActive(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-4 min-h-screen">
        <div className="p-10 bg-zinc-900 rounded-lg">
          <h1 className="text-3xl uppercase font-bold ">Sign Up</h1>
          <div className="">
            <form
              onSubmit={(e) => {
                if (!submitActive) {
                  onSubmit(e);
                } else {
                  alert("please complete all fields");
                }
              }}
            >
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name..."
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={onChange}
              />
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email..."
                className="input input-bordered w-full max-w-xs"
                value={email}
                onChange={onChange}
              />
              <label className="label">
                <span className="label-text">Password</span>
                <span
                  className="label-text-alt cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password..."
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={onChange}
              />
              <div className="flex mt-2 gap-1 items-center">
                {bigLetterPassword ? (
                  <FaCheck fill="green" />
                ) : (
                  <FaTimes fill="red" />
                )}
                <p className="text-xs">Password contains capital letter</p>
              </div>
              <div className="flex mt-2 gap-1 items-center">
                {numberPassword ? (
                  <FaCheck fill="green" />
                ) : (
                  <FaTimes fill="red" />
                )}
                <p className="text-xs">Password contains number</p>
              </div>
              <div className="flex mt-2 gap-1 items-center">
                {lengthPassword ? (
                  <FaCheck fill="green" />
                ) : (
                  <FaTimes fill="red" />
                )}
                <p className="text-xs">Password length greater than 6</p>
              </div>

              <button
                disabled={submitActive}
                type="submit"
                className="btn-primary w-full mt-8 rounded-lg text-2xl uppercase font-bold py-3"
              >
                Sign up
              </button>
            </form>
            <OAuth />
          </div>
          <div className="divider"></div>
          <div className="flex justify-center">
            <p
              className="text-lg uppercase mt-4 hover:text-primary cursor-pointer font-bold"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate("/sign-in");
              }}
            >
              Sing In Instead
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;

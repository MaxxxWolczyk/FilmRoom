import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import OAuth from "../components/Shared/OAuth";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        navigate("/");
      }
    } catch (error) {
      const errorItems = error.message.split(" ");
      const errorItem = errorItems[errorItems.length - 1];

      console.log(errorItem);

      if (
        errorItem === "(auth/invalid-email)." ||
        errorItem === "(auth/wrong-password)."
      ) {
        toast.error("Invalid email or password");
      } else if (errorItem === "(auth/too-many-requests).") {
        toast.error("To many login attempts, reset your password to log in");
      }

      toast.error();
    }
  };

  const onChange = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  return (
    <>
      <div className="flex flex-col items-center py-4 h-screen">
        <div className="p-10 bg-zinc-900 rounded-lg">
          <h1 className="text-3xl uppercase font-bold ">Sign In</h1>
          <div className="">
            <form onSubmit={onSubmit}>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email..."
                value={email}
                id="email"
                className="input input-bordered w-full max-w-xs"
                onChange={onChange}
              />
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password..."
                value={password}
                id="password"
                className="input input-bordered w-full max-w-xs"
                onChange={onChange}
              />
              <p className="cursor-pointer hover:text-primary">
                Forgot Password
              </p>

              <button
                type="submit"
                className="btn-primary w-full mt-4 rounded-lg text-2xl uppercase font-bold py-3"
              >
                Sign in
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
                navigate("/sign-up");
              }}
            >
              Sing Up Instead
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;

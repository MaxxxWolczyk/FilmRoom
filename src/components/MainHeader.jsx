import { Outlet, useNavigate } from "react-router-dom";
import { FaBeer, FaArrowUp, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { auth } from "../config/firebase";

function MainHeader() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/sign-in");
    auth.signOut();
    window.location.reload(false);
  };

  const moveUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <>
      <header>
        <div className="navbar bg-neutral shadow-md flex justify-between flex-wrap md:px-10">
          <Link
            to="/"
            className="flex items-center justify-center pl-4 md:pl-0"
          >
            <FaBeer />
            <p className="pl-2 text-lg">Film room</p>
          </Link>

          {checkingStatus ? (
            <p>Loading</p>
          ) : loggedIn ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost rounded-btn hover:bg-primary hover:text-base-100"
              >
                <p className="pr-2">{auth.currentUser.displayName}</p>
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src={auth.currentUser.photoURL} />
                  </div>
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] p-2 shadow bg-zinc-900 rounded-box w-52 mt-4 "
              >
                <li>
                  <Link
                    to={"/profile"}
                    className="hover:bg-primary hover:text-base-100"
                  >
                    Profile Details
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/watch-list"}
                    className="hover:bg-primary hover:text-base-100"
                  >
                    Watch List
                  </Link>
                </li>
                <li>
                  <a
                    className="hover:bg-red-600 hover:text-white text-red-600"
                    onClick={onClick}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/sign-in"}
              className="btn-primary p-2 rounded-lg uppercase font-bold"
            >
              Log in <FaUser className="ml-4" />
            </Link>
          )}

          {/*  */}

          {/*  */}
        </div>
      </header>
      <main className="max-w-[1300px] m-auto">
        <Outlet />
      </main>
      <footer className="footer p-10 bg-neutral text-neutral-content footer-center grid grid-cols-3 items-start">
        <div>
          <span className="footer-title">Created by:</span>
          <a
            href="https://github.com/MaxxxWolczyk"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Max Wołczyk
          </a>
        </div>
        <div>
          <span className="footer-title">Data provided by:</span>
          <a
            href="https://github.com/MaxxxWolczyk"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            themoviedb.org
          </a>
          <a
            href="https://github.com/MaxxxWolczyk"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            justwatch.com
          </a>
        </div>
        <div>
          <span className="footer-title">Created by:</span>
          <a
            href="https://github.com/MaxxxWolczyk"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Max Wołczyk
          </a>
        </div>
      </footer>
      <button
        className="bg-base-300 w-10 h-10 rounded-md fixed bottom-3 right-3 flex justify-center items-center border-2 border-primary hover:scale-105 "
        onClick={moveUp}
      >
        <FaArrowUp />
      </button>
    </>
  );
}

export default MainHeader;

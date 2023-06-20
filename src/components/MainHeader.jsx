import { Outlet } from "react-router-dom";
import { FaBeer, FaArrowUp } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

function MainHeader() {
  const moveUp = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <>
      <header>
        <div className="navbar bg-neutral shadow-md flex justify-center md:justify-normal flex-wrap items-center px-10">
          <div className="order-1 mr-auto sm:mr-0 mt-4 mb-10 sm:my-0">
            <Link to="/" className="flex items-center justify-center">
              <FaBeer />
              <p className="pl-2 text-lg">Movie Finder</p>
            </Link>
          </div>
          {/* <div className="divider w-full sm:hidden order-3 m-1"></div> */}
          <div className="order-3 sm:order-2 sm:mr-auto sm:ml-8 mb-3 sm:mb-0">
            <div className="w-full">
              <ul className="flex gap-10">
                <li>
                  <NavLink
                    to="/movies"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Movies
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/tv"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    TV Series
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/people"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    People
                  </NavLink>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
          <div className="order-2 sm:order-3 mt-4 mb-10 sm:my-0">
            <p className="">Hi max..</p>
          </div>
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

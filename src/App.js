import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import { SearchProvider } from "./Context/SearchContext";
import MovieDetails, { MovieDetailsLoader } from "./pages/MovieDetails";
import HomePage, { HomepageLoader } from "./pages/HomePage";
import SearchPage, { searchPageLoader } from "./pages/SearchPage";
import PeopleDetails, { PeopleDetailsLoader } from "./pages/PeopleDetails";
import TvDetails, { TvLoader } from "./pages/TvDetails";
import SeasonDetails, { SeasonLoader } from "./pages/SeasonDetails";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/Shared/PrivateRoute";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchList from "./pages/WatchList";
import TopRatedMovies, { TopRatedMoviesLoader } from "./pages/TopRatedMovies";
import TopRatedTv, { TopRatedTvLoader } from "./pages/TopRatedTv";
import Collection, { CollectionLoader } from "./pages/Collection";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainHeader />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: HomepageLoader,
        },
        { path: "/not-found", element: <NotFound /> },
        {
          path: "movie/:movieId",
          element: <MovieDetails />,
          loader: MovieDetailsLoader,
          errorElement: <NotFound />,
        },
        {
          path: "collection/:collectionId",
          element: <Collection />,
          loader: CollectionLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/movie/top-rated/:page",
          element: <TopRatedMovies />,
          loader: TopRatedMoviesLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/tv/:tvId",
          element: <TvDetails />,
          loader: TvLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/tv/top-rated/:page",
          element: <TopRatedTv />,
          loader: TopRatedTvLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/tv/:tvId/season/:seasonNumber/:seasonMax",
          element: <SeasonDetails />,
          loader: SeasonLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/person/:peopleId",
          element: <PeopleDetails />,
          loader: PeopleDetailsLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/search/:type/:query/:page",
          element: <SearchPage />,
          loader: searchPageLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/watch-list",
          element: <WatchList />,
        },
        {
          path: "/profile",
          element: <PrivateRoute />,
          children: [
            {
              index: true,
              element: <Profile />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <>
      <SearchProvider>
        <RouterProvider router={router}>
          <div className="App"></div>;
        </RouterProvider>
      </SearchProvider>

      <ToastContainer />
    </>
  );
}

export default App;

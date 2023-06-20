import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import MainMovie from "./pages/MainMovie";
import { SearchProvider } from "./Context/SearchContext";
import MovieDetails from "./pages/MovieDetails";
import TopRated from "./pages/TopRated";
import HomePage from "./pages/HomePage";
import MainTv from "./pages/MainTv";
import MainPeople from "./pages/MainPeople";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainHeader />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },

        {
          path: "/movies",
          element: <MainMovie />,
          loader: async () => {
            const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
            const options = {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTY5NWM1ZTJjZGUyNGE1MjM4NTRkNjZjMDI3M2E1YiIsInN1YiI6IjY0NzYwYWE5Njc0M2ZhMDExOTdhYmVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DV_trq_u9uGPRLQphE4xfz2cUlzZlO4DWrDeqEAlzGE",
              },
            };

            const response = await fetch(url, options);

            return response.json();
          },
        },
        {
          path: "movie/:movieId",
          element: <MovieDetails />,
          loader: async ({ params }) => {
            const url = `https://api.themoviedb.org/3/movie/${params.movieId}?&append_to_response=watch/providers,videos,credits,reviews,similar`;
            const options = {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTY5NWM1ZTJjZGUyNGE1MjM4NTRkNjZjMDI3M2E1YiIsInN1YiI6IjY0NzYwYWE5Njc0M2ZhMDExOTdhYmVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DV_trq_u9uGPRLQphE4xfz2cUlzZlO4DWrDeqEAlzGE",
              },
            };

            const response = await fetch(url, options);
            window.scrollTo(0, 0);
            return response.json();
          },
        },

        {
          path: "/tv",
          element: <MainTv />,
        },
        {
          path: "/people",
          element: <MainPeople />,
        },
      ],
    },
  ]);
  return (
    <SearchProvider>
      <RouterProvider router={router}>
        <div className="App"></div>;
      </RouterProvider>
    </SearchProvider>
  );
}

export default App;

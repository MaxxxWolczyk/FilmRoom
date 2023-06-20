const API_TOKEN = process.env.REACT_APP_API_KEY;

export const searchMovies = async (title, country = "pl", page) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&query=${title}&language=${country}&page=${page}`;
  // console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
};

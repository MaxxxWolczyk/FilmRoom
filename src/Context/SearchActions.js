export const searchAction = async (query, type = "multi", page) => {
  const url = `https://api.themoviedb.org/3/search/${type}?query=${query}&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTY5NWM1ZTJjZGUyNGE1MjM4NTRkNjZjMDI3M2E1YiIsInN1YiI6IjY0NzYwYWE5Njc0M2ZhMDExOTdhYmVlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DV_trq_u9uGPRLQphE4xfz2cUlzZlO4DWrDeqEAlzGE",
    },
  };
  const response = await fetch(url, options);
  return response;
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOVIES_PAGES":
      return {
        ...state,
        movies: [...state.movies, ...action.payload.movies],
        maxPages: action.payload.maxPages,
      };
    case "CLEAR_MOVIES_PAGE":
      return { ...state, movies: [], page: 1 };
    case "SET_INPUT":
      return {
        ...state,
        input: action.payload,
      };
    case "INCREASE_PAGE": {
      return { ...state, page: state.page++ };
    }
    case "SET_PAGE": {
      return { ...state, page: action.payload };
    }
    case "SET_LOADING_TRUE":
      return { ...state, loading: true };
    case "SET_LOADING_FALSE":
      return { ...state, loading: false };
  }
};

export default searchReducer;

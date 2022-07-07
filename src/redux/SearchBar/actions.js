
export const SEARCH = "search/SEARCH";
export const SET_RESULTS = "search/SET_RESULTS";
export const SET_ERROR = "search/SET_ERROR"

// search for keyword
export const search = (city) => {
  return {
    type: SEARCH,
    city: city,
  };
};

// set results from API
export const setResults = (results) => {
  console.log(results);
  return {
    type: SET_RESULTS,
    results: results,
  };
};

export const setError = (message) => {
  return {
    type: SET_ERROR,
    message: message
  }
}

// redux thunk function - function that returns a function
export const startSearch = (city) => {
  return (dispatch) => {
    dispatch(search(city));
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e74a209107bbfdfc7f5dc3726306eb25`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          dispatch(setError(data.message))
          return;
        }
        console.log(data);
        dispatch(setResults(data));
      });
  };
};

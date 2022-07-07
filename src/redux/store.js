// REDUX:
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { searchReducer } from "./SearchBar/reducers";
import { watchBoxReducer } from "./WatchBox/reducers";

const localCache = (store) => (next) => (action) => {
    next(action);
    const state = store.getState();
    localStorage.setItem("weather-box-redux", JSON.stringify(state));
};

const rootReducer = combineReducers({
    search: searchReducer,
    watchbox: watchBoxReducer
});

const defaultState = {
    search: undefined,
    watchbox: undefined
};

export const store = createStore(
    rootReducer,
    JSON.parse(localStorage.getItem("weather-box-redux")) || defaultState,
    composeWithDevTools(applyMiddleware(thunk, localCache))
);
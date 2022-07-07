import { SEARCH, SET_RESULTS, SET_ERROR } from "./actions"

const defaultState = {
    weather: null, // are setting our own array or use {} instead because data is an object?
    loading: false,
    searchTerm: '',
    errorMessage: ''
}

export const searchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_RESULTS:
            return {
                ...state,
                weather: action.results,
                loading: false,
            }
        case SEARCH: 
            return {
                ...state,
                searchTerm: action.text,
                loading: true,
                errorMessage: ''
        }
        case SET_ERROR: 
            return {
                ...state,
                errorMessage: action.message
        }
        default: 
            return state
    }
}
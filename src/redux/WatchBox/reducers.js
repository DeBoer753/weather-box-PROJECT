// REDUX:
import { ADD_WEATHER } from "./actions"
import { REMOVE_WEATHER } from "./actions"

const defaultState = {
    weather: [] 
}

export const watchBoxReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_WEATHER:
            return {
                ...state,
                weather: [action.data, ...state.weather] 
            }
        case REMOVE_WEATHER:
            return {
                ...state,
                weather: state.weather.filter(data => data.daily.dt !== action.dt)
            }
        default: 
            return state
    }
}
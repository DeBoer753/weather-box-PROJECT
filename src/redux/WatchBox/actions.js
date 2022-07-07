// REDUX:
export const ADD_WEATHER = "watchbox/ADD_WEATHER";
export const REMOVE_WEATHER = "watchbox/REMOVE_WEATHER";

export const addWeather = (day, weather) => {

    const data = {
        daily: day, 
        weekly: weather
    }
    return {
        type: ADD_WEATHER,
        data: data
    }
}

export const removeWeather = (dt) => {

    return {
        type: REMOVE_WEATHER,
        dt: dt
    }
}
// REACT:
import { useState, useEffect } from "react"

// REDUX: 
import { useSelector, useDispatch } from "react-redux"
import { addWeather, removeWeather } from "../../redux/WatchBox/actions"

// IMGS:
import sunny from '../../imgs/sunny.png'
import cloudy from '../../imgs/cloudy.png'
import rainy from '../../imgs/rainy.png'
import snowy from '../../imgs/snowy.png'
import unpackedSunny from '../../imgs/unpackedSunny.png'
import unpackedCloudy from '../../imgs/unpackedCloudy.png'
import unpackedRainy from '../../imgs/unpackedRainy.png'
import unpackedSnowy from '../../imgs/unpackedCloudy.png'

// CSS:
import styles from './Week.module.css'

// WEEK: 
export default function Week() {

    const dispatch = useDispatch()
    const [weekData, setWeekData] = useState(null)
    const weather = useSelector(state => state.search.weather)
    const watchBox = useSelector(state => state.watchbox.weather)

    const cityLat = weather.coord.lat
    const cityLon = weather.coord.lon

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=e74a209107bbfdfc7f5dc3726306eb25&units=imperial`)
            .then(res => res.json())
            .then(data => {
                setWeekData(data)
            })
    }, [cityLat, cityLon]);
    if (!weekData) return null

    const iconImg = (conditions) => {
        if (conditions === "Clear") {
            return sunny
        } else if (conditions === "Clouds") {
            return cloudy
        } else if (conditions === "Rain" || "Drizzle") {
            return rainy
        } else if (conditions === "Snow") {
            return snowy
        }
    }

    const unpackedImg = (conditions) => {
        if (conditions === "Clear") {
            return unpackedSunny
        } else if (conditions === "Clouds") {
            return unpackedCloudy
        } else if (conditions === "Rain" || "Drizzle") {
            return unpackedRainy
        } else if (conditions === "Snow") {
            return unpackedSnowy
        }
    }
    
    return (

        <div className={styles.main}>
            {
                weekData.daily.map((day, i) => {
                    const alreadyInWatchBox = watchBox.some(watchBoxDay => watchBoxDay.daily.dt === day.dt)

                    let newDate = new Date(0)
                    newDate.setMilliseconds((day.dt) * 1000)
                    let dayOfWeek = newDate.toLocaleString('default', { weekday: 'long' });
                    const cityTempHigh = Math.round(day.temp.max)
                    const cityTempLow = Math.round(day.temp.min)
                    const cityConditions = day.weather[0].main

                    return (
                        <div key={i} className={styles.week}>
                            <img src={unpackedImg(cityConditions)} alt="" />
                            <h4>{dayOfWeek}</h4>
                            <img src={iconImg(cityConditions)} alt="" />
                            <h4>{cityTempHigh}˚/ {cityTempLow}˚</h4>
                            {
                                alreadyInWatchBox ? (
                                    <button onClick={() => dispatch(removeWeather(day.dt))} type="submit">-</button>
                                ) : (
                                    <button onClick={() => dispatch(addWeather(day, weather))} type="submit">+</button>
                                )
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}
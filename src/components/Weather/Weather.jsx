// REACT:
import { useState } from 'react'

// REDUX: 
import { useSelector } from 'react-redux'

// COMPONENTS:
import Week from '../Week/Week'

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
import styles from './Weather.module.css'

// WEATHER:
export default function Weather() {

    const [showDetails, setShowDetails] = useState(false);

    const weather = useSelector(state => state.search.weather)

    if (!weather) return null // NOTE: or you could return <p>Unpack the details with Weather Box! Enter in a city name above to get started!</p> instead of null

    const cityName = weather.name
    const kelvinTemp = weather.main.temp
    const cityTemp = Math.round((kelvinTemp - 273.15) * 9 / 5 + 32) // NOTE: consider using imperial path so you don't have to use kelvin
    const cityConditions = weather.weather[0].main
    const cityWind = Math.round(weather.wind.speed)
    const cityHumidity = weather.main.humidity


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
            <div className={styles.weather}>
                <div className={styles.leftBox}>
                    <img src={unpackedImg(cityConditions)} alt="" />
                </div>
                <div className={styles.rightBox}>
                    <img src={iconImg(cityConditions)} alt="" />
                    <h1>{cityName}</h1>
                    <h2>{cityTemp}˚F</h2>
                    <hr />
                    <div className={styles.weatherDetails}>
                        <div>
                            <h3>{cityConditions}</h3>
                            <p>Conditions</p>
                        </div>
                        <div>
                            <h3>{cityWind}mph</h3>
                            <p>Wind Speed</p>
                        </div>
                        <div>
                            <h3>{cityHumidity}%</h3>
                            <p>Humidity</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1>{cityName} unpacked!</h1>
            <div>
                {
                    showDetails ? (
                        <div>
                            <Week />
                        </div>
                    ) : (
                        <h2 className={styles.viewWeek}>
                            <span style={{ cursor: 'pointer' }} onClick={() => setShowDetails(!showDetails)}>
                                Unpack the Week
                            </span>
                        </h2>
                    )
                }
            </div>
        </div>

    )
}

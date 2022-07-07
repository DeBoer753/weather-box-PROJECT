// REDUX: 
import { useSelector, useDispatch } from "react-redux"
import { removeWeather } from "../redux/WatchBox/actions"

// IMGS:
import sunny from '../imgs/sunny.png'
import cloudy from '../imgs/cloudy.png'
import rainy from '../imgs/rainy.png'
import snowy from '../imgs/snowy.png'

// CSS:
import styles from './WatchBox.module.css'

// WATCHBOX:
export default function WatchBox() {
  const dispatch = useDispatch()
  const weather = useSelector((state) => state.watchbox.weather)

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

  return (

    <div className={styles.main}>
      {
        weather.length ? (
          weather.map((data, i) => {
            
            const cityName = data.weekly.name
            const cityConditions = data.daily.weather[0].main
            const cityTemp = Math.round(data.daily.temp.day)
            const cityWind = Math.round(data.daily.wind_speed)
            const cityHumidity = data.daily.humidity
            let newDate = new Date(0)
            newDate.setMilliseconds((data.daily.dt) * 1000)
            let dayOfWeek = newDate.toLocaleString('default', { weekday: 'long' });

            return (

              <div key={i} className={styles.card}>
                <img className={styles.iconImg} src={iconImg(cityConditions)} alt="" />
                <h1>{cityName}</h1>
                <h2>{cityTemp}˚F</h2>
                <h3>{dayOfWeek}</h3>
                <div className={styles.weatherDetails}>
                  <hr />
                  <div>
                    <h4>{cityConditions}</h4>
                    <p>Conditions</p>
                  </div>
                  <div>
                    <h4>{cityWind}mph</h4>
                    <p>Wind Speed</p>
                  </div>
                  <div>
                    <h4>{cityHumidity}%</h4>
                    <p>Humidity</p>
                  </div>
                </div>
                <button onClick={() => dispatch(removeWeather(data.daily.dt))} type="submit">Remove</button>
              </div>

            )
          })

        ) : (
          <p className={styles.introBox}>You currently do not have any days saved. Update your Watchbox to scout out your special days planned ahead!</p>
        )
      }
    </div>
  )
}


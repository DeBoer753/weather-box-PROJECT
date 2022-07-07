// REDUX:
import { useSelector } from "react-redux"

// COMPONENTS: 
import Results from "../components/Results/Results"

// CSS:
import styles from './Home.module.css'

// HOME:
export default function Home() {

    const weather = useSelector((state) => state.search.weather)

    return (

        <div className={styles.main}>
            {
                weather ? (
                    <Results />
                ) : (
                    <p className={styles.introBox}>Unpack the details with Weather Box! Enter in a city name above to get started!</p>
                )
            }
        </div>

    )
}
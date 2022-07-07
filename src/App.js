// API KEY: e74a209107bbfdfc7f5dc3726306eb25

// REACT ROUTER: 
import {Link, Routes, Route } from 'react-router-dom'

// ROUTES:
import Home from './routes/Home';
import WatchBox from './routes/WatchBox';

// COMPONENTS:
import SearchBar from "./components/SearchBar/SearchBar";

// CSS:
import styles from "./App.module.css";

// IMGS:
import watchBoxIcon from './imgs/watchbox.png'
import homeIcon from './imgs/home.png'

// APP:
export default function App() {
  return (

    <div className={styles.App}>
      <nav>
        <div className={styles.iconBox}>
          <div className={styles.homeIcon} >
            <Link to="/"><img src={homeIcon} alt="" /></Link>
          </div>
          <div className={styles.watchBoxIcon}>
            <Link to="/Watchbox"><img src={watchBoxIcon} alt="" /></Link>
          </div>  
        </div>
          <SearchBar />
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Watchbox" element={<WatchBox />} />
      </Routes>
    </div>

  );
}
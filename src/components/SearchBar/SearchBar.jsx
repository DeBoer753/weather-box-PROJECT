// REACT:
import { useState } from "react"

// REACT ROUTER: 
import { useNavigate } from "react-router-dom";

// REDUX: 
import { useDispatch} from 'react-redux';
import { startSearch } from "../../redux/SearchBar/actions";
import { useSelector } from "react-redux";

// REACT ICONS:
import {BiSearch} from 'react-icons/bi'

// CSS:
import styles from './SearchBar.module.css'

// SEARCH BAR:
export default function SearchBar() {

    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('')
    const errorMessage = useSelector(state => state.search.errorMessage)

    let navigate = useNavigate()

    const submitHandler = (e) => {
        navigate('/')
        e.preventDefault()
        dispatch(startSearch(searchText))
    }

    return (

        <div> 
            <form onSubmit={submitHandler} action="">
                <label htmlFor="city"></label>
                <div className={styles.searchBar}>
                    <input id='city' type="text" placeholder={errorMessage ? errorMessage : "enter a city"} value={searchText} onChange={(e) => setSearchText(e.target.value)} /> 
                    <button type="submit"><BiSearch /></button> 
                </div>
            </form>
        </div>

    )
}
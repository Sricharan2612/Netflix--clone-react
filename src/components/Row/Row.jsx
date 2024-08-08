import React, { useEffect, useState } from 'react';
import './Row.css';
//Pages and Components
import Loader from '../Loader/Loader';
//Axios
import axios from '../../axios';
//React Router
import { Link, useNavigate } from 'react-router-dom';
//Redux
import { useDispatch } from 'react-redux';
import { ClickedMovie } from '../../actions/MovieAction';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original/';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // States
    const [movies, setMovies] = useState([]);
    const [clickedMovieDetails, setClickedMovieDetails] = useState(null);
    const [loader, setLoader] = useState(false);
    //useEffect
    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            const response = await axios.get(fetchUrl);
            setMovies(response.data.results);
            setLoader(false);
            return response;
        };
        fetchData();
    }, [fetchUrl]);
    // dispatch(ClickedMovie(clickedMovieDetails));
    const movieHandler = () => {
        if (clickedMovieDetails !== null) {
            navigate(`/details/${clickedMovieDetails.id}`);
            // console.log(clickedMovieDetails);
        }
        dispatch(ClickedMovie(clickedMovieDetails));
    };
    return (
        <div className='row'>
            {loader && <Loader />}
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img loading='lazy' onClick={() => { setClickedMovieDetails(movie); movieHandler(); }} className={`row_poster ${isLargeRow ? 'row_posterLarge' : ''}`} key={movie.id} src={`${baseUrl}${isLargeRow ? movie.poster_path
                            : movie.backdrop_path
                            }`} alt={movie.name} />
                    )
                ))}
            </div>
        </div >
    );
};

export default Row;

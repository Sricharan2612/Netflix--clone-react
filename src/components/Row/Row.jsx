import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import './Row.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ClickedMovie } from '../../actions/MovieAction';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
    const baseUrl = 'https://image.tmdb.org/t/p/original/';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // States
    const [movies, setMovies] = useState([]);
    const [clickedMovieDetails, setClickedMovieDetails] = useState(null);
    //useEffect
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(fetchUrl);
            setMovies(response.data.results);
            return response;
        };
        fetchData();
    }, [fetchUrl]);
    // dispatch(ClickedMovie(clickedMovieDetails));
    const movieHandler = () => {
        if (clickedMovieDetails !== null) {
            navigate(`/details/${clickedMovieDetails.id}`);
            console.log(clickedMovieDetails);
        }
        dispatch(ClickedMovie(clickedMovieDetails));
    };
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map((movie) => (

                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img onClick={() => { setClickedMovieDetails(movie); movieHandler(); }} className={`row_poster ${isLargeRow ? 'row_posterLarge' : ''}`} key={movie.id} src={`${baseUrl}${isLargeRow ? movie.poster_path
                            : movie.backdrop_path
                            }`} alt={movie.name} />
                    )
                ))}

            </div>
        </div >
    );
};

export default Row;

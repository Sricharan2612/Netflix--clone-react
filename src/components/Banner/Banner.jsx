import React, { useEffect, useState } from 'react';
import './Banner.css';
//Axios
import axios from '../../axios';
import requests from '../../requests';
//Icons
import { FaPlay } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { ClickedMovie } from '../../actions/MovieAction';
import { useNavigate } from 'react-router-dom';


const Banner = () => {
    //States
    const [movie, setMovie] = useState([]);
    const [clickedMovieDetails, setClickedMovieDetails] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //useEffect
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                response.data.results[Math.floor(Math.random() * response.data.results.length - 1)]
            );
            return response;
        };
        fetchData();
    }, []);
    //Function
    const truncate = (string, n) => {
        return string.length > n ? string.substring(0, n - 1) + '...' : string;
    };

    const movieHandler = () => {
        if (clickedMovieDetails !== null) {
            navigate(`/details/${clickedMovieDetails.id}`);
            // console.log(clickedMovieDetails);
        }
        dispatch(ClickedMovie(clickedMovieDetails));
    };

    return (
        <div className='banner' style={{
            backgroundSize: 'cover',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundPosition: 'center center'
        }}>
            <div className="banner_contents">
                <h1 className="banner_title">{movie.title || movie.name}</h1>
                <div className="banner_buttons">
                    <button onClick={() => { setClickedMovieDetails(movie); movieHandler(); }} className="banner_button button_center">
                        <FaPlay style={{ marginRight: '5px' }} />
                        Play
                    </button>
                    <button className="banner_button button_center">
                        <MdPlaylistAdd style={{ marginRight: '5px' }} fontSize={20} />
                        My List
                    </button>
                </div>
                <p className="banner_description">
                    {truncate(`${movie.overview}`, 130)}
                </p>
            </div>
            <div className="banner_fadeBottom"></div>
        </div>
    );
};

export default Banner;

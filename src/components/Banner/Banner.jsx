import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../../axios';
import requests from '../../requests';

const Banner = () => {
    //States
    const [movie, setMovie] = useState([]);
    console.log(movie);
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

    return (
        <div className='banner' style={{
            backgroundSize: 'cover',
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        }}>
            <div className="banner_contents">
                <h1 className="banner_title">{movie.title || movie.name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
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

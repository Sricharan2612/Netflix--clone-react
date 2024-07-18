import React, { useEffect, useState } from 'react';
import './DetailsPage.css';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { API_KEY } from '../../requests';

const DetailsPage = () => {
    const { movie } = useSelector(data => data.movie);
    //States
    const [video, setVideo] = useState(null);

    const type = movie.name ? 'tv' : 'movie';
    //useEffect
    useEffect(() => {
        const fetchVideo = async () => {
            const response = await axios.get(`/${type}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`);
            setVideo(response.data.results[0]);
        };
        fetchVideo();
    }, []);

    return (
        video && (
            <div className='detailspage' style={{
                // background: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            }}>
                <div className="details_body">
                    <iframe src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0"></iframe>
                    <div className="details_content">
                        <h1>{type === 'tv' ? movie.name : movie.title}</h1>
                        <div className="details_info">
                            <h3><span>Release Date:</span> {type === 'movie' ? movie.release_date : movie.first_air_date}</h3>
                            <h3><span>Rating:</span> {movie.vote_average.toFixed(1)}</h3>
                            <h3><span>Language:</span> {movie.original_language.toUpperCase()}</h3>
                        </div>
                        <h3>Overview:</h3>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div >
        )
    );
};

export default DetailsPage;

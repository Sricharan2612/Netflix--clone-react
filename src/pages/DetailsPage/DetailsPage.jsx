import React, { useEffect, useState } from 'react';
import './DetailsPage.css';
import axios from '../../axios';
import { useSelector } from 'react-redux';
import { API_KEY } from '../../requests';
//React icons
import { TbMessageDots } from "react-icons/tb";

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
                    <div className="video">
                        <iframe src={`https://www.youtube.com/embed/${video.key}`} frameBorder="0" align='center'></iframe>
                        <div className="video_fadeBottom"></div>
                    </div>
                    <div className="details_content">
                        <div className="movie_info">
                            <h1>{type === 'tv' ? movie.name : movie.title}</h1>
                            <h3 className='movie_match_info'>
                                <span>96% Match</span> 2017 3 Seasons
                                <TbMessageDots style={{ marginLeft: '10px' }} />
                            </h3>
                            <h4>language, violence, substances, tobacco use, adult, thriller</h4>
                            <h3>Overview:</h3>
                            <p>{movie.overview}</p>
                        </div>
                        <div className="details_info">
                            <h3><span>Cast:</span> Wanger Moura, Pedro Pascal, Boyd Holbrook, more</h3>
                            <h3><span>Genres:</span> Tv Dramas, Tv Action & Adventure, Crime Tv Shows</h3>
                            <h3><span>Release Date:</span> {type === 'movie' ? movie.release_date : movie.first_air_date}</h3>
                            <h3><span>Rating:</span> {movie.vote_average.toFixed(1)}</h3>
                            <h3><span>Language:</span> {movie.original_language.toUpperCase()}</h3>
                        </div>

                    </div>
                </div>
            </div >
        )
    );
};

export default DetailsPage;

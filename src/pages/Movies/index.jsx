import React from 'react';
import './styles/movies.css'
import Movie from '../../components/Movie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Index() {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [fetchSuccess, setFetchSuccess] = useState(false);
    useEffect(
        function () {
            if (!fetchSuccess) {
                const options = {
                    url: 'https://movies-dev.herokuapp.com/api/movies/',
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    method: "GET"
                }
                axios(options)
                    .then(function (response) {
                        const { status, message, data } = response.data;
                        console.log({ status, message, data });
                        if (status !== 200) {
                            if(status === 404) {
                                alert(message);
                                return;
                            }
                            alert(data);
                            return;
                        }
                        alert(message);
                        setMovies(data);
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert("an error occurred on the server");
                        return;

                    })
                    setFetchSuccess(true);
            }
        },
        []
    )
    const moviesToDisplay = movies.map(function (movie) {
        return <Movie movie={movie} key={movie._id} />
    })
    return (
        <>
            <div className='movie-container'>
                <div className='movie-search-area'>
                    <input className="search-input" placeholder='enter-movie-slug-here' />
                    <input className="search-button" alt='search' />
                </div>
                {
                    movies.length > 0 ?
                        <div className='movie-items'>
                            {moviesToDisplay}
                        </div> :
                        <div className='movie-none'>
                            <p >No movie to display</p>
                            <button
                                className='movies-create'
                                onClick={() => { navigate('/new') }}
                            >
                                Create a movie
                            </button>
                        </div>
                }

            </div>
        </>
    )
}

export default Index;
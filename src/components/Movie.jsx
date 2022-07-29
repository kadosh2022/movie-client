import { useNavigate } from 'react-router-dom';
import './styles/movie.css';

function Movie({ movie, key }) {
    const navigate = useNavigate();

    function viewMovie() {
        navigate(`/movie/${movie.slug}`)
    }
    return (
        <li key={key} className='movie-item' onClick={viewMovie}>
            <div className="movie-rating">
            <img className='movie-img' src={movie.photo} width='100px' alt='movie_img' />
                <p>
                    {movie.rating}
                </p>
            </div>
            <h3 className='movie-title'>{movie.name}</h3>
            <p className="movie-genre">{movie.genre}</p>
        </li>
    )
}

export default Movie;


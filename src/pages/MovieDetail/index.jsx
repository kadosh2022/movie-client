import {useState, useEffect} from 'react';
import './styles/moviedetail.css';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';


function MovieDetail() {
    const {slug} = useParams();
    const navigate = useNavigate();
    const [movieDetail, setMovieDetail] = useState({});

    useEffect(
        function() {
            const options = {
                url: `https://movies-dev.herokuapp.com/api/movies/${slug}`,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                method: "GET"
            }
            axios(options)
                .then(function(response) {
                    const {status, message, data} = response.data;
                    console.log({ status, message, data});
                    if (status !== 200) {
                        if(status === 404) {
                            alert(message);
                            return;
                        }
                        alert(data);
                        return;
                    }
                    setMovieDetail(data);
                })
                .catch(function(error) {
                    console.log(error);
                    alert("an error occurred on the server");
                    return;
                })
            },
        [slug]
    )
    return (
        <>
            <div className='main'>
                <div className="movie-frame">
                    <div className="frame-img">
                        <img src={movieDetail.photo} alt=""/>
                        <button className="frame-btn">view trailer</button>
                        <div className="frame-genre">{movieDetail.genre}</div>
                        <p className="frame-title">{movieDetail.name}</p>
                    </div>
                </div>
                <div className="movie-detail">
                    <div className="detail-info">
                        <p className='title'>{movieDetail.name}</p>
                        <p className='rating'>rating:  {movieDetail.rating}/5</p>
                        <p className='description'>{movieDetail.description}</p>
                        <p className='field1'>release date</p>
                        <p className='field2'>ticket price</p>
                        <p className='field3'>genre</p>
                        <p className='field4'>comments</p>
                        <p className='value1'>{movieDetail.releaseDate}</p>
                        <p className='value2'>N{movieDetail.ticketPrice}</p>
                        <p className='value3'>{movieDetail.genre?.toString()}</p>
                        <p className='value4'>{movieDetail.comments?.length}</p>
                        <button className='comments' onClick={()=> navigate('comment')}>post comments
                            <div className='comments-arrow'>
                                <div className='arrow-right'></div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/newmovie.css';
import axios from 'axios';

function NewMovie() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [ticketPrice, setTicketPrice] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState(0);
    const [photo, setPhoto] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false)


    function handlePhotoChange(photoObj) {
        // const [photoToUpload] = event.target.files;
        console.log({ photoObj });
        console.log('here');
        alert('please wait for image upload confirmation before submitting form');

        const formData = new FormData();
        formData.append('file', photoObj);
        formData.append('upload_preset', 'movies-upload');

        const img_options = {
            url: 'https://api.cloudinary.com/v1_1/dbic36axe/image/upload',
            method: 'POST',
            data: formData
        }

        axios(img_options)
            .then(function (response) {
                const { secure_url } = response.data
                if (!secure_url) {
                    setBtnDisabled(false)
                    alert('unable the set image');
                    return;
                }
                alert('successfully uploaded imaged')
                setPhoto(secure_url);
            })
            .catch(function (error) {
                console.log(error);
                setBtnDisabled(true)
                alert('error uploading file,  please try again');
                return;
            })

    }

    function createMovie(event) {
        event.preventDefault();
        // if (!photo.trim()) {
        //     alert("image is required")
        //     return;
        // }
        if (!name.trim() || !description.trim() || !releaseDate.trim() || !ticketPrice.trim() || !genre.trim() || !rating) {
            alert('Please fill out all fields');
            return;
        }

        setBtnDisabled(true)
        
            console.log({photo})

        const payload = {
            name,
            description,
            releaseDate,
            ticketPrice,
            genre,
            rating,
            photo
        };
        const liveurl = `https://movies-dev.herokuapp.com/api/movies/`;

        const options = {
            url: liveurl,
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            data: payload
        }

        axios(options)
            .then(function (response) {
                const { status, message, data } = response.data;
                console.log({ status, message, data });
                if (status !== 201) {
                    alert(data);
                    return;
                }
                // else navigate to all movies page
                setName('');
                setDescription('');
                setReleaseDate('');
                setTicketPrice('');
                setGenre('');
                alert(message);
                navigate('/movies');
            })
            .catch(function (error) {
                console.log(error);
                alert("an error occurred on the server");
                return;
            })
        setBtnDisabled(false)
    }
    return <>
        <div className='newmovie-container'>
            <p className='newmovie-header'>create a movie</p>
            <form className='newmovie-body' onSubmit={createMovie}>
                <input
                    className='name'
                    placeholder='name'
                    onChange={(e) => { setName(e.target.value) }}
                    value={name}
                />
                <input
                    className='description'
                    placeholder='description'
                    onChange={(e) => { setDescription(e.target.value) }}
                    value={description}
                />
                <input
                    className='releaseDate'
                    placeholder='release date'
                    onChange={(e) => { setReleaseDate(e.target.value) }}
                    value={releaseDate}
                />
                <input
                    className='ticketPrice'
                    placeholder='ticket price'
                    onChange={(e) => { setTicketPrice(e.target.value) }}
                    value={ticketPrice}
                />
                <input
                    className='rating'
                    placeholder='rating'
                    onChange={(e) => { setRating(e.target.value) }}
                />
                <input
                    className='genre'
                    placeholder='genre'
                    onChange={(e) => { setGenre(e.target.value) }}
                    value={genre}
                />
                <input
                    type='file'
                    className='photo'
                    onChange={(e) => { handlePhotoChange(e.target.files[0]) }}
                />
                <button className='newmovie-btn' disabled={btnDisabled}>create</button>
            </form>
        </div>
    </>
}

export default NewMovie;
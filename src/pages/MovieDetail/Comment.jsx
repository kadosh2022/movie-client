import { useState } from 'react'
import './styles/commentmodal.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Comment() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [comment, setComment] = useState('');

    function addCommentToPost(event) {
        event.preventDefault();
        if (!comment.trim()) {
            alert('please provide a comment');
            return;
        }
        const newComment = {
            comment,
            slug
        }
        const liveurl = `https://movies-dev.herokuapp.com/api/users/comment`;
        const options = {
            url: liveurl,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            data: newComment
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
            setComment('');
            alert(message);
            navigate(`/movie/${slug}`)
        })
        .catch(function (error) {
            console.log(error);
            alert("an error occurred on the server");
            return;
        })
    }
    return (
        <>
            <div className="comment-modal">
                <div className="comment-container">
                    <p className="comment-header">post comment</p>
                    <div className="comment-close">
                        <p className="comment-close-icon"></p>
                    </div>
                    <form className="comment-body" onSubmit={addCommentToPost}>
                        <input 
                            className='comment-input-name' 
                            placeholder='Name' 
                        />
                        <textarea 
                            className="comment-input" 
                            type='textarea' 
                            onChange={(e) => {setComment(e.target.value)}}
                        ></textarea>
                        <button className="comment-btn">submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Comment
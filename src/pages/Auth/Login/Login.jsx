import React from 'react';
import Form from '../../../components/Form';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import '../Register/styles/register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Login({setIsLoggedIn}) {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);

    function authenticate(event) {
        event.preventDefault();
        if (!email.match(/\S+@\S+\.\S+/)) {
            alert('Invalid email');
            return;
        }
        if (!password || !email) {
            alert('please provide all fields');
            return;
        }
        setBtnDisabled(true);

        const payload = { email, password };
        const liveurl = `https://movies-dev.herokuapp.com/api/users/auth`;
        axios.post(liveurl, payload)
            .then(function (response) {
                const { status, message, data } = response.data;
                console.log({ status, message, data });
                if (status !== 200) {
                    setBtnDisabled(false);
                    alert(data);
                    return;
                }
                // else set the token in local storage
                setEmail('');
                setPassword('');
                alert(message);
                localStorage.setItem("token", data);
                setIsLoggedIn(true);
                navigate('/movies');
            })
            .catch(function (error) {
                console.log(error);
                setBtnDisabled(false);
                alert("an error occurred on the server");
                return;
            });

        setBtnDisabled(false);

    }
    return (
        <>
            <p className="header">login</p>
            <Form onSubmit={authenticate}>
                <FormInput
                    placeholder='Email'
                    onChange={(e) => { setEmail(e.target.value) }}
                    value={email}
                />
                <FormInput
                    placeholder='Password'
                    type='password'
                    onChange={(e) => { setPassword(e.target.value) }}
                    value={password}
                />
                <FormButton
                    text='Login'
                    isDisabled={btnDisabled}
                />
            </Form>
            <p className="footer" onClick={() => { navigate('/accounts/register') }}>Don't have an account?</p>
        </>
    )
}

export default Login;

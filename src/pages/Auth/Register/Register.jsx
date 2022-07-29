import React from 'react';
import Form from '../../../components/Form';
import FormInput from '../../../components/FormInput';
import FormButton from '../../../components/FormButton';
import '../Register/styles/register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false)

    function register(event) {
        event.preventDefault();
        console.log({ email, password, username })
        if (!email.match(/\S+@\S+\.\S+/)) {
            alert('Invalid email');
            return;
        }

        if (!password.trim() || !email.trim() || !username.trim()) {
            alert('please provide all fields');
            return;
        }
        setBtnDisabled(true);
        const payload = { email, password, username };
        const liveurl = `https://movies-dev.herokuapp.com/api/users/`;

        axios.post(liveurl, payload)
            .then(function (response) {
                const { status, message, data } = response.data;
                console.log({ status, message, data });
                if (status !== 201) {
                    alert(data);
                    setBtnDisabled(false);
                    return;
                }
                // else navigate to login page
                setEmail('');
                setPassword('');
                setUsername('');
                alert(message);
                navigate('/accounts/login');
            })
            .catch(function (error) {
                console.log(error);
                alert("an error occurred on the server");
                setBtnDisabled(false);
                return;
            });

        setBtnDisabled(false)

    }
    return (
        <>
            <p className="header">register</p>
            <Form onSubmit={register}>
                <FormInput
                    placeholder='Username '
                    onChange={(e) => { setUsername(e.target.value) }}
                    value={username}
                />
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
                <FormButton text='Register' isDisabled={btnDisabled} />
            </Form>
            <p className="footer" onClick={() => { navigate('/accounts/login') }}>Already have an account?</p>
        </>
    )
}

export default Register

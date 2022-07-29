import './styles/auth.css';
import {Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function Auth() {
    const navigate = useNavigate();
    // useEffect(
    //     function() {
    //         navigate('login');
    //     },
    //     []
    // )
    return <>
        <div className="auth-container">
            <Outlet />
        </div>
    </>
}

export default Auth;
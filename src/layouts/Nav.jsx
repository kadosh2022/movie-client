// import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/nav.css';

function Nav( {isLoggedIn, onLogout, setIsLoggedIn}) {

    return <>
        <nav className='myNav'>
            <ul className='left'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/movies'>all movies</Link>
                </li>
                <li>
                    <Link to='/new'>create movie</Link>
                </li>
            </ul>

            <h3 className="logo">
                moyo <span>-</span>  films
            </h3>

            <ul className='right'>
                {isLoggedIn ? <li>
                        <p
                            onClick={onLogout}
                            className='logout'
                        >
                            Logout
                        </p>
                    </li>
                    :
                    <>
                        <li>
                            <Link className="login" to='/accounts/login'>login</Link>
                        </li>
                        <li>
                            <Link className="register" to='/accounts/register'>register</Link>
                        </li>
                    </>

                }

            </ul>
        </nav>
    </>
}

export default Nav;
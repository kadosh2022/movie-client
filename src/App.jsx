import Nav from './layouts/Nav';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Auth from './pages/Auth';
import Register from './pages/Auth/Register/Register';
import Login from './pages/Auth/Login/Login';
import MovieDetail from './pages/MovieDetail';
import Comment from './pages/MovieDetail/Comment';
import NewMovie from './pages/NewMovie';
import { useState, useEffect } from 'react'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });

  useEffect(
    function() {
      setIsLoggedIn(localStorage.getItem('token') ? true : false);
    },
    []
  )

  console.log({isLoggedIn})

  function logout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return (
    <div>
      <Nav isLoggedIn={isLoggedIn} onLogout={logout} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/accounts" element={<Auth />} >
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        </Route>
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie/:slug" element={<MovieDetail />} />
        <Route path="/new" element={isLoggedIn ? <NewMovie /> : <Navigate to='/accounts/login' />} />
        <Route path="/movie/:slug/comment" element={isLoggedIn ? <Comment /> : <Navigate to='/accounts/login' />} />
      </Routes>
    </div>
  );
}

export default App;

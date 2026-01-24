import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "./Navbar.css";

import Profile from '../pages/Profile';
import Skeleton from '../pages/Skeleton';
// import Game from '../pages/Game';
import Maze from './Maze';

const Navbar = () => {
    const { userId, handleLogin, handleLogout } = useContext(UserContext);
    return (
        <nav className='Navbar-container'>
            {/* <div className='Navbar-title'>Little Log</div> */}
            <div className='Navbar-links'>
                {userId ? (
                    <button
                    onClick={() => {
                        googleLogout();
                        handleLogout();
                    }}
                    >
                    Logout
                    </button>
                ) : (
                    <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                )}
                <Link to="/"> Home </Link>
                {userId && (
                    // <Link to={`/profile`} className="NavBar-link">
                    <Link to='/profile'>
                    Profile
                    </Link>
                )}

                <Link to="/game"> Game </Link>
            </div>
            {/* <div className='Navbar-auth'>
                {userId ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </div> */}

        </nav>

    );
};
export default Navbar;

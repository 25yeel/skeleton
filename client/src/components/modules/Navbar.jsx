import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

import "./Navbar.css";

import Profile from '../pages/Profile';
import Skeleton from '../pages/Skeleton';
import Maze from './Maze';

const Navbar = (props) => {
    return (
        <nav className='Navbar-container'>
            <div className='Navbar-title'>Little Log</div>
            <div className='Navbar-links'>
                <Link to="/">Home</Link>
                {/* <Link to="/profile">Profile</Link> */}
                {props.userId && (
                    <Link to={`/profile/${props.userId}`} className="NavBar-link">
                        Profile
                    </Link>
                )}
                <Link to="/maze/">Maze</Link>
            </div>
            <div className='Navbar-auth'>
                {userId ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </div>
        </nav>

    );
};
export default Navbar;

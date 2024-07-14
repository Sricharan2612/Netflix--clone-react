import React, { useEffect, useState } from 'react';
//Components
import './Navbar.css';
//Images
import logo from '../../assets/logo.png';
import avatar from '../../assets/netflix-avatar.png';
import { Link } from 'react-router-dom';


const Navbar = () => {
    //States
    const [show, handleShow] = useState(false);
    // Functions
    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    };

    //useEffect
    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar);
        return () => window.removeEventListener('scroll', transitionNavbar);
    }, []);

    return (
        <div className={`navbar ${show ? 'nav_black' : ''}`} >
            <div className="nav_contents">
                <Link to='/'>
                    <img className='nav_logo' src={logo} alt="logo" />
                </Link>
                <Link to='/profile'>
                    <img className='nav_avatar' src={avatar} alt="avatar" />
                </Link>
            </div>
        </div >
    );
};

export default Navbar;

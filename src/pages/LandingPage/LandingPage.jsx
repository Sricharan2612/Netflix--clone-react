import React, { useState } from 'react';
import './LandingPage.css';
import logo from '../../assets/logo.png';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import { Link } from 'react-router-dom';


function LandingPage() {
    // const [signIn, setSignIn] = useState(false);
    return (
        <div className='LandingPage'>
            <div className="LandingPage_background">
                <Link to='/'>
                    <img src={logo} alt="logo" className="LandingPage_logo" />
                </Link>
                <Link to='/signup'>
                    <button className="LandingPage_btn">Sign In</button>
                </Link>
            </div>
            <div className="LandingPage_gradient"></div>
            <div className="LandingPage_body">
                <h1>Unlimited films, Tv programmmes and more.</h1>
                <h2>Watch anywhere. Cancel at any time</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                <div className="LandingPage_input">
                    <form>
                        <input type="email" placeholder='Email Address' />
                        <Link to='/signup'>
                            <button className='LandingPage_getStarted'>Get Started</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default LandingPage;

import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import SignIn from '../SignIn/SignIn';


function Login() {
    const [signIn, setSignIn] = useState(false);
    return (
        <div className='login'>
            <div className="login_background">
                <img src={logo} alt="logo" className="login_logo" />
                <button onClick={() => setSignIn(true)} className="login_btn">Sign In</button>
            </div>
            <div className="login_gradient"></div>
            <div className="login_body">
                {signIn ? (
                    <SignIn />
                ) : (
                    <>
                        <h1>Unlimited films, Tv programmmes and more.</h1>
                        <h2>Watch anywhere. Cancel at any time</h2>
                        <p>Ready to watch? Enter your email to create or restart your membership.</p>
                        <div className="login_input">
                            <form>
                                <input type="email" placeholder='Email Address' />
                                <button onClick={() => setSignIn(true)} className='login_getStarted'>Get Started</button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Login;

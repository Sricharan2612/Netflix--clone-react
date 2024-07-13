import React from 'react';
import './SignIn.css';


const SignIn = () => {
    return (
        <div className='signin'>
            <form>
                <h1>Sign In</h1>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <button type='submit'>Sign In</button>

                <h4>
                    <span className='signin_gray'>New to Netflix?</span>
                    <span className='signin_link'>Sign Up now</span>
                </h4>
            </form>
        </div>
    );
};

export default SignIn;

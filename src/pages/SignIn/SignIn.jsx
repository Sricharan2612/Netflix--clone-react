import React, { useRef } from 'react';
import './SignIn.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';


const SignIn = () => {
    const name = 'Sree';
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value, name)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                // return updateProfile(user, { displayName: name });
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                console.log(userCredential);
            })
            .catch((error) => {
                alert(error.message);
            });
    };
    return (
        <div className='signin'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button onClick={signIn} type='submit'>Sign In</button>

                <h4>
                    <span className='signin_gray'>New to Netflix?</span>
                    <span onClick={register} className='signin_link'>Sign Up now</span>
                </h4>
            </form>
        </div>
    );
};

export default SignIn;

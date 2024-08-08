import React, { useRef, useState } from 'react';
import './SignIn.css';
//Pages and Components
import Loader from '../../components/Loader/Loader';
//images
import logo from '../../assets/logo.png';
//Firebase
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignIn = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    //useRef
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    //Handlers
    const signIn = (e) => {
        e.preventDefault();
        setLoader(true);
        signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                setLoader(false);
                toast.success("Login Sucessfull ");
                navigate('/homepage');
            })
            .catch((error) => {
                setLoader(false);
                toast.error(error.message.split('/')[1].split('-').join(' ').split(')')[0]);
            });
    };


    return (
        <div className='signin'>
            {loader && <Loader />}
            <Link to='/'>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </Link>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button onClick={signIn} type='submit'>Sign In</button>
                <h4>
                    <span className='signin_gray'>New to Netflix?</span>
                    <Link to='/signup' style={{ textDecoration: 'none' }}>
                        <span className='signin_link'>Sign up now</span>
                    </Link>
                </h4>
            </form>
            <div className="shade_layer"></div>
        </div>

    );
};

export default SignIn;

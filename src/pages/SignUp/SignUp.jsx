import React, { useRef, useState } from 'react';
import './SignUp.css';
//Pages and Components
import Loader from '../../components/Loader/Loader';
//images
import logo from '../../assets/logo.png';
//Firebase
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    //States
    const [userName, setUserName] = useState('');
    const [loader, setLoader] = useState(false);
    //useRef
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    //Handlers
    const register = (e) => {
        e.preventDefault();
        setLoader(true);
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoader(false);
                navigate('/homepage');
                return updateProfile(user, { displayName: userName });
            })
            .catch((error) => {
                setLoader(false);
                toast.error(error.message.split('/')[1].split('-').join(' ').split(')')[0]);
            });

    };
    console.log(userName);
    return (
        <div className='signup'>
            {loader && <Loader />}
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <ToastContainer />
            <form>
                <h1>Sign Up</h1>
                <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder='Name' />
                <input ref={emailRef} type="email" placeholder='Email' />
                <input ref={passwordRef} type="password" placeholder='Password' />
                <button onClick={register} type='submit'>Sign Up</button>
                <h4>
                    <span className='signup_gray'>Already Existing member?</span>
                    <Link to='/signin'>
                        <span className='signup_link'>Sign In</span>
                    </Link>
                </h4>
            </form>
            <div className="shade_layer"></div>
        </div >
    );
};

export default SignUp;

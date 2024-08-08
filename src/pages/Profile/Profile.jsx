import React from 'react';
import './Profile.css';
import Navbar from '../../components/Navbar/Navbar';
import avatar from '../../assets/netflix-avatar.png';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Plans from '../Plans/Plans';

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useSelector(data => data.user);
    const singOutUser = async () => {
        await signOut(auth);
        navigate('/');
    };
    return (
        user && (
            <div className='profile'>
                <Navbar />
                <div className="profile_body">
                    <h1>Edit Profile</h1>
                    <div className="profile_info">
                        <img src={avatar} alt="profile" />
                        <div className="profile_details">
                            <h2>{user.email}</h2>
                            <div className="profile_plans">
                                <h3>Plans</h3>
                                <Plans />
                                <button onClick={() => singOutUser()} className='profile_signOut'>Sign Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;

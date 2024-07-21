import React from 'react';
import './Profile.css';
import Navbar from '../../components/Navbar/Navbar';
import avatar from '../../assets/netflix-avatar.png';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import Plans from '../Plans/Plans';

const Profile = () => {
    const { user } = useSelector(data => data.user);
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
                                <Link to='/'>
                                    <button onClick={() => signOut(auth)} className='profile_signOut'>Sign Out</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Profile;

// LogoutButton.jsx

//review this file later
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseauth.js'; // Ensure this path correctly points to your Firebase auth configuration

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Redirect user to login page after successful logout
            console.log('User logged out successfully');
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;

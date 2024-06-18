import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuthProvider } from '../../firebaseauth.js';
import GoogleButton from 'react-google-button';
import { signInWithPopup, onAuthStateChanged, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { getFirestore, doc, runTransaction } from 'firebase/firestore';
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Stack, Button, Input } from "@mui/joy";
import './Login.scss';

const Loginpage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                navigate('/');
            }
        });
        return unsubscribe;
    }, [navigate]);

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email, window.location.href)
                .then(() => {
                    window.localStorage.removeItem('emailForSignIn');
                    navigate('/');
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    }, [navigate]);

    const handleSignWithGoogle = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleAuthProvider);
            // Handle the result as needed
            console.log(result.user);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMagicLink = async () => {
        setLoading(true);
        setError(null);
        setMessage('');
        try {
            const actionCodeSettings = {
                url: 'https://www.pineapply.ai/landing', // Replace with your desired URL
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            setMessage('Magic link sent! Please check your email.');
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <>
            {/* UI components */}
            <Stack sx={{ minHeight: '100vh' }}>
                <Navbar />
                <div className="login-card">
                    <GoogleButton onClick={handleSignWithGoogle} disabled={loading} />
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={loading}
                        sx={{ marginTop: '16px' }}
                    />
                    <Button onClick={handleSendMagicLink} disabled={loading} sx={{ marginTop: '16px' }}>
                        Send Magic Link
                    </Button>
                    <div className="message-container">
                        {message && <p className="message">{message}</p>}
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </Stack>
            <Footer />
        </>
    );
};

export default Loginpage;
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Stack, Typography, Box, Input, Button } from '@mui/joy';
import Typewriter from 'typewriter-effect';
import './Home.css';
import CardComponent from '../../components/Card/CardComponent.jsx';
import HomeHero from '../../components/HomeHero/HomeHero.jsx';

import { storage, db } from '../../firebaseauth.js';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const Home = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [bannerUrl, setBannerUrl] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchImageUrls = async () => {
            const storage = getStorage();
            const urls = [];
            try {
                for (let i = 1; i <= 4; i++) {
                    const fileRef = ref(storage, `${i}card.jpg`);
                    const url = await getDownloadURL(fileRef);
                    urls.push(url);
                }
                setImageUrls(urls);
            } catch (error) {
                console.error('Error fetching image URLs:', error);
            }
        };
        const fetchBannerUrl = async () => {
            const storage = getStorage();
            const bannerRef = ref(storage, 'robot_yellow.png');
            try {
                const url = await getDownloadURL(bannerRef);
                setBannerUrl(url);
            } catch (error) {
                console.error('Error fetching banner URL:', error);
            }
        };
        fetchImageUrls();
        fetchBannerUrl();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const waitingListRef = collection(db, 'waitingList');
            await addDoc(waitingListRef, {
                email,
                roles,
                timestamp: new Date(),
            });
            setEmail('');
            setRoles('');
            setSubmitted(true);
        } catch (error) {
            console.error('Error saving email to waiting list:', error);
        }
    };
    return (
        <>
            <Stack sx={{ minHeight: '100vh' }}>
                <Navbar />

                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '2rem',
                }}>
                    <Typography variant="h3" color='appTheme' component="h1" gutterBottom sx={{ fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }, marginBottom: '0rem', width: '100%', padding: '1rem', boxSizing: 'border-box' }}>
                        Your personal A.I recruiter
                    </Typography>
                    <Box sx={{ minHeight: '4rem' }}>
                        <Typography variant="h2" component="h1" gutterBottom>
                            <Typewriter
                                options={{
                                    strings: [
                                        'Automatically fill out job form applications',
                                        'Increase your chances of landing a job by 6x',
                                        'Streamline your Dubai Job search'
                                    ],
                                    autoStart: true,
                                    loop: true,
                                    delay: 40
                                }}
                            />
                        </Typography>
                    </Box>
                    {!submitted ? (
                        <Box sx={{ marginTop: '2rem', width: '100%', maxWidth: '600px' }}>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    fullWidth
                                    required
                                    sx={{ marginBottom: '1rem' }}
                                />
                                <Input
                                    placeholder="List 3-5 job titles that you want to apply to, seperated by commas"
                                    multiline
                                    minRows={4}
                                    value={roles}
                                    onChange={(e) => setRoles(e.target.value)}
                                    fullWidth
                                    required
                                    sx={{ marginBottom: '1rem' }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{
                                        backgroundColor: '#6200ee',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.2)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#5200cc',
                                            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.3)',
                                        },
                                    }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    ) : (
                        <Box sx={{ marginTop: '2rem', width: '100%', maxWidth: '600px' }}>
                            <Typography variant="h4" component="p">
                                Thank you for submitting!
                            </Typography>
                        </Box>
                    )}

                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            marginTop: '2rem',
                            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h3"
                            sx={{
                                marginTop: '3rem',
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: 'A',
                            }}
                        >
                            Auto-applier currently in Beta, accepting 1000 users only.
                        </Typography>
                    </Typography>
                </Box>

                <Box sx={{ padding: { xs: '2rem', md: '4rem' } }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        gutterBottom
                        align="center"
                        sx={{
                            fontSize: {xs: '2.5rem', sm: '3rem', md: '4rem'},
                            padding: '1rem',
                            width: '100%',
                            marginBottom: '2rem',
                        }}
                        color="appTheme"
                    >
                        <b>How it works</b>
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'center',
                            alignItems: 'stretch',
                            gap: { xs: 4, sm: 6 },
                        }}
                    >
                        <Box
                            sx={{
                                flex: '1',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: 'purple',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <CardComponent
                                sx={{
                                    height: '100%',
                                }}
                                title="Upload your CV"
                                description="Upload your CV and let Pineapply handle the rest."
                            />
                        </Box>
                        <Box
                            sx={{
                                flex: '1',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: 'purple',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <CardComponent
                                sx={{
                                    height: '100%',
                                }}
                                title="Automatically find and apply to relevant jobs"
                                description="Pineapply will scan all local job sites and automatically apply to relevant jobs."
                            />
                        </Box>
                        <Box
                            sx={{
                                flex: '1',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                backgroundColor: 'purple',
                                borderRadius: '8px',
                                textAlign: 'center',
                            }}
                        >
                            <CardComponent
                                sx={{
                                    height: '100%',
                                }}
                                title="Sit back and relax"
                                description="Pineapply will keep applying to roles until you get a job! View the dashboard for updates."
                            />
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            textAlign: 'center',
                            marginTop: '2rem',
                        }}
                    >
                    </Box>
                </Box>

                <Box sx={{
                    backgroundColor: '#f1f963',
                    padding: { xs: '2rem', md: '4rem' },
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: '#F5DC34',
                        zIndex: 1,
                    },
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1200px',
                        margin: '0 auto',
                    }}>
                        <HomeHero></HomeHero>
                    </Box>
                </Box>

                <Box
                    component="img"
                    src={bannerUrl}
                    alt="Banner"
                    sx={{
                        width: '100%',
                        maxWidth: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
                <Footer />
            </Stack>
        </>
    );
};

export default Home;
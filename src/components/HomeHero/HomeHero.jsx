import React from 'react';
import './HomeHero.scss';
import { Stack, Typography, Box } from '@mui/joy';

const HomeHero = () => {
    return (
        <div className="features-container">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                <Typography
                    variant="h3"
                    color="appTheme"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                        marginBottom: '1rem',
                        padding: '1rem',
                        boxSizing: 'border-box',
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    Features
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        width: '100%',
                        gap: '2rem',
                    }}
                >
                    <Box sx={{ flex: 1, textAlign: 'center', maxWidth: { xs: '100%', md: '300px' } }}>
                        <Typography variant="h4" gutterBottom sx={{ color: 'appTheme' }}>
                            <b>One click to automatically apply to all relevant jobs!</b>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'appTheme' }}>
                            With the click of a button, you can apply to 100s or 1000s of job applications that are relevant for you.
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', maxWidth: { xs: '100%', md: '300px' } }}>
                        <Typography variant="h4" gutterBottom sx={{ color: 'appTheme' }}>
                            <b>Never miss a job posting again!</b>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'appTheme' }}>
                            Upload your CV once and let pineapply find the best roles for you by matching your skills and experience to
                            new job postings across all sources across the web.
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', maxWidth: { xs: '100%', md: '300px' } }}>
                        <Typography variant="h4" gutterBottom sx={{ color: 'appTheme' }}>
                            <b>Find the most up to date jobs</b>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'appTheme' }}>
                        Pineapply will scan all the sources for listings every hour!</Typography>
                    </Box>
                </Box>

            </Box>

        </div>
    );
};

export default HomeHero;
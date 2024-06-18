import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { Container, Typography } from '@mui/joy';

const FourOfour = () => {
    return (
        <>
            <Navbar />
            <Container sx={{ textAlign: 'center', py: 10 }}>
                <Typography level="h1" sx={{ mb: 2 }}>404</Typography>
                <Typography level="body1">404 The page youre looking for does not exist. you can return to the homepage here :) </Typography>
            </Container>
            <Footer />
        </>
    )
}
export default FourOfour;

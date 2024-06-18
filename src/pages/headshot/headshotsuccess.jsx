import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function HeadshotSuccess() {
    return (
        <>
                <Card className="success-card my-4" style={{ width: '100%', maxWidth: '600px', backgroundColor: '#dfcaf8' }}>
                    <Card.Body>
                        <Card.Title className="mb-4" style={{ color: 'black', fontSize: '2rem' }}>Done!</Card.Title>
                        <Card.Text style={{ color: 'black', fontSize: '1.2rem' }}>
                            Thank you for submitting. We are working on processing your images and will send you an email with the results within the next 2 hours. You can also view your results
                        </Card.Text>
                        <Card.Text style={{ color: 'black', fontSize: '1.2rem' }}>
                            In the meantime, sit back, relax, and get ready to see your photorealistic headshots!
                        </Card.Text>
                        <Button variant="primary" href="/" className="mt-4" style={{ backgroundColor: '#6c757d', borderColor: '#6c757d', borderRadius: '25px', padding: '10px 30px', color: 'white' }}>
                            Return to Homepage
                        </Button>
                    </Card.Body>
                </Card>
        </>
    );
}

export default HeadshotSuccess;

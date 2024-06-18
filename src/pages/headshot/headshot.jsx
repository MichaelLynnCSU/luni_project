import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Container } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { storage } from '../../firebaseauth';
import { ref, uploadBytes, listAll, getDownloadURL, getStorage } from 'firebase/storage';
import './headshot.scss';
import { processImages } from './lightheadshot';
import HeadshotSuccess from './headshotsuccess';

function Headshot() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isPayingUser, setIsPayingUser] = useState(false);
    const [imageUrls, setImageUrls] = useState([]);
    const [checkboxes, setCheckboxes] = useState([false, false, false, false, false]);
    const [checkboxError, setCheckboxError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [imageError, setImageError] = useState('');
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
    const [homeImageUrls, setHomeImageUrls] = useState({});

    const payingUserEmails = ['kareemy9000@gmail.com', 'amithchalil@gmail.com', 'vadim@inhype.io', 'athul.j@gmail.com', 'waelnour100@gmail.com', 'ahmed.gebril22@gmail.com'];

    const onImageSelect = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        setImageError('');
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (newEmail.trim() === '') {
            setEmailError('');
            setIsPayingUser(false);
        } else if (!validateEmail(newEmail)) {
            setEmailError('E-mail not valid');
            setIsPayingUser(false);
        } else if (!payingUserEmails.includes(newEmail)) {
            setEmailError('E-mail not found in paying users');
            setIsPayingUser(false);
        } else {
            setEmailError('');
            setIsPayingUser(true);
        }
    };

    const handleCheckboxChange = (index) => {
        setCheckboxes(prev => {
            const updatedCheckboxes = [...prev];
            updatedCheckboxes[index] = !updatedCheckboxes[index];
            return updatedCheckboxes;
        });
        setCheckboxError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            console.error('Form is not valid.');
            return;
        }

        setLoading(true);

        const folderName = email;
        const uploadPromises = selectedFiles.map((file, index) => {
            const fileExtension = file.name.split('.').pop();
            const newFileName = `${index + 1}.${fileExtension}`;
            const storageRef = ref(storage, `${folderName}/${newFileName}`);
            return uploadBytes(storageRef, file);
        });

        try {
            await Promise.all(uploadPromises);
            console.log('Images uploaded successfully');

            // Call the processImages function with the necessary arguments
            await processImages(folderName, email, gender);
            console.log('Images sent for processing');

            setGender('');
            setSelectedFiles([]);
            setIsSubmitSuccessful(true);
        } catch (err) {
            console.error('Error uploading or processing images:', err);
            alert('Error uploading or processing images. Please try again.');
        }

        setLoading(false);
    };

    const fetchImageUrls = async () => {
        const folderRef = ref(storage, 'Samples/');
        try {
            const listResult = await listAll(folderRef);
            const urlPromises = listResult.items.map((itemRef) => getDownloadURL(itemRef));
            const urls = await Promise.all(urlPromises);
            const shuffledUrls = urls.sort(() => Math.random() - 0.5);
            setImageUrls(shuffledUrls);
        } catch (error) {
            console.error('Error fetching SAMPLE AI image URLs:', error);
        }
    };

    useEffect(() => {
        const storageRef = getStorage();
        const imageNames = ['1.jpg', '2.png', '3.jpg'];

        const fetchHomeImageUrls = async () => {
            const urls = {};
            for (const imageName of imageNames) {
                const imageRef = ref(storageRef, `/home/${imageName}`);
                try {
                    const url = await getDownloadURL(imageRef);
                    urls[imageName] = url;
                } catch (error) {
                    console.error(`Error getting download URL for ${imageName}:`, error);
                }
            }
            setHomeImageUrls(urls);
        };

        fetchImageUrls();
        fetchHomeImageUrls();
    }, []);

    const isFormValid = () => {
        const isCheckboxValid = checkboxes.every(checkbox => checkbox);
        const isEmailValid = email && !emailError && isPayingUser;
        const isGenderValid = gender !== '';
        const isImageValid = selectedFiles.length >= 5 && selectedFiles.length <= 20 && !imageError;

        return !loading && isCheckboxValid && isEmailValid && isGenderValid && isImageValid;
    };

    return (
        <>
            <Navbar />
            <div className="page-container">
                <Container className="headshot-container d-flex align-items-center justify-content-center text-center">
                    <div className="text-center mb-5">
                        <Typography
                            variant="h2"
                            color="appTheme"
                            component="h1"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '1.8rem', sm: '3rem', md: '4rem' },
                                marginBottom: '1rem',
                                padding: '1rem',
                                boxSizing: 'border-box',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            Photorealistic Generated Headshots
                        </Typography>
                    </div>

                    <div className="headshot-grid">
                        {imageUrls.map((url, i) => (
                            <div key={i} className="headshot-item">
                                <img src={url} alt={`Headshot ${i + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Typography
                            variant="h5"
                            color="appTheme"
                            component="p"
                            gutterBottom
                            sx={{
                                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                                lineHeight: '1.5',
                            }}
                        >
                            AI-generated professional portraits made through the pineapply AI headshot generator. The face in your output will mostly resemble the face used in your uploaded images.
                        </Typography>
                        <Typography
                            variant="body1"
                            color="appTheme"
                            component="p"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                                lineHeight: '1.5',
                                fontWeight: 'bold',
                            }}
                        >
                            AI can be a great solution for your headshots, but you do need to upload good input images for the best results.
					    </Typography>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Headshot;

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import axios from 'axios';
import { Container, Typography, Input, Button, Grid, Sheet, Box, CircularProgress } from '@mui/joy';
import { debounce } from 'lodash';

const API_ENDPOINT = 'https://testimage-56ogefmcva-ww.a.run.app/api/chatbot';
const MAX_MESSAGES_PER_DAY = 10;

const generateUserId = () => {
    const navigatorInfo = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        vendor: navigator.vendor,
        hardwareConcurrency: navigator.hardwareConcurrency,
    };

    const fingerprint = Object.values(navigatorInfo).join('');
    const userId = btoa(fingerprint);

    return userId;
};

const useChatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatbotResponse, setChatbotResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [remainingMessages, setRemainingMessages] = useState(MAX_MESSAGES_PER_DAY);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const generatedUserId = generateUserId();
        setUserId(generatedUserId);
    }, []);

    useEffect(() => {
        if (userId) {
            // Check the stored message count and timestamp for the specific user
            const storedMessageCount = parseInt(localStorage.getItem(`messageCount_${userId}`)) || 0;
            const storedTimestamp = localStorage.getItem(`timestamp_${userId}`);
            const currentDate = new Date().toDateString();

            if (storedTimestamp !== currentDate) {
                // Reset the message count if it's a new day
                localStorage.setItem(`messageCount_${userId}`, '0');
                localStorage.setItem(`timestamp_${userId}`, currentDate);
                setRemainingMessages(MAX_MESSAGES_PER_DAY);
            } else {
                setRemainingMessages(MAX_MESSAGES_PER_DAY - storedMessageCount);
            }
        }
    }, [userId]);

    const handleChatbotRequest = async () => {
        if (!userId) return;

        const storedMessageCount = parseInt(localStorage.getItem(`messageCount_${userId}`)) || 0;

        if (storedMessageCount >= MAX_MESSAGES_PER_DAY) {
            setError('You have reached the daily limit of messages. Please come back tomorrow. Thank you!');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                API_ENDPOINT,
                { user_question: userInput },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status === 200) {
                setChatbotResponse(response.data.content[0].text);

                // Update the message count and timestamp for the specific user
                const newMessageCount = storedMessageCount + 1;
                localStorage.setItem(`messageCount_${userId}`, newMessageCount.toString());
                localStorage.setItem(`timestamp_${userId}`, new Date().toDateString());
                setRemainingMessages(MAX_MESSAGES_PER_DAY - newMessageCount);
            } else {
                setError('Oops! Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error communicating with chatbot:', error);
            setError('Apologies, an error occurred. Please try again later.');
        }

        setIsLoading(false);
        setUserInput(''); // Clear the user input after submitting the question
    };

    const debouncedHandleChatbotRequest = useMemo(() => debounce(handleChatbotRequest, 500), [userInput, userId]);

    const handleQuestionClick = (question) => {
        setUserInput(question);
    };

    return {
        userInput,
        setUserInput,
        chatbotResponse,
        isLoading,
        error,
        remainingMessages,
        handleChatbotRequest: debouncedHandleChatbotRequest,
        handleQuestionClick,
    };
};

const Laborbotpage = () => {
    const {
        userInput,
        setUserInput,
        chatbotResponse,
        isLoading,
        error,
        remainingMessages,
        handleChatbotRequest,
        handleQuestionClick,
    } = useChatbot();

    return (
        <>
            <Navbar />
            <Container maxWidth="md" sx={{ my: 4 }}>
                <Sheet variant="outlined" sx={{ p: 4 }}>
                    <Typography level="body1" textAlign="center" color="danger" mb={2}>
                        <b>If the submit button is disabled, please check back shortly as it's due to too many requests...</b>
                    </Typography>
                    <Typography level="h4" textAlign="center" mb={2}>
                        UAE Labor Law Chatbot
                    </Typography>
                    <Typography level="body2" textAlign="center" mb={2}>
                        To keep this chatbot free of charge, you are limited to {MAX_MESSAGES_PER_DAY} messages per day :). <b> Please note that you should only use it as a reference for legal matters. </b>
                    </Typography>
                    <Typography level="body2" textAlign="center" mb={2}>
                        Messages remaining: {remainingMessages}
                    </Typography>

                    <Grid container spacing={2}>
                        {[
                            'Is it legal for my employer to hold my passport?',
                            'What if my employer asks me to pay for my visa?',
                            'How do I report my employer who hasn\'t paid my salary?',
                            'Can I  legally work one temporary job + a full time job at the same time with two different employers?',
                            'Does my employer have to pay me for a ticket to my home country annually?'
                        ].map((question, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 'md',
                                        bgcolor: 'background.level1',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.2s',
                                        '&:hover': {
                                            bgcolor: 'background.level2',
                                        },
                                    }}
                                    onClick={() => handleQuestionClick(question)}
                                    aria-label={`FAQ: ${question}`}
                                    tabIndex={0}
                                    role="button"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            handleQuestionClick(question);
                                        }
                                    }}
                                >
                                    <Typography level="body2">{question}</Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Input
                                placeholder="Ask a question"
                                fullWidth
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                aria-label="Ask a question"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="solid"
                                fullWidth
                                onClick={handleChatbotRequest}
                                disabled={isLoading}
                                aria-label="Submit question"
                            >
                                {isLoading ? 'Loading...' : 'Submit'}
                            </Button>
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                        <Grid item xs={12}>
                            <Sheet
                                sx={{
                                    bgcolor: 'background.body',
                                    p: 2,
                                    minHeight: 200,
                                    overflowY: 'auto',
                                }}
                                aria-live="polite"
                                aria-busy={isLoading}
                            >
                                {isLoading ? (
                                    <Typography level="body1">
                                        Please wait a few seconds...
                                    </Typography>
                                ) : error ? (
                                    <Typography level="body1" color="error">
                                        {error}
                                    </Typography>
                                ) : chatbotResponse ? (
                                    <>
                                        <Typography level="body1">
                                            {chatbotResponse}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography level="body1">
                                        Please enter a question and click Submit.
                                    </Typography>
                                )}
                            </Sheet>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography level="body2" textAlign="center" mt={2}>
                                <b> Coming soon: Ability to have continual conversations + ability to upload contract/documents to the chatbot for questions :) </b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Sheet>
            </Container>
            <Footer />
        </>
    );
};

export default Laborbotpage;
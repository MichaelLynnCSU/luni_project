import axios from 'axios';
import dotenv from 'dotenv';
import OpenAI from "openai";

// Use dotenv.config() instead of dotenv.load_dotenv()
dotenv.config();

// Create the OpenAI client with the API key from the .env file
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Function to get a screenshot from Browserless
const getScreenshot = async (url) => {
    const apiToken = '3dfd70a8-4256-44a2-9b5c-45feb752095e'; // Replace with your Browserless API token
    const response = await axios.post(`https://chrome.browserless.io/screenshot?token=${apiToken}`, {
        url: url,
        options: {
            fullPage: true,
            type: "jpeg",
            quality: 75
        }
    }, {
        responseType: 'arraybuffer' // Ensure that binary data is handled correctly
    });

    // Convert binary data to base64
    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    return base64Image;
};

// Function to process image with OpenAI
const processImageWithOpenAI = async (base64Image) => {
    // Construct the request payload
    const payload = {
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "could you get the fields from the form? return them all" },
                    { type: "image_url", image_url: base64Image },
                ],
            },
        ],
    };

    // Log the request payload
    console.log('Sending request to OpenAI:', JSON.stringify(payload, null, 2));

    // Send the request
    const response = await openai.chat.completions.create(payload);
    return response.choices[0];
};

// Example usage
const captureAndProcessScreenshot = async (url) => {
    try {
        const screenshot = await getScreenshot(url);
        const openAIResponse = await processImageWithOpenAI(`data:image/jpeg;base64,${screenshot}`);
        console.log('OpenAI Response:', openAIResponse.message.content);
    } catch (error) {
        console.error('Error:', error);
    }
};
captureAndProcessScreenshot('https://forms.app/auth/signup/');

export { captureAndProcessScreenshot, processImageWithOpenAI };

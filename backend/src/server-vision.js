// This file handles sending an image to the OpenAI Vision API
// and returning the response. It converts the image to the expected
// payload format and calls the chat completions endpoint.

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();
let gptOutput;

// Import OpenAI SDK client
import OpenAI from "openai";

// Create OpenAI client instance with API key
const openai = new OpenAI({ apiKey: "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" });

// Async function to process image with OpenAI Vision API
export const processImageWithOpenAI = async (base64Image) => {

    // Create request payload in format expected by API
    const payload = {
        model: "gpt-4-vision-preview", // Use GPT-4 vision model

        messages: [
            {
                role: "user", // User message

                content: [
                    {
                        type: "text", // Plain text prompt
                        text: " Summarize the text below into a valid JSON with exactly the following structure {basic_info: {first_name, last_name, full_name, email, phone_number, location, portfolio_website_url, linkedin_url, github_main_page_url, university, education_level (BS, MS, or PhD), graduation_year, graduation_month, majors, GPA}, work_experience: [{job_title, company, location, duration (For duration please convert it to years as a decimal), job_summary}], project_experience:[{project_name, project_description}]}   },\n"
                    },

                    {
                        type: "image_url", // Base64 encoded image data
                        image_url: base64Image
                    },
                ],
            },
        ],

        max_tokens: 3000 // Maximum tokens to generate
    };

    // Log payload being sent
    console.log('Sending request to OpenAI:', JSON.stringify(payload, null, 2));

    // Call OpenAI chat completions API
    const response = await openai.chat.completions.create(payload);

    // Log and return API response
    console.log("Returning api response here: ", payload.messages[0].content[0].text, response.choices[0].message.content);

    return response.choices[0];

};

// Import the OpenAI library
import OpenAI from "openai";

// Load environment variables from .env file
import dotenv from 'dotenv';

dotenv.config();

// Create an OpenAI client instance with API key
const openai = new OpenAI({ apiKey: "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" });
//const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Async function to get answers from GPT-3
const getAnswersFromGPT = async (questions, resumeData) => {

    // Call OpenAI chat completions API
    const response = await openai.chat.completions.create({

        // Use GPT-4 vision model
        model: "gpt-4-vision-preview",

        // Message array with system and user roles
        messages: [

            // System message with instructions
            {
                role: "system",
                content: [
                    {
                        type: "text",
                        // Instructions for GPT on how to respond
                        text: "You are an assistant helping a person apply to job listings. You'll be given an array of objects having properties question, type and options. Refer to the resume provided and try to answer the questions according to the question type. Remember to answer as the candidate, in first person. Assume that the candidate is a UAE citizen and has a driver's license. If it is text, return a brief answer. If it is a yes or no question, answer accordingly. If it is a radio button, answer with the appropriate option. In case salary expectations are asked, give a reasonable numerical value. Return the answer as an array of JSON objects {question, answer}. Do not return any additional dialogue."
                    }
                ]
            },

            // User message with questions and resume image
            {
                role: "user",
                content: [

                    // Commented out text message
                    // { type: "text", text: "Answer specifically this question" },

                    // Questions to answer
                    { type: "text", text: `Answer these questions: ${JSON.stringify(questions)}.` },

                    // Resume image
                    {
                        type: "image_url",
                        image_url: {
                            "url": `${resumeData}`,
                            "detail": 'high'
                        }
                    }
                ],
            },
        ],

        // Maximum number of tokens to generate
        max_tokens: 4096

    });

    // Log response
    console.log(response.choices);

    // Parse JSON response
    return JSON.parse(response.choices[0].message.content.replace("```json", "").replace("```", ""));

}

// Export function 
export default getAnswersFromGPT;
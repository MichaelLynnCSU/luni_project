const { default: OpenAI } = require('openai');
const pdf2img = require('pdf-img-convert');

const extractDataFromResume = async (pdfPath) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY})

    var out = await pdf2img.convert(pdfPath, { base64: true })

    // Get user data from CV using GPT4
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Retrieve the following info from the images of the resume and return it as a JSON object: firstName, lastName, gender(Interpret it from the name or picture if any), city, email, phoneNumber(Expect a UAE number, return it without country or area code), education[{school, degree, fieldOfStudy(optional)}], experience[{title, company, industry, summary(A very short summary)}], summary(A basic summary for the applicant profile), experiencePeriod(a string with just the number of years of experience). If there are any fields that don't have data, put empty strings for those. Don't include any additional dialog other than the JSON data" },
                    ...out.map(base64Data => {return {
                        type: "image_url",
                        image_url: {
                            "url": `data:image/jpeg;base64, ${base64Data}`,
                            "detail": 'auto'
                        }
                    }})]
            },
        ],
        max_tokens: 3000
    });
    console.log(response)
    return JSON.parse(response.choices[0].message.content.replace("```json", "").replace("```", ""))
}

//export { extractDataFromResume }

// Example usage
// const pdfPath = "./SalmaNegmResume.pdf"
// const resumeData = await extractDataFromResume(pdfPath)
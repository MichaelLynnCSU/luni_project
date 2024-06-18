import { storage } from '../../firebaseauth.js';
import { ref, uploadBytes, listAll, getDownloadURL, getStorage } from 'firebase/storage';

const dreamlookApiKey = 'dl-F3BFCB0668D04BE4BE9E5C1DDC2AB0A4';

export const processImages = async (folderName, email, gender) => {
    try {
        // "Stunning, hyper-realistic, cinematic portrait photograph of a person's head and shoulders, " +
        // "taken with a Fujifilm X-T3 camera and a 35mm f/1.4 lens. Soft, natural lighting from a large window, " +
        // "with Rembrandt-style lighting creating dramatic shadows on the face. Shallow depth of field, with the subject's eyes" +
        // ", nose, and mouth in sharp focus, and the background gently blurred. Precise skin texture and pore detail, with flawless " +
        // "complexion and subtle, natural make-up. The subject is slightly smiling, with a warm, friendly expression. The composition " +
        // "is visually compelling, with the subject placed slightly off-center. Subtle color grading for a rich, moody, and " +
        // "high-contrast look, preserved in 16-bit color depth. " +
        // "The final image has the quality and attention to detail of a high-end professional portrait session."
        const storage = getStorage();
        const folderRef = ref(storage, folderName);
        const listResult = await listAll(folderRef);

        // Get the download URLs of the files
        const urlPromises = listResult.items.map((itemRef) => getDownloadURL(itemRef));
        const imageUrls = await Promise.all(urlPromises);

        console.log('Image URLs:', imageUrls);

        const finalRequestBody = {
            dry_run: false,
            tags: [
                {
                    "key": "email",
                    "value": email
                },
                {
                    "key": "gender",
                    "value": gender
                }
            ],
            dreambooth: {
                image_urls: imageUrls,
                model_type: "sdxl-v1",
                base_model: "realism-engine-sdxl-v3-0",
                saved_model_format: "original",
                crop_method: "center",
                saved_model_weights_format: "safetensors",
                steps: 1500,
                instance_prompt: `photo of a abc person`,
                learning_rate: 1e-5,
                learning_rate_te1: 3e-6,
                learning_rate_te2: 0,
                width: 1024,
                height: 1024,
            },
            image_gen: [
                {
                    prompt: `portrait Photograph of abc ${gender}, slightly smiling ` +
                        "Fujifilm XT3 , RAW candid cinema, 16mm, professional headshot" ,
                    negative_prompt: "bad anatomy, bad hands, missing arms, extra hands, extra fingers, bad fingers, extra legs, missing legs, poorly drawn face, fused face, worst feet, extra feet, fused feet, fused thigh, extra thigh, worst thigh, missing fingers, long fingers, extra eyes, huge eyes, amputation, cartoon, cg, 3d, unreal, full body picture, animate, cropped, blurry, far",
                    num_samples: 50,
                    width: 1024,
                    height: 1024,
                    num_inference_steps: 30,
                    enable_hrf: false,
                    scheduler_type: "dpmpp-2m-karras",
                    seed: -1,
                    model_type: "sdxl-v1",
                    base_model: "realism-engine-sdxl-v3-0",
                    guidance_scale: 7,
                    output_format: "png",
                }
            ],
            "priority": 100,
            "validate_token_cost": 66,
            "callback": "https://your-callback-url.com/dreamlook-callback" // Add your callback URL here
        };

        // Make the API request with the finalRequestBody
        const response = await fetch('https://api.dreamlook.ai/dreambooth_image_gen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${dreamlookApiKey}`,
            },
            body: JSON.stringify(finalRequestBody)
        });

        const data = await response.json();
        console.log('API Response:', data);

        // Extract the job_id from the response
        const jobId = data.job_id;

        // Poll the job status until it's completed or failed
        let jobStatus = 'queued';
        while (jobStatus === 'queued' || jobStatus === 'running') {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before checking again

            const statusResponse = await fetch(`https://api.dreamlook.ai/jobs/dreambooth_image_gen/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${dreamlookApiKey}`,
                },
            });

            const statusData = await statusResponse.json();
            console.log('Job Status:', statusData);

            jobStatus = statusData.state;
        }

        if (jobStatus === 'success') {
            // Retrieve the generated image URLs from the job result
            const generatedImageUrls = statusData.image_gen_results.images.map(image => image.url);
            console.log('Generated Image URLs:', generatedImageUrls);

            // Save the generated image URLs to Firebase Storage
            const generatedImagesRef = ref(storage, `${folderName}/generated`);
            const savePromises = generatedImageUrls.map((imageUrl, index) => {
                const imageRef = ref(generatedImagesRef, `image_${index}.png`);
                return fetch(imageUrl)
                    .then(response => response.blob())
                    .then(blob => uploadBytes(imageRef, blob));
            });

            await Promise.all(savePromises);
            console.log('Generated images saved to Firebase Storage');

            // Return the generated image URLs
            return generatedImageUrls;
        } else {
            console.error('Job failed:', statusData.failure_reason);
            throw new Error('Job failed');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
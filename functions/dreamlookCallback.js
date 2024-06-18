import * as functions from 'firebase-functions';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

export const dreamlookCallback = functions.https.onCall(async (data, context) => {
    try {
        // Extract the job data from the request body
        const jobData = data;

        // Check if the job was successful
        if (jobData.state === 'success') {
            // Retrieve the generated image URLs from the initial job response
            const generatedImageUrls = jobData.config.image_gen[0].images;

            // Save the generated image URLs to Firebase Storage
            const storage = getStorage();
            const generatedImagesRef = ref(storage, `${jobData.tags[0].value}/generated`);
            const savePromises = generatedImageUrls.map((imageUrl, index) => {
                const imageRef = ref(generatedImagesRef, `image_${index}.png`);
                return fetch(imageUrl)
                    .then(response => response.blob())
                    .then(blob => uploadBytes(imageRef, blob));
            });

            await Promise.all(savePromises);
            console.log('Generated images saved to Firebase Storage');
        } else {
            console.error('Job failed:', jobData.failure_reason);
        }

        // Return a success response
        return { success: true };
    } catch (error) {
        console.error('Error:', error);
        throw new functions.https.HttpsError('internal', 'Error processing callback');
    }
});
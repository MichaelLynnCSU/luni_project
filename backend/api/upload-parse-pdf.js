// Import Express and Multer
import express from 'express';
import multer from 'multer';

// Import image processing function
import { processImageWithOpenAI } from './../src/server-vision.js';

// Create Express router
const router = express.Router();

// Configure Multer storage and upload middleware
// This will store uploads in /public/upload
// and name files based on timestamp + original name
const storage = multer.diskStorage({
    destination: 'public/upload',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// POST route to handle uploads
router.post('/upload', upload.single('file'), async (req, res) => {

    // If request contains image data
    if (req.body.image) {

        try {
            // Process image with OpenAI Vision API
            const visionResponse = await processImageWithOpenAI(req.body.image);

            // Return successful response
            res.json(visionResponse);

        } catch (error) {
            // Handle errors from image processing
            console.error('Error processing image with OpenAI:', error);
            res.status(500).send('Error processing image');
        }
        // If no image data, must be file upload
    } else {

        // Access uploaded file from Multer
        const file = req.file;

        // Return basic file info in response
        res.json({
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
        });
    }
    console.log("Currently in Upload-parse")

});

// Export router
export default router;

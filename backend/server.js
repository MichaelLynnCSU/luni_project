// Import required modules
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';
import { processImages } from '../src/pages/headshot/lightheadshot.js';

// Load environment variables from .env file
dotenv.config();

// Create Express app instance
const app = express();

// Enable parsing JSON request bodies up to 50MB
app.use(express.json({ limit: '50mb' }));

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Add file validation if needed
        cb(null, true);
    }
}).array('images');

// Get the filename of the current module
const __filename = fileURLToPath(import.meta.url);
// Get the directory path of the current module
const __dirname = path.dirname(__filename);

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Define the API directory path
const apiDirectory = path.join(__dirname, 'api');

// Read all files in the API directory
fs.readdir(apiDirectory, (err, files) => {
    // Handle errors reading the directory
    if (err) {
        console.error('Error reading API directory:', err);
        return;
    }

    // Loop through each file
    files.forEach(file => {
        // Construct the full path to the module
        const modulePath = path.join(apiDirectory, file);
        // Convert the path to a URL format
        const moduleURL = pathToFileURL(modulePath).href;

        // Dynamically import the module
        import(moduleURL).then(routeModule => {
            // Check if the module has a default export
            if (routeModule.default) {
                // Register the API route
                app.use('/api', routeModule.default);
            } else {
                console.log(`No default export found in ${file}`);
            }
        }).catch(err => {
            // Handle errors importing the module
            console.error(`Error importing ${file}:`, err);
        });
    });
});

// API endpoint for image upload and processing
app.post('/api/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).json({ error: 'File upload failed.' });
        } else if (err) {
            console.error('Unknown error:', err);
            return res.status(500).json({ error: 'An error occurred during file upload.' });
        }

        try {
            const images = req.files;
            const { folderName, email, gender } = req.body;

            // Process the uploaded images using the `processImages` function from `lightheadshot.js`
            const response = await processImages(folderName, email, gender, images);

            res.json(response);
        } catch (error) {
            console.error('Error processing images:', error);
            res.status(500).json({ error: 'An error occurred while processing the images.' });
        }
    });
});

// Start the Express server
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
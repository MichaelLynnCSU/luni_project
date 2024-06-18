/**
 * Server file that sets up an Express app and API route for scraping Google listings.
 */

import express from 'express';
import cors from 'cors';
import extractDataFromResume from '../src/extractDataFromResume.js';

// Create Express app
const app = express();

// Parse JSON request bodies
app.use(express.json());
app.use(cors())

/**
 * API route to scrape Google listings based on search query.
 *
 * @route POST /api/fillWorkable
//  * @params {string} query - Search query term
 * @returns {Object[]} Array of listing results
 */
app.post('/api/scrapeResume', async (req, res) => {

    try {

        // Scrape Google for listings matching the query
        const result = await extractDataFromResume(req.body.resumeData);
        console.log("RESUME DATA SENT FROM SCRAPERESUME.JS: "  ,result);
        res.status(200).json({userData: result})

    } catch (error) {
        console.error(error);
        res.status(500).send('Error scraping from resume');
    }

});

export default app;
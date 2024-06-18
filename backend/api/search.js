/**
 * Server file that sets up an Express app and API route for scraping Google listings.
 */

import express from 'express';
import cors from 'cors';
import scrapeGoogleForListings from '../src/googleJobsScraper.js';

// Create Express app
const app = express();

// Parse JSON request bodies
app.use(express.json());
app.use(cors())

/**
 * API route to scrape Google listings based on search query.
 *
 * @route POST /api/search
 * @params {string} query - Search query term
 * @returns {Object[]} Array of listing results
 */
app.post('/api/search', async (req, res) => {

    try {
        // Get query from request body
        const { query } = req.body;

        // Scrape Google for listings matching the query
        const results = await scrapeGoogleForListings(query);

        // Return listings in JSON response
        res.json(results);

        // Log results for debugging
        console.log("Result from search API: ", results);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error scraping results');
    }

});

export default app;
/**
 * Server file that sets up an Express app and API route for scraping Workable listings.
 */
//API ENDPOINT FILE
import express from 'express';
import cors from 'cors';
import scrapeFromOdoo from '../src/odooScraper.js';

// Create Express app
const app = express();

// Parse JSON request bodies
app.use(express.json());
app.use(cors())

/**
 * API route to scrape listings from Odoo
 *
 * @route POST /api/scrapeFromOdoo
 * @returns {Object[]} Array of listing results
 */
app.post('/api/scrapeFromOdoo', async (req, res) => {

    try {
        const listings = await scrapeFromOdoo()
        res.status(200).send({ listings })
    } catch (e) {
        res.status(500).send({error: JSON.stringify(e)})
    }


});

export default app;
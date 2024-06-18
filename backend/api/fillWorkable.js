/**
 * Server file that sets up an Express app and API route for scraping Google listings.
 */

import express from 'express';
import cors from 'cors';
import fillWorkableForm from '../src/fillWorkableForm.js';

// Create Express app
const app = express();

// Parse JSON request bodies
app.use(express.json());
app.use(cors())

/**
 * API route to fill Workable forms.
 *
 * @route POST /api/fillWorkable
//  * @params {string} query - Search query term
 * @returns {Object[]} Array of listing results
 */
app.post('/api/fillWorkable', async (req, res) => {

    try {

        // Scrape Google for listings matching the query
        const result = await fillWorkableForm(req.body.link, req.body.resumeData, req.body.userData);
        res.status(200).json({message: "ok", responseFromFunc: result})

    } catch (error) {
        console.error(error);
        res.status(500).send('Error filling form');
    }

});

export default app;
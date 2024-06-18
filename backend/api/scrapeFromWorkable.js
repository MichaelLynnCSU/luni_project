/**
 * Server file that sets up an Express app and API route for scraping Workable listings.
 */
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import  scrapeWorkableForListings  from '../src/workableScraper.js';

// Create Express app
const app = express();

// Parse JSON request bodies
app.use(express.json());
app.use(cors())



/**
 * API route to scrape Google listings based on search query.s
 *
 * @route POST /api/fillWorkable
//  * @params {string} query - Search query term
 * @returns {Object[]} Array of listing results
 */
app.post('/api/getListingsFromWorkable', async (req, res) => {

    try {
        const listings = await scrapeWorkableForListings()
        // Write to Firestore
        const db = admin.firestore();
        await db.collection('listings').add(listings);
        res.status(200).send({ listings })
    } catch (e) {
        res.status(500).send({error: e})
    }


});

export default app;
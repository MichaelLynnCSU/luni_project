import * as functions from 'firebase-functions';
import puppeteer from 'puppeteer';

const scrapeWorkableForListings = functions.region("europe-central2").runWith({timeoutSeconds: 540, memory: '2GB'}).https.onRequest(async (req, res) => {
    try {
        let jobsArray = [];
        //let loadMoreExists = true;
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36");
        await page.goto('https://jobs.workable.com/search?query=real%20estate&location=United%20Arab%20Emirates&remote=false');
        //
        // let loadMoreButton = await page.$("[data-ui='load-more-button']");
        // if (loadMoreButton) {
        //     try {
        //         await loadMoreButton.click();
        //         await new Promise(resolve => setTimeout(resolve,  1000));
        //     }
        //     catch (error) {
        //         console.log("Error clicking load more:", error);
        //         loadMoreExists = false; // Exit the loop if there's an error clicking the button
        //     }
        // } else {
        //     loadMoreExists = false; // Exit the loop if the button no longer exists
        // }

        // jobsArray = await page.evaluate(() => {
        //     let jobs = [];
        //     let listings = document.querySelectorAll("[data-ui='job-item']");
        //     listings = Array.from(listings);
        //
        //     for (const job of listings) {
        //         const title = job.querySelector("h2").innerText;
        //         const company = job.querySelector(".companyName__link--2ntbf").innerText;
        //         const link = job.querySelector("h2 a").getAttribute("href");
        //
        //         jobs.push({ title, company, link });
        //     }
        //
        //     return jobs;
        // });

        await browser.close();
        res.status(200).send(jobsArray);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send(error);
    }
});

export default scrapeWorkableForListings;
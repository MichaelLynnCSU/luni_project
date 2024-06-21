const puppeteer = require("puppeteer");
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');


const checkForLoginComponent = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Navigate to the job application URL
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Take a screenshot of the page
        const screenshotBuffer = await page.screenshot();

        // Convert the screenshot buffer to a Uint8Array
        const screenshotData = new Uint8Array(screenshotBuffer);
        const { width, height } = await page.viewport();

        // Use TensorFlow.js and the COCO-SSD model to detect login-related UI elements
        const model = await cocoSsd.load();
        const predictions = await model.detect({
            data: screenshotData,
            width,
            height
        });

        // Check if the predictions contain elements related to login (e.g., username/password fields, login button)
        const hasLoginComponent = predictions.some(prediction => {
            const { class: className, score } = prediction;
            return (
                className.toLowerCase().includes('login') ||
                className.toLowerCase().includes('username') ||
                className.toLowerCase().includes('password')
            ) && score > 0.7;
        });

        if (hasLoginComponent) {
            console.log(`URL ${url} has a login component.`);
            return true;
        } else {
            console.log(`URL ${url} does not have a login component.`);
            return false;
        }
    } catch (error) {
        console.error(`Error checking URL ${url}: ${error}`);
        return null;
    } finally {
        try {
            await browser.close();
        } catch (error) {
            console.error(`Error closing browser: ${error}`);
        }
    }
};
// Test the function
(async () => {
    const testUrls = [
         'https://jooble.org/jdp/-978421163399443496?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
         'https://www.jobilize.com/job/us-co-denver-embedded-software-engineer-volt-workforce-solutions-hiring?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
         'https://us.sercanto.com/detail/a/embedded-software-engineer_denver_2758029027?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
         'https://www.techfetch.com/job-description/embedded-wifi-software-engineer-iii-denver-co-j3593731?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
         'https://www.ziprecruiter.com/c/Peak-Talent-Search/Job/Sr-Embedded-Software-Engineer/-in-Denver,CO?jid=7a7f9f3863db724f&utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
         'https://us.bebee.com/job/de03f983b9e88b3bb0df9561b942163f?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
         'https://www.theladders.com/job-listing/sr-embedded-software-engineer-peak-talent-search-denver-co-_v2_-7-3731453537.html?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic',
         'https://fisioritmo.pt/wp-job/job/sr-embedded-software-engineer-at-peak-talent-search-denver-co-VjRZMjdaODJ5WDk4cnRKYWNxMGdxQmcxZ0E9PQ==?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic'
    ];

    for (const url of testUrls) {
        const hasLoginComponent = await checkForLoginComponent(url);
        if (hasLoginComponent === true) {
            console.log(`URL ${url} has a login component.`);
        } else if (hasLoginComponent === false) {
            console.log(`URL ${url} does not have a login component.`);
        } else {
            console.log(`Error occurred while checking URL ${url}.`);
        }
    }
})();
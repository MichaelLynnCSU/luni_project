const puppeteer = require('puppeteer');

const scrapeNaukriGulf = async () => {
    const jobs = [];
    let nextPageExists = true
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.naukrigulf.com/real-estate-jobs?country=17&easyApply=true");

    const fetchListingsFromCurrentPage = async () => {
        // Wait for the job cards to be present
        await page.waitForSelector(".ng-box.srp-tuple", { timeout: 5000 });

        const jobCards = await page.$$(".ng-box.srp-tuple");

        for (const card of jobCards) {
            const linkElement = await card.$("a");
            const link = await linkElement.getProperty("href");
            const linkValue = await link.jsonValue();

            const title = await (await card.$("h2")).evaluate(h2 => h2.textContent);
            const company = await (await card.$(".info-org")).evaluate(elem => elem.textContent);

            jobs.push({ title, company, link: linkValue });
        }
    }

    while (nextPageExists) {
        const nextButton = await page.waitForSelector(".ico.bwd", { timeout: 5000 })
        await fetchListingsFromCurrentPage()
        if (nextButton) {
            try {
                await nextButton.click()
            } catch (e) {
                //Seems like we're out of listings to scrape
                nextPageExists = false // That's it, nothing else
            }
        } else {
            nextPageExists = false
        }
    }

    // console.log(jobs);
    console.log(`There are ${jobs.length} listings on here`)
    await browser.close();
    return jobs
}

export { scrapeNaukriGulf }

// Example usage
/* 
    const jobs = await scrapeNaukriGulf()
*/

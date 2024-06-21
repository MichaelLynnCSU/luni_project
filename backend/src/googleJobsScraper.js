const puppeteer = require("puppeteer");

const scrapeGoogleForListings = async (queries) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Production-only
        await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36");

        for (const query of queries) {
            // Navigate the page to a URL
            await page.goto('https://google.com/');

            // Type into search box
            await page.type('textarea', query);
            await page.keyboard.press("Enter");

            const link = await page.waitForSelector('.esVihe');
            await link.click();

            await page.waitForNavigation();
            await new Promise((r) => setTimeout(r, 1500));

            // Scroll down page to load more listings
            const sidebar = await page.waitForSelector(".gws-plugins-horizon-jobs__tl-lvc");
            const boundingBox = await sidebar.boundingBox();
            await page.mouse.move(
                boundingBox.x + boundingBox.width / 2,
                boundingBox.y + boundingBox.height / 2
            );

            await page.mouse.wheel({ deltaY: 10500 });
            await new Promise((r) => setTimeout(r, 1500));
            await page.mouse.wheel({ deltaY: 10500 });
            await new Promise((r) => setTimeout(r, 1500));
            await page.mouse.wheel({ deltaY: 10500 });
            await new Promise((r) => setTimeout(r, 1500));
            await page.mouse.wheel({ deltaY: 10500 });
            await new Promise((r) => setTimeout(r, 1500));

            let jobs = await page.$$(".gws-plugins-horizon-jobs__tl-lif");

            for (const jobLi of jobs) {
                // Get the company name for the current job listing
                const companyElement = await jobLi.$(".nJlQNd.sMzDkb");
                const company = await companyElement.evaluate(el => el.textContent.trim());
                console.log(`Company: ${company}`);
            }
        }

        // Close browser after everything
        await browser.close();
    } catch (error) {
        console.error("Error in function : ", error);
    }
};

// Test the function
(async () => {
    const queries = ["Denver Embedded Developer job", "Software Engineer Remote", "UI/UX Designer", "Data Analyst"];
    await scrapeGoogleForListings(queries);
})();
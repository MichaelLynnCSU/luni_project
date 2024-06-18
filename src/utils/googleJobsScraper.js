import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const puppeteer = require('puppeteer')
console.log("here");
const scrapeGoogleForListings = async (query) => {
    try {
        let jobsArray = []
        // const browser = await puppeteer.launch({ headless: "new" }) // TODO: Use for production only
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()

        // Production-only
        // await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")

        // Navigate the page to a URL
        await page.goto('https://google.com/');

        // Type into search box
        await page.type('textarea', query);
        await page.keyboard.press("Enter")


        const link = await page.waitForSelector('.esVihe');
        await link.click()

        await page.waitForNavigation()
        await new Promise(r => setTimeout(r, 1500));

        //Scroll down page to load more listings
        const sidebar = await page.waitForSelector(".gws-plugins-horizon-jobs__tl-lvc")
        const boundingBox = await sidebar.boundingBox()
        await page.mouse.move(
            boundingBox.x + boundingBox.width / 2,
            boundingBox.y + boundingBox.height / 2
        );

        await page.mouse.wheel({deltaY: 10500});
        await new Promise(r => setTimeout(r, 1500));
        await page.mouse.wheel({deltaY: 10500});
        await new Promise(r => setTimeout(r, 1500));
        await page.mouse.wheel({deltaY: 10500});
        await new Promise(r => setTimeout(r, 1500));
        await page.mouse.wheel({deltaY: 10500});
        await new Promise(r => setTimeout(r, 1500));


        let jobs = await page.$$(".gws-plugins-horizon-jobs__tl-lif")

        for (const jobLi of jobs) {

            // Get listing title
            const titleText = await page.evaluate(() => {
                const titleElement = document.querySelector("#tl_ditsc h2.KLsYvd");
                return titleElement ? titleElement.textContent : null;
            });

            // Get listing company
            const company = await page.evaluate(() => {
                const companyElem = document.querySelector("#tl_ditsc .nJlQNd.sMzDkb");
                return companyElem ? companyElem.textContent : null;
            });

            // Get listing location
            const loc = await page.evaluate(() => {
                let locElem = document.querySelectorAll("#tl_ditsc .sMzDkb");
                locElem = locElem[1]
                return locElem ? locElem.textContent : null;
            });

            // Get listing application links
            const links = await page.evaluate(() => {
                let linksArray = document.querySelectorAll("#tl_ditsc .pMhGee.Co68jc.j0vryd");
                const resultArray = Array.from(linksArray).map(link => {
                    const url = link.getAttribute("href");
                    const text = link.textContent.trim();

                    return {url, text};
                });
                return resultArray;
            });


            jobsArray.push({title: titleText, company, location: loc, links}) // Update final array
            await jobLi.click()
        }

        console.log(`Scraped ${jobsArray.length} listings`)

        // Close browser after everything
        await browser.close()

        return jobsArray;
    }catch(error) {
        console.error("Error in function : ",error)
    }
}
//function call
scrapeGoogleForListings("Real estate agent Dubai job").then(jobs => {
  //  console.log("Jobs:", jobs);
    jobs.map(job => {
        console.log("Job title : " ,job.title);
        console.log("Company: " ,job.company);
    });

}).catch(error => {
    console.error("Error:", error);
});


export { scrapeGoogleForListings }
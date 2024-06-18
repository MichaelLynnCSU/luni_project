// Import puppeteer-extra
import puppeteer from 'puppeteer-extra';

// Import stealth plugin
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

//file currently only scapes jobxdubai listings,
puppeteer.use(StealthPlugin());
export default async function getJobLinks() {
    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();

        await page.goto('https://jobxdubai.com/');
        // Function to scroll to the bottom of the page
        // eslint-disable-next-line no-inner-declarations
        async function autoScroll(page){
            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                    let totalHeight =   0;
                    let distance =   100;
                    let timer = setInterval(() => {
                        let scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;

                        if(totalHeight >= scrollHeight){
                            clearInterval(timer);
                            resolve();
                        }
                    },   100);
                });
            });
        }

        // Keep scrolling until no more new content is loaded
        let previousHeight;
        do {
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await autoScroll(page);
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
          //  await page.waitFor(1000); // wait for a bit to load new content
        }
        while (previousHeight !== (await page.evaluate('document.body.scrollHeight')));

        const links = await page.evaluate(() => {
            const anchors = document.querySelectorAll('a');
            const hrefs = [];

            for (let a of anchors) {
                if (a.href) {
                    hrefs.push(a.href);
                }
            }
            const linksWithApply = hrefs.map(link => {
                return `${link}/apply`;
            });
            console.log(links);

            return linksWithApply.slice(9);

        });
        await browser.close();

        return links;
    }
    catch (err) {
        console.log(err);
    }
}
getJobLinks();